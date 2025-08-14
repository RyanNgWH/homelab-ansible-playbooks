<!-- @format -->

# Debian 13 Setup

This role sets up common basic configurations on a Debian 13 system.

It executes the following tasks:

1. Install and configure time synchronisation using `chrony`
1. Update `apt` sources and packages
1. Harden SSH server
1. Install `unattended-upgrades`
1. Create default VM user with SSH public key
1. Install Prometheus Node Exporter for metrics

## Requirements

This role utilises modules from the following collections that is not part of `ansible-core` and might need to be installed:

- ansible.posix
- community.general
- prometheus.prometheus

## Role Variables

### Time synchronisation

| Variable                         | Description                                                         | Default          |
| -------------------------------- | ------------------------------------------------------------------- | ---------------- |
| `debian_datetime_ntp_server`     | Primary NTP server to synchronise with.                             | `pool.ntp.org`   |
| `debian_datetime_timezone`       | Timezone of the system.                                             | `Asia/Singapore` |
| `debian_datetime_hardware_clock` | Timezone of hardware clock.<br><br>Options:<br>- `UTC`<br>- `local` | `UTC`            |

### Time synchronisation

| Variable                     | Description                                                                                                                                           | Default     |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `debian_user_name`           | Username of default VM user to be created.                                                                                                            | `debian`    |
| `debian_user_password`       | Hashed password of default VM user to be created. Use `*` to lock user password.<br><br>Hashed password can be generated using `mkpasswd -m SHA-512`. | `*`         |
| `debian_user_shell`          | Shell of the default VM user to be created.                                                                                                           | `/bin/bash` |
| `debian_user_ssh_public_key` | Path to SSH public key of the default VM user to be created.                                                                                          |             |

## Example Playbook

```
- hosts: debian
  vars:
    debian_datetime_ntp_server: 0.debian.pool.ntp.org
    debian_user_name: ansible

  roles:
      - debian-13-setup
```

## Author Information

This role is created and maintained by [Ryan Ng](https://www.github.com/RyanNgWH)
