<!-- @format -->

# Tinynamoo Ansible Playbooks

Playbooks for the Tinynamoo homelab environment.

# Requirements

## Local system

The following softwares must be installed on the local machine before ansible can be used to manage the servers.

- [Ansible](https://docs.ansible.com/ansible/latest/index.html)

## Setup

1. Clone this repository to your local machine
1. Install the required Ansible dependencies

```bash
ansible-galaxy install -r roles/requirements.yaml
```

# Usage

1. Add ansible ssh private key to `ssh-agent`

```bash
# Add ssh key
ssh-add "/path/to/your/ssh/key"

# Verify key has been added
ssh-add -L
```

2. Run the desired playbook

```bash
ansible-playbook -i inventories [playbook].yaml --ask-become-pass
```

# Configuration

Each playbook has a configuration file `configs/[playbook].config.yaml`

Default configuration variables for each role can be found in `defaults/[role].config.yaml`

# Playbooks

| Playbook | Description                          | Command                                         |
| -------- | ------------------------------------ | ----------------------------------------------- |
| Arkenfox | Update arkenfox on installed systems | `ansible-playbook -i inventories arkenfox.yaml` |
