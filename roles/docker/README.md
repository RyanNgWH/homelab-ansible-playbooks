<!-- @format -->

# Docker

This role contains common Docker tasks.

Supported tasks:

1. Get docker container image version - `get_container_image_version`

## Requirements

This role utilises modules from the following collections that is not part of `ansible-core` and might need to be installed:

- community.docker

## Role Variables

### Required

| Variable           | Description              | Default | Example                             |
| ------------------ | ------------------------ | ------- | ----------------------------------- |
| `docker_task_list` | List of tasks to execute | `[]`    | `[ "get_container_image_version" ]` |

### Get container image version

| Variable                | Description                                                                                | Default | Example  |
| ----------------------- | ------------------------------------------------------------------------------------------ | ------- | -------- |
| `docker_container_name` | Container name to get information from                                                     |         | `immich` |
| `docker_fact_name`      | Fact prefix name to set (e.g a value of `immich` will set the fact `immich_image_version`) |         | `immich` |

#### Outputs

| Variable                               | Description                    | Example                |
| -------------------------------------- | ------------------------------ | ---------------------- |
| `{{ docker_fact_name }}_image_version` | Image version of the container | `immich_image_version` |

## Example Playbooks

This example gets version number of the container image `immich-server`.

```
- hosts: immich
  vars:
    docker_task_list:
      - get_container_image_version
    docker_container_name: immich-server

  roles:
      - docker
```

## Author Information

This role is created and maintained by [Ryan Ng](https://www.github.com/RyanNgWH)
