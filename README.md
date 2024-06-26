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
   ansible-playbook playbooks/<application>/main.yaml [-K --ask-become-pass] [-J --ask-vault-pass]
   ```

# Configuration

Each playbook has an associated configuration file `playbooks/<application>/config.yaml`

# Playbooks

| Playbook            | Description                                   | Command                                                             | Notes                                                                |
| ------------------- | --------------------------------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Arkenfox            | Update arkenfox on installed systems          | `ansible-playbook playbooks/arkenfox/main.yaml`                     |                                                                      |
| Debian LXC Template | Generate a Debian LXC template                | `ansible-playbook playbooks/debian-lxc-template/main.yaml -K`       | Save location of generated template can be modified in `config.yaml` |
| IT-Tools            | Manage IT-Tools developer tools server        | `ansible-playbook playbooks/it-tools/main.yaml -KJ --tags "default` | Supported tags<li>`install`<br><br>Default: `install`                |
| Piped               | Manage Piped youtube proxy server             | `ansible-playbook playbooks/piped/main.yaml -KJ --tags "default`    | Supported tags<li>`install`<br><br>Default: `install`                |
| Vikunja             | Manage Vikunja tasks management server        | `ansible-playbook playbooks/vikunja/main.yaml -KJ --tags "default"` | Supported tags<li>`install`<br><br>Default: `install`                |
| Wallos              | Manage Wallos subscriptions management server | `ansible-playbook playbooks/wallos/main.yaml -KJ --tags "default"`  | Supported tags<li>`install`<br><br>Default: `install`                |
