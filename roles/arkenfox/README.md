<!-- @format -->

# Arkenfox

This role updates [arkenfox](https://github.com/arkenfox/user.js) on a system that already has it installed. Windows systems are not supported.

It executes the following tasks:

1. Run `updater.sh` on all the profiles specified.
1. Run `prefsCleaner.sh` on all the profiles specified.

## Requirements

This role requires the following software to be installed:

- [Arkenfox](https://github.com/arkenfox/user.js)

## Role Variables

| Variable                | Description                                                               | Default              |
| ----------------------- | ------------------------------------------------------------------------- | -------------------- |
| `arkenfox_profiles_dir` | Directory containing your firefox profiles.                               | `~/.mozilla/firefox` |
| `arkenfox_profiles`     | List of direcory names of your firefox profiles configured with arkenfox. | `[ default ]`        |

## Example Playbook

```
    - hosts: arkenfox
      roles:
         - { role: arkenfox, arkenfox_profiles: [ "1usdf3hd.Default", 29sdfh3s.Arkenfox-Installed"] }
```

## Author Information

This role is created and maintained by [Ryan Ng](https://www.github.com/RyanNgWH)
