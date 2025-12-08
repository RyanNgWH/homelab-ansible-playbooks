<!-- @format -->

# Tinynamoo Ansible Playbooks

Playbooks for the Tinynamoo homelab environment.

# Requirements

## Local system

The following softwares must be installed on the local machine before ansible can be used to manage the servers.

- [Ansible](https://docs.ansible.com/ansible/latest/index.html)

### Python

The following python packages must be installed on the local machine before ansible can be used to manage the servers.

- github3.py
- pexpect
- proxmoxer
- pyjwt

## Proxmox

### SSH connection

1. Create a pam user for the SSH connection

```
adduser ansible
```

1. Configure the `sudo` privilege for the user

   ```bash
   visudo --file=/etc/sudoers.d/ansible
   ```

   Add the following lines

   ```conf
   ansible ALL=(root) ALL
   ```

1. Add SSH public key file to the `~/.ssh/authorized_keys` file of the `ansible` user.
1. Test the SSH connection and password-less sudo

   ```bash
   ssh -i "/path/to/private/key" ansible@your-server sudo -S pvesm apiinfo
   ```

   > **Note:**
   >
   > If you have a clustered proxmox instance, this user has to be created with `sudo` privileges on all nodes in the cluster

### API token

An API token with the following permissions has to be created on your Proxmox instance. Stricter permissions might be possible but these playbooks have only been tested with the following proxmox privileges:

- VM.Audit
- VM.Snapshot

## Setup

1. Clone this repository to your local machine
1. Install the required Ansible dependencies

   ```bash
   ansible-galaxy install -r requirements.yaml
   ```

# Usage

1. Add ansible ssh private key to `ssh-agent`

   ```bash
   # Add ssh key
   ssh-add "/path/to/your/ssh/key"

   # Verify key has been added
   ssh-add -L
   ```

1. Run the desired playbook from the root of this project

   ```bash
   ansible-playbook playbooks/<application>/main.yaml [-K --ask-become-pass] [-J --ask-vault-pass] --tags "[tags]"
   ```

# Playbooks

| Playbook                          | Description                                   | Command                                                                       | Notes                                                                |
| --------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Arkenfox                          | Update arkenfox on installed systems          | `ansible-playbook playbooks/arkenfox/main.yaml`                               |                                                                      |
| Bazarr                            | Manage Bazarr subtitles mangement server      | `ansible-playbook playbooks/bazarr/main.yaml -KJ --tags "<tag>"`              | Supported tags<li>`install`<li>`upgrade`                             |
| Debian                            | Manage Debian servers                         | `ansible-playbook playbooks/debian/main. -K --tags <tag>`                     | Supported tags<li>`install`<li>`upgrade`                             |
| Debian LXC Template               | Generate a Debian LXC template                | `ansible-playbook playbooks/debian_lxc_template/main.yaml -K`                 | Save location of generated template can be modified in `config.yaml` |
| Drop                              | Manage Drop games management server           | `ansible-playbook playbooks/drop/main.yaml -KJ -- tags "<tag>"`               | Supported tags<li>`install`                                          |
| Firefly                           | Manage Firefly III finance management server  | `ansible-playbook playbooks/firefly/main.yaml -KJ --tags "<tag>"`             | Supported tags<li>`install`<li>`upgrade`                             |
| Gitea                             | Manage Gitea git hosting server               | `ansible-playbook playbooks/gitea/main.yaml -KJ --tags "<tag>"`               | Supported tags<li>`install`<li>`upgrade`                             |
| Immich                            | Manage Immich photos managment server         | `ansible-playbook playbooks/immich/main.yaml -KJ --tags "<tag>"`              | Supported tags<li>`install`<li>`upgrade`                             |
| IT-Tools                          | Manage IT-Tools developer tools server        | `ansible-playbook playbooks/it_tools/main.yaml -KJ --tags "<tag>"`            | Supported tags<li>`install`<li>`upgrade`                             |
| Jellyfin                          | Manage Jellyfin media streaming server        | `ansible-playbook playbooks/jellyfin/main.yaml -KJ --tags "<tag>"`            | Supported tags<li>`install`<li>`upgrade`                             |
| Jellyseerr                        | Manage Jellyseerr media mangement server      | `ansible-playbook playbooks/jellyseerr/main.yaml -KJ --tags "<tag>"`          | Supported tags<li>`install`<li>`upgrade`                             |
| Mat2-Web                          | Manage Mat2-Web metadata cleaner server       | `ansible-playbook playbooks/mat2_web/main.yaml -KJ --tags "<tag>"`            | Supported tags<li>`install`<li>`upgrade`                             |
| Miniflux                          | Manage Miniflux feed reader server            | `ansible-playbook playbooks/miniflux/main.yaml -KJ --tags "<tag>"`            | Supported tags<li>`install`<li>`upgrade`                             |
| NAS                               | Manage the Network attached storage server    | `ansible-playbook playbooks/nas/main.yaml -KJ --tags "<tag>"`                 | Supported tags<li>`install`                                          |
| Nextcloud                         | Manage Nextcloud cloud storage server         | `ansible-playbook playbooks/nextcloud/main.yaml -KJ --tags "<tag>"`           | Supported tags<li>`install`<li>`upgrade`                             |
| Ntfy                              | Manage Ntfy notifications server              | `ansible-playbook playbooks/ntfy/main.yaml -KJ --tags "<tag>"`                | Supported tags<li>`install`<li>`upgrade`                             |
| Opnsense                          | Manage OPNsense router                        | `ansible-playbook playbooks/opnsense/main.yaml -KJ --tags "<tag>"`            | Supported tags<li>`install`                                          |
| Paperless                         | Manage Paperless documents management server  | `ansible-playbook playbooks/paperless/main.yaml -KJ --tags "<tag>"`           | Supported tags<li>`install`<li>`upgrade`                             |
| Piped                             | Manage Piped youtube proxy server             | `ansible-playbook playbooks/piped/main.yaml -KJ --tags "<tag>"`               | Supported tags<li>`install`                                          |
| [Depreciated] Proton Bridge Relay | Manage proton bridge smtp relay               | `ansible-playbook playbooks/proton_bridge_relay/main.yaml -KJ --tags "<tag>"` | Supported tags<li>`install`                                          |
| Prowlarr                          | Manage Prowlarr indexers management server    | `ansible-playbook playbooks/prowlarr/main.yaml -KJ --tags "<tag>"`            | Supported tags<li>`install`<li>`upgrade`                             |
| Proxmox                           | Manage Proxmox hypervisor server              | `ansible-playbook playbooks/proxmox/main.yaml -KJ --tags "<tag>"`             | Supported tags<li>`install`                                          |
| qBittorrent                       | Manage qBittorrent download client server     | `ansible-playbook playbooks/qbittorrent/main.yaml -KJ --tags "<tag>"`         | Supported tags<li>`install`<li>`upgrade`                             |
| Radarr                            | Manage Radarr movies management server        | `ansible-playbook playbooks/radarr/main.yaml -KJ --tags "<tag>"`              | Supported tags<li>`install`<li>`upgrade`                             |
| Recyclarr                         | Manage Recyclarr trash guides sync service    | `ansible-playbook playbooks/recyclarr/main.yaml -KJ --tags "<tag>"`           | Supported tags<li>`upgrade`                                          |
| Scrutiny                          | Manage Scrutiny SMART monitoring server       | `ansible-playbook playbooks/scrutiny/main.yaml -KJ --tags "<tag>"`            | Supported tags<li>`install`                                          |
| Send                              | Manage Send file sharing server               | `ansible-playbook playbooks/send/main.yaml -KJ --tags "<tag>"`                | Supported tags<li>`install`<li>`upgrade`                             |
| Sonarr                            | Manage Sonarr TV management server            | `ansible-playbook playbooks/sonarr/main.yaml -KJ --tags "<tag>"`              | Supported tags<li>`install`<li>`upgrade`                             |
| Stirling PDF                      | Manage Stirling PDF tools server              | `ansible-playbook playbooks/stirling_pdf/main.yaml -KJ --tags "<tag>"`        | Supported tags<li>`install`<li>`upgrade`                             |
| Uptime Kuma                       | Manage Uptime Kuma monitoring server          | `ansible-playbook playbooks/uptime_kuma/main.yaml -KJ --tags "<tag>"`         | Supported tags<li>`install`<li>`upgrade`                             |
| Vikunja                           | Manage Vikunja tasks management server        | `ansible-playbook playbooks/vikunja/main.yaml -KJ --tags "<tag>""`            | Supported tags<li>`install`<li>`upgrade`                             |
| Wallos                            | Manage Wallos subscriptions management server | `ansible-playbook playbooks/wallos/main.yaml -KJ --tags "<tag>""`             | Supported tags<li>`install`<li>`upgrade`                             |
| Wikijs                            | Manage Wikijs wiki engine server              | `ansible-playbook playbooks/wikijs/main.yaml -KJ --tags "<tag>""`             | Supported tags<li>`install`<li>`upgrade`                             |
| Your-Spotify                      | Manage Your-Spotify statistics server         | `ansible-playbook playbooks/your_spotify/main.yaml -KJ --tags "<tag>""`       | Supported tags<li>`install`<li>`upgrade`                             |
