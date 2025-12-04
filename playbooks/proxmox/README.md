<!-- @format -->

# Proxmox Ansible playbook

Playbook for installing and configuring the Proxmox host

# Usage

Certain tasks are not supported by this playbook (or using the opentofu infrastructure management system) and have to be configured manually.

1. Execute the playbook
1. Setup the following manual configurations (Until `API tokens`)
1. Execute the Packer VM templates
1. Execute the OpenTofu infrastructure management templates (without lxc templates)
   > The ansible vm is required to generate the lxc template used for provision lxc containers
1. Execute the `debian_lxc_template` to generate the lxc template
1. Execute the remaining OpenTofu infrastructure management templates
1. Setup the remaining manual configurations (From `Node firewall options`)
1. Execute the Ansible playbooks for the various services

## Manual configurations

### Two Factor

1. Setup WebAuthn settings under `Datacenter > Options > WebAuthn Settings`

   - Name - `server.tinynamoo.com`
   - ID - `server.tinynamoo.com`

1. Setup `webauthn` & `recovery` two factor authentications for all users

### API tokens

| User         | Token ID | Comment                                       | Privilege Seperation |
| ------------ | -------- | --------------------------------------------- | -------------------- |
| ansible@pam  | ansible  | [Ansible] Ansible administration              | ❌                   |
| opentofu@pam | opentofu | [Opentofu] Opentofu infrastructure management | ❌                   |
| packer@pve   | packer   | [Packer] Packer VM templating                 | ❌                   |

### Datacenter & Node firewall options

Datacenter & node level firewall options have to be manually added as it is not currently supported by the opentofu bpg/proxmox plugin (as of v0.88.0)

#### Node firewall options

| Option           | Value |
| ---------------- | ----- |
| Firewall         | Yes   |
| SMURFS filter    | Yes   |
| TCP flags filter | Yes   |
| NDP (IPv6 only)  | No    |
| nftables         | Yes   |

#### Datacenter firewall options

| Option         | Value   |
| -------------- | ------- |
| Firewall       | Yes     |
| ebtables       | Yes     |
| Log rate limit | Default |
| Input Policy   | DROP    |
| Output Policy  | ACCEPT  |
