<!-- @format -->

# Debian Common

This role contains common tasks to be executed on Debian systems.

Supported tasks:

1. Install git
1. Install docker

## Role Variables

### Required

| Variable    | Description              | Default | Example               |
| ----------- | ------------------------ | ------- | --------------------- |
| `task_list` | List of tasks to execute | `[]`    | `[ "git", "docker" ]` |

## Example Playbooks

This example installs both git and docker on the remote systems.

```
- hosts: debian
  vars:
    task_list:
      - git
      - docker

  roles:
      - debian-common
```

This example installs only docker on the remote systems.

```
- hosts: debian
  vars:
    task_list:
      - docker

  roles:
      - debian-common
```

## Author Information

This role is created and maintained by [Ryan Ng](https://www.github.com/RyanNgWH)
