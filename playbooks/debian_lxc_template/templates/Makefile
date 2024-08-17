BASEDIR:=$(shell dab basedir)

all: info/init_ok
	dab bootstrap --minimal
	dab install ca-certificates sudo python3 dbus

	dab exec groupadd ansible
	dab exec useradd -m -c ansible -g ansible -G sudo -p \$$6\$$iYzj9V7kedB7jEtK\$$tRL09.kJ9JNQ4t16GNAxpzK1xEBID0GGkr9/J79LrtKTVYyBqSJnX3vkFf0KV4JPV0KUL9pqI1bqtGW1Ac27e/ -s "/bin/bash" ansible
	dab exec mkdir -p /home/ansible/.ssh
	dab exec chmod 700 /home/ansible/.ssh
	dab exec bash -c "echo ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPOfEXrgD0V0+nyAHvpBavgG+8TTfV69Xv4kgZ3qHLhY Ansible administration > /home/ansible/.ssh/authorized_keys"
	dab exec chmod 600 /home/ansible/.ssh/authorized_keys
	dab exec chown -R ansible:ansible /home/ansible/.ssh

	dab finalize

info/init_ok: dab.conf
	dab init
	touch $@

.PHONY: clean
clean:
	dab clean
	rm -f *~

.PHONY: dist-clean
dist-clean:
	dab dist-clean
	rm -f *~
