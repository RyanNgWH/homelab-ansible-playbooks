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
