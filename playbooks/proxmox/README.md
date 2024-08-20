<!-- @format -->

# Proxmox Ansible playbook

Playbook for installing and configuring the Proxmox host

# Usage

Certain tasks are not supported by this playbook (or using the opentofu infrastructure management system) and have to be configured manually.

1. Execute the playbook
1. Setup the following manual configurations (Until `API tokens`)
1. Execute the Packer VM templates
1. Execute the OpenTofu infrastructure management templates
1. Setup the remaining manual configurations (From `Datacenter firewall options`)
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

### Node firewall rules & options

Datacenter & node level firewall rules & options have to be manually added as it is not currently supported by the opentofu bpg/proxmox plugin (as of v0.62.0)

#### Rules

| Type | Action | Macro | Source                | Destination    | Log level | Description                                                                   |
| ---- | ------ | ----- | --------------------- | -------------- | --------- | ----------------------------------------------------------------------------- |
| in   | ACCEPT | Ping  | lan_airport_privilege | sierra_proxmox | nolog     | [ICMP] [Allow] LAN & Airport privilege to Sierra proxmox hypervisor           |
| in   | ACCEPT | SSH   | lan_airport_privilege | sierra_proxmox | nolog     | [SSH] [Allow] LAN & Airport privilege to Sierra proxmox hypervisor            |
| in   | ACCEPT | HTTPS | serene_uptime-kuma    | sierra_proxmox | nolog     | [Status - HTTPS] [Allow] Uptime_Kuma to Sierra proxmox management interface   |
| in   | ACCEPT | HTTP  | lan_airport_privilege | sierra_proxmox | nolog     | [HTTP] [Allow] LAN & Remote privilege to Sierra proxmox management interface  |
| in   | ACCEPT | HTTPS | lan_airport_privilege | sierra_proxmox | nolog     | [HTTPS] [Allow] LAN & Remote privilege to Sierra proxmox management interface |

#### Options

| Option           | Value |
| ---------------- | ----- |
| Firewall         | Yes   |
| SMURFS filter    | Yes   |
| TCP flags filter | Yes   |
| NDP (IPv6 only)  | No    |

### Datacenter firewall options

| Option         | Value   |
| -------------- | ------- |
| Firewall       | Yes     |
| ebtables       | Yes     |
| Log rate limit | Default |
| Input Policy   | DROP    |
| Output Policy  | ACCEPT  |
