#!/bin/bash

timestamp() {
  date '+%Y-%m-%d %H:%M:%S'
}

getpublicip() {
  natpmpc -g {{ protonvpn_gateway }} | grep -oP '(?<=Public.IP.address.:.).*'
}

findconfiguredport() {
  curl -s -i --header "Referer: https://{{ ansible_host }}" --cookie "$1" "https://{{ ansible_host }}/api/v2/app/preferences" | grep -oP '(?<=\"listen_port\"\:)(\d{1,5})'
}

findactiveport() {
  natpmpc -g {{ protonvpn_gateway }} -a 1 0 tcp {{ protonvpn_port_forward_lifetime }} | grep -oP '(?<=Mapped public port.).*(?=.protocol.*)'
}

qbt_login() {
  qbt_sid=$(curl -s -i --header "Referer: https://{{ ansible_host }}" --data "username={{ qbit_username }}" --data-urlencode "password={{ natpmpc_qbit_password }}" "https://{{ ansible_host }}/api/v2/auth/login" | grep -oP '(?!set-cookie:.)SID=.*(?=\;.HttpOnly\;)')
  return $?
}

qbt_changeport(){
  curl -s -i --header "Referer: https://{{ ansible_host }}" --cookie "$1" --data-urlencode "json={\"listen_port\":$2,\"random_port\":false,\"upnp\":false}" "https://{{ ansible_host }}/api/v2/app/setPreferences" > /dev/null 2>&1
  return $?
}

qbt_checksid(){
  if curl -s --header "Referer: https://{{ ansible_facts["hostname"] }}" --cookie "${qbt_sid}" "https://{{ ansible_facts["hostname"] }}/api/v2/app/version" | grep -qi forbidden; then
      return 1
  else
      return 0
  fi
}

qbt_isreachable(){
  http_code=$(curl -o /dev/null -s -w "%{http_code}" https://{{ ansible_host }})
  if [[ $http_code != 200 ]]; then
    return 1
  else
    return 0
  fi
}

fw_delrule(){
  if (/usr/sbin/iptables -t nat -L DOCKER -n | grep -qP "^DNAT.*${configured_port}.*"); then
    /usr/sbin/iptables -t nat -D DOCKER -p tcp --dport ${configured_port} -j DNAT --to-destination {{ qbittorrent_docker_ip }}:${configured_port}
  fi

  if !(/usr/sbin/iptables -L DOCKER -n | grep -P "ACCEPT.*dpt:${configured_port}.*"); then
    /usr/sbin/iptables -D DOCKER -p tcp -d {{ qbittorrent_docker_ip }} --dport ${active_port} -j ACCEPT
  fi
}

fw_addrule(){
  if !(/usr/sbin/iptables -t nat -L DOCKER -n | grep -qP "^DNAT.*${active_port}.*"); then
    /usr/sbin/iptables -t nat -A DOCKER -p tcp --dport ${active_port} -j DNAT --to-destination {{ qbittorrent_docker_ip }}:${active_port}

    if !(/usr/sbin/iptables -L DOCKER -n | grep -P "ACCEPT.*dpt:${active_port}.*"); then
      /usr/sbin/iptables -I DOCKER -p tcp -d {{ qbittorrent_docker_ip }} --dport ${active_port} -j ACCEPT
      return 0
    else
      return 1
    fi
  else
    return 1
  fi
}

get_portmap() {
  res=0
  public_ip=$(getpublicip)
  if ! qbt_checksid; then
    echo "$(timestamp) | qBittorrent Cookie invalid, getting new SessionID"
    if ! qbt_login; then
      echo "$(timestamp) | Failed getting new SessionID from qBittorrent"
      return 1
    fi
  else
    echo "$(timestamp) | qBittorrent SessionID Ok!"
  fi

  configured_port=$(findconfiguredport "${qbt_sid}")
  active_port=$(findactiveport)

  echo "$(timestamp) | Public IP: ${public_ip}"
  echo "$(timestamp) | Configured Port: ${configured_port}"
  echo "$(timestamp) | Active Port: ${active_port}"

  if [[ ${configured_port} != ${active_port} ]]; then
    if qbt_changeport "${qbt_sid}" ${active_port}; then
      if fw_delrule; then
          echo "$(timestamp) | IPTables rule deleted for port ${configured_port}"
      fi
      echo "$(timestamp) | Port Changed to: $(findconfiguredport ${qbt_sid})"
    else
      echo "$(timestamp) | Port Change failed."
      res=1
    fi
  else
    echo "$(timestamp) | Port OK (Act: ${active_port} Cfg: ${configured_port})"
  fi

  if fw_addrule; then
    echo "$(timestamp) | IPTables rule added for port ${active_port}"
  fi

  return $res
}

check_qbt_ct_health() {
  while true;
  do
    if ! docker inspect "qbittorrent" --format='{{ "{{" }}json .State.Health.Status{{ "}}" }}' | grep -q '"healthy"'; then
      echo "$(timestamp) | Waiting for qbittorrent healthy state.."
      sleep 3
    else
      echo "$(timestamp) | VPN container qbittorrent in healthy state!"
      break
    fi
  done
}

load_vals(){
  public_ip=$(getpublicip)
  if qbt_isreachable; then
    if qbt_login; then
      configured_port=$(findconfiguredport "${qbt_sid}")
    else
      echo "$(timestamp) | Unable to login to qBittorrent at https://{{ ansible_host }}"
      exit 7
    fi
  else
    echo "$(timestamp) | Unable to login to qBittorrent at https://{{ ansible_host }}"
    exit 6
  fi
  active_port=''
}

public_ip=
configured_port=
active_port=
qbt_sid=

# Wait for a healthy state on the qbittorrent container
check_qbt_ct_health

# Load public ip, active port & session id
load_vals

[ -z ${public_ip} ] && { echo "$(timestamp) | Unable to grab VPN Public IP. Please check configuration"; exit 3; }
[ -z ${configured_port} ] && { echo "$(timestamp) | qBittorrent configured port value is empty(?). Please check configuration"; exit 4; }
[ -z "${qbt_sid}" ] && { echo "$(timestamp) | Unable to grab qBittorrent SessionID. Please check configuration"; exit 5; }

while true;
do
  if get_portmap; then
    echo "$(timestamp) | NAT-PMP/UPnP Ok!"
  else
    echo "$(timestamp) | NAT-PMP/UPnP Failed"
  fi
  echo "$(timestamp) | Sleeping for $(echo {{ protonvpn_port_forward_interval }}) seconds"
  sleep {{ protonvpn_port_forward_interval }}
done

exit $?
