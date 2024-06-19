<!-- @format -->

# NFSv4 Client Setup

This role sets up NFSv4 with Kerberos authentication on a Debian 12 system.

It executes the following tasks:

1. Ensure NFS user is present
1. Install NFS and Kerberos clients
1. Configure kerberos client
1. Configure NFS mount

## Requirements

This role utilises modules from the following collections that is not part of `ansible-core` and might need to be installed:

- ansible.posix

## Role Variables

### Kerberos

| Variable                    | Description                                                  | Default | Example                 |
| --------------------------- | ------------------------------------------------------------ | ------- | ----------------------- |
| `nfs_krb5_realm`            | Kerberos authentication realm.                               |         | `TINYNAMOO.COM`         |
| `nfs_krb5_kdc`              | Kerberos KDC server.                                         |         | `storage.tinynamoo.com` |
| `nfs_krb5_admin_server`     | Kerberos admin server.                                       |         | `storage.tinynamoo.com` |
| `nfs_krb5_host_keytab_file` | Path to host keytab file (`/etc/krb5.keytab`).               |         |                         |
| `nfs_krb5_user_keytab_file` | Path to user keyta file (`/home/<user>/.config/krb5.keytab`) |         |                         |

### NFS

| Variable           | Description                      | Default | Example                |
| ------------------ | -------------------------------- | ------- | ---------------------- |
| `nfs_user_name`    | Username of NFS user.            |         | `wikijs`               |
| `nfs_user_id`      | UID & GID of the NFS user.       |         | `170`                  |
| `nfs_mount_server` | NFS server domain name.          |         | `storage.tinynamoo.com |
| `nfs_mount_share`  | NFS share to be mounted          |         | `winter`               |
| `nfs_mount_point`  | Directory to mount the NFS share |         | `/srv/winter`          |

## Example Playbook

```
- hosts: nfs
  vars:
    nfs_krb5_realm: TINYNAMOO.COM
    nfs_krb5_kdc: storage.tinynamoo.com
    nfs_krb5_admin_server: storage.tinynamoo.com
    nfs_krb5_host_keytab_file: "/path/to/your/host/keytab/file"
    nfs_krb5_user_keytab_file: "/path/to/your/user/keytab/file"
    nfs_user_name: wikij
    nfs_user_id: 170
    nfs_mount_server: storage.tinynamoo.com
    nfs_mount_share: winter
    nfs_mount_point: /srv/winter

  roles:
      - nfsv4-client-setup
```

## Author Information

This role is created and maintained by [Ryan Ng](https://www.github.com/RyanNgWH)
