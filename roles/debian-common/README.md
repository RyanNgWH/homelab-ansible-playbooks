<!-- @format -->

# Debian Common

This role contains common tasks to be executed on Debian systems.

Supported tasks:

1. Install git - `git`
1. Install docker - `docker`
1. Install and configure nginx with TLS certificates (Using certbot and cloudflare) - `nginx`

## Requirements

This role utilises modules from the following collections that is not part of `ansible-core` and might need to be installed:

- community.crypto

## Role Variables

### Required

| Variable                  | Description              | Default | Example               |
| ------------------------- | ------------------------ | ------- | --------------------- |
| `debian_common_task_list` | List of tasks to execute | `[]`    | `[ "git", "docker" ]` |

### Nginx

| Variable                         | Description                                                                                                                                             | Default | Example                                      |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------------------------------------- |
| `nginx_user`                     | User used to run nginx.                                                                                                                                 |         | `www-data`                                   |
| `nginx_group`                    | Group used to run nginx.                                                                                                                                |         | `www-data`                                   |
| `nginx_conf_files`               | List of nginx configuration files objects. Each object has 2 fields `filename` & `path`.                                                                |         | Refer to the example playbooks below         |
| `nginx_tls_cloudflare_api_token` | Cloudflare API token for generating TLS certificates.                                                                                                   |         |                                              |
| `nginx_tls_domains`              | List of domains to generate TLS certificates for.                                                                                                       |         | `[ "site1.domain.com", "site2.domain.com" ]` |
| `nginx_tls_timeout`              | Timeout duration to wait for DNS verification. Increase this if verification is failing (especially if you are creating multiple certificates at once). | `20`    | `25`                                         |
| `certbot_admin_email`            | Admin email for certbot registration and renewal emails.                                                                                                |         | `admin@domain.com`                           |

## Example Playbooks

This example installs both git and docker on the remote systems.

### Choosing tasks

```
- hosts: debian
  vars:
    debian_common_task_list:
      - git
      - docker

  roles:
      - debian-common
```

This example installs only docker on the remote systems.

```
- hosts: debian
  vars:
    debian_common_task_list:
      - docker

  roles:
      - debian-common
```

### Nginx

This example installs and configures nginx with tls certification

```
- hosts: debian
  vars:
    debian_common_task_list:
      - nginx
    nginx_conf_files:
      - filename: site1.conf
        path: /path/to/site1.conf
      - filename: site2.conf
        path: /path/to/site2.conf
    nginx_tls_cloudflare_api_token: your-api-token
    nginx_tls_domains:
      - site1.conf
      - site2.conf
    certbot_admin_email: admin@your-domain.com

  roles:
      - debian-common
```

## Author Information

This role is created and maintained by [Ryan Ng](https://www.github.com/RyanNgWH)
