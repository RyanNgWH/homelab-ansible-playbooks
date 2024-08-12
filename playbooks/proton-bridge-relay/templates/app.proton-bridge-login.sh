#!/usr/bin/expect

spawn {{ proton_bridge_project_src }}/proton-bridge --cli

# Login to protonmail
expect ">>>" {
  send "login\r"
}

expect "Username:" {
  send "{{ proton_login_username }}\r"
}

expect "Password:" {
  send "{{ proton_login_password }}\r"
}

expect "Two factor code:" {
  send "{{ proton_2fa_code.user_input }}\r"
}

# Sleep to allow user account to initilise (else will be locked and following commands will not execute properly)
sleep 1

# Change inbox to split mode (different inbox for each email)
expect ">>>" {
  send "change mode {{ proton_login_username }}\r"
}

expect -re ".*change the mode.*split.*" {
  send "yes\r"
}

# Disable telemetry
expect ">>>" {
  send "telemetry disable\r"
}

expect -re ".*disable usage diagnostics.*:" {
  send "yes\r"
}

# Export certificates
expect ">>>" {
  send "cert export\r"
}

expect -re ".*path to which to export.*" {
  send "/home/{{ proton_user_name }}/.config/protonmail/bridge-v3\r"
}

expect ">>>" {
  send "exit\r"
}