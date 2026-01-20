terraform {
  required_providers {
    openstack = {
      source = "terraform-provider-openstack/openstack"
      version = "1.46.0"
    }
  }
}

provider "openstack" {
}


resource "openstack_compute_instance_v2" "server1" {
  name        = "server1"
  image_name  = "Debian 13"
  flavor_name = "small"
  key_pair    = "isen"
  network {
    name = "public"
  }
  security_groups = ["allow_ssh_and_ping"]
}

resource "openstack_networking_secgroup_v2" "allow_ssh_and_ping" {
  name        = "allow_ssh_and_ping"
  description = "Security group to allow SSH and ping"
}

resource "openstack_networking_secgroup_rule_v2" "allow_ssh" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 22
  port_range_max    = 22
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.allow_ssh_and_ping.id
}

resource "openstack_networking_secgroup_rule_v2" "allow_ping" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "icmp"
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.allow_ssh_and_ping.id
}

