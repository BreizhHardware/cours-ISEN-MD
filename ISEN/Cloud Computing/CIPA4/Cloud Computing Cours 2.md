#CIPA4 #CloudComputing #DP 
# TP Openstack
## Instance
### Boot
Q: what command did you use to boot a `small` `Debian 12` instance using your `keypair` on `public` network?
```bash
openstack server create --image 'Debian 12' --flavor small --network public --key-name isen myvm01
```

### Ping
Q: is it working?
No

### Security rules
Q: is ping working now?
Yes

### Connect with ssh
Now, add a `rule`to allow `ssh` (tcp/22) and try connecting to your instance with SSH
```bash
openstack security group rule create --protocol tcp --ingress default
```

### Delete the instance
Q: which command can you use to delete the instance?
```bash
openstack server delete myvm01
```
## Private networks
### Create a router
Q: which IP address the router is having in your private network?
192.168.42.1

Q: which IP addres the router is having as external gateway?
51.91.90.70

### Boot
```bash
openstack server create --image 'Debian 12' --flavor small --network private --key-name isen myvm01
```
Q: can you access to your instance in SSH?
No

### Floating IP
```bash
openstack server add floating ip myvm01 51.91.90.76
```
Q: what IP can you see on ens3 interface of the instance?
```Bash
debian@myvm01:~$ ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host noprefixroute 
       valid_lft forever preferred_lft forever
2: ens3: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1450 qdisc fq_codel state UP group default qlen 1000
    link/ether fa:16:3e:89:ad:33 brd ff:ff:ff:ff:ff:ff
    altname enp0s3
    inet 192.168.42.82/24 metric 100 brd 192.168.42.255 scope global dynamic ens3
       valid_lft 86313sec preferred_lft 86313sec
    inet6 fe80::f816:3eff:fe89:ad33/64 scope link 
       valid_lft forever preferred_lft forever
```

## Userdata
### Start an instance
```bash
openstack server create --image 'Debian 12' --flavor small --network private --key-name isen --user-data postinstall.sh myvm01
```

### Check the result
Q: what is the name of the service running inside your instance that execute this `user-data` script?
cloud-init

Q: from which url this service retrieve the script?
http://169.254.169.254/openstack/2012-08-10/user_data

## demo-flask
```bash
#!/bin/bash

# Setup logging
exec > >(tee -a /var/log/postinstall.log) 2>&1

echo "Starting post-installation setup..."
sudo apt update

echo "Installing dependencies..."
sudo apt install -y python3-pip python3-venv git

echo "Cloning repository..."
git clone https://github.com/arnaudmorin/demo-flask.git /home/debian/demo-flask

echo "Creating virtual environment..."
python3 -m venv /home/debian/demo-flask/venv

echo "Installing Python requirements..."
/home/debian/demo-flask/venv/bin/pip install -r /home/debian/demo-flask/requirements.txt

echo "Starting the application..."
nohup bash -c "source /home/debian/demo-flask/venv/bin/activate && /home/debian/demo-flask/start.sh" &

echo "Setup complete."
```