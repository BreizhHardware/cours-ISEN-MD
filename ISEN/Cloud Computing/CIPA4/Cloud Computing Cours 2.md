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

