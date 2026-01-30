<!-- @format -->

# Scrutiny Ansible playbook

Playbook for installing and configuring the Scrutiny SMART monitoring server

# Usage

1. Run this playbook with the `install` tag to install the Scrutiny server
1. Run this playbook with the `deploy` tag to deploy the Scrutiny spokes
1. Run this playbook with the `deploy-opnsense` tag to deploy the Scrutiny spoke on the OPNsense server (requires special configuration)
   - Navigate to the OPNsense GUI and add a cron job for the scrutiny spoke

# Notes

There is a seperate playbook for OPNsense as it requires special configurations:

- Manual install instead of Docker
- Creation of configd action for cron job in OPNsense
