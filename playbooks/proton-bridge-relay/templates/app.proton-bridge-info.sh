#!/usr/bin/expect

spawn /opt/proton-bridge/proton-bridge --cli

# Sleep to allow user account to initilise (else will be locked and following commands will not execute properly)
sleep 10

expect ">>>" {
  send "info\r"
}

expect -re "Security:.*>>>" {
  send "exit\r"
}