<!-- @format -->

# Tinynamoo Ansible Playbooks

Playbooks for the Tinynamoo homelab environment.

## Installation

1. [Install Ansible](https://docs.ansible.com/ansible/latest/installation_guide/index.html)
1. Clone this repository to your local machine
1. Run `ansible-galaxy install -r roles/requirements.yaml` inside this directory to install the required Ansible dependencies

## Usage

1. Update configurations as required under `config/[application]-config.yaml`. (Configuration variables as well as default values can be found in `config/[application]-default-config.yaml`)
1. Run the desired playbook using `ansible-playbook -i inventory [playbook].yaml`
