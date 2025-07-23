<!-- @format -->

# OPNsense Ansible playbook

Playbook for installing and configuring the OPNsense router

# Usage

1. Run this playbook
1. Navigate to the OPNsense GUI and add a cron job for sanoid

# Notes

The sanoid package is not ported to the OPNsense repository which is the only enabled respository by default.

This playbook temporarily enable the FreeBSD repository `/usr/local/etc/pkg/repos/FreeBSD.conf` before searching for the sanoid package and disabling the repository again.

**Always disable the repository after installing as packages from the FreeBSD repository could break OPNsense**

# Updating OPNsense

Major updates of OPNsense could fail due to incompatible versions of `pkg`. This occurs since `pkg` might update itself using the FreeBSD repository when installing sanoid. Downgrading `pkg` to the OPNsense supported version can solve this issue.

### Example

```
fetch https://pkg.opnsense.org/FreeBSD:14:amd64/25.1/MINT/25.1.12/latest/All/pkg-1.19.2_5.pkg && pkg install -f pkg-1.19.2_5.pkg
```
