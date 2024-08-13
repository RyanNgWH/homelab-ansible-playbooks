<!-- @format -->

# Proxmox

This role contains common tasks to be executed on Proxmox VE Hosts.

Supported tasks:

1. Manage snapshots - `snapshot`

## Requirements

This role utilises modules from the following collections that is not part of `ansible-core` and might need to be installed:

- community.general

The following requirements are needed on the host that executes this role

- proxmoxer
- requests

## Role Variables

### Required

| Variable                   | Description              | Default | Example                                |
| -------------------------- | ------------------------ | ------- | -------------------------------------- |
| `proxmox_task_list`        | List of tasks to execute | `[]`    | `[ "snapshot" ]`                       |
| `proxmox_api_host`         | Proxmox host             |         | `server.tinynamoo.com`                 |
| `proxmox_api_port`         | Proxmox api port         | `443`   | `443`                                  |
| `proxmox_api_user`         | User on Proxmox host     |         | `ansible`                              |
| `proxmox_api_token_id`     | Proxmox token ID         |         | `ansible@pam!ansible`                  |
| `proxmox_api_token_secret` | Proxmox token secret     |         | `aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee` |

### Snapshot

| Variable                       | Description                       | Default | Example                 |
| ------------------------------ | --------------------------------- | ------- | ----------------------- |
| `proxmox_snapshot_vmid`        | ID of instance to snapshot        |         | `20100`                 |
| `proxmox_snapshot_name`        | Name of the snapshot              |         | `Pre-upgrade`           |
| `proxmox_snapshot_description` | Description of the snapshot       | ""      | `Pre-upgrade to v1.0.0` |
| `proxmox_snapshot_retention`   | Number of snapshots to keep       | 3       | `1`                     |
| `proxmox_snapshot_include_ram` | Option to include RAM in snapshot | false   | `true`                  |

## Example Playbooks

This example takes a snapshot of VM (including RAM) `20100` and keeps the latest 3 snapshots.

### Choosing tasks

```
- hosts: proxmox
  vars:
    proxmox_task_list:
      - snapshot
    proxmox_api_host: server.tinynamoo.com
    proxmox_api_user: ansible
    proxmox_api_token_id: ansible@pam!ansible
    proxmox_api_token_secret: aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee
    proxmox_snapshot_vmid: 20100
    proxmox_snapshot_name: Pre-upgrade-v1
    proxmox_snapshot_description: Pre-upgrade to v1
    proxmox_snapshot_retention: 3
    proxmox_snapshot_include_ram: true

  roles:
      - proxmox
```

## Author Information

This role is created and maintained by [Ryan Ng](https://www.github.com/RyanNgWH)
