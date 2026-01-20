data "openstack_networking_network_v2" "public" {
  name = "public"
}

resource "openstack_networking_network_v2" "private" {
  name           = "private"
  admin_state_up = true
}

resource "openstack_networking_subnet_v2" "private_subnet" {
  name       = "private_subnet"
  network_id = openstack_networking_network_v2.private.id
  cidr       = "192.168.1.0/24"
  ip_version = 4
  dns_nameservers = ["1.1.1.1", "8.8.8.8"]
}

resource "openstack_networking_router_v2" "router" {
  name                = "router"
  admin_state_up      = true
  external_network_id = data.openstack_networking_network_v2.public.id
}

resource "openstack_networking_router_interface_v2" "router_interface" {
  router_id = openstack_networking_router_v2.router.id
  subnet_id = openstack_networking_subnet_v2.private_subnet.id
}

resource "openstack_compute_instance_v2" "demo-flask" {
  name        = "demo-flask"
  image_name  = "Debian 13"
  flavor_name = "small"
  key_pair    = "isen"
  network {
    name = openstack_networking_network_v2.private.name
  }
  security_groups = [openstack_networking_secgroup_v2.allow_ssh_and_ping.id]
  user_data = file("install-demo-flask.sh")
}

resource "openstack_networking_floatingip_v2" "frontend_fip" {
  pool = "public"
}

resource "openstack_compute_instance_v2" "nginx-frontend" {
  name        = "nginx-frontend"
  image_name  = "Debian 13"
  flavor_name = "small"
  key_pair    = "isen"
  network {
    name = openstack_networking_network_v2.private.name
  }
  security_groups = [openstack_networking_secgroup_v2.allow_web.id]
  user_data = templatefile("${path.module}/install-nginx.sh.tpl", {
    frontend = openstack_networking_floatingip_v2.frontend_fip.address
    backend  = openstack_compute_instance_v2.demo-flask.access_ip_v4
  })
  depends_on = [openstack_compute_instance_v2.demo-flask]
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

resource "openstack_networking_secgroup_rule_v2" "allow_flask_8080" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 8080
  port_range_max    = 8080
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.allow_ssh_and_ping.id
}

resource "openstack_networking_secgroup_v2" "allow_web" {
  name        = "allow_web"
  description = "Security group to allow HTTP and HTTPS"
}

resource "openstack_networking_secgroup_rule_v2" "allow_http" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 80
  port_range_max    = 80
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.allow_web.id
}

resource "openstack_networking_secgroup_rule_v2" "allow_https" {
  direction         = "ingress"
  ethertype         = "IPv4"
  protocol          = "tcp"
  port_range_min    = 443
  port_range_max    = 443
  remote_ip_prefix  = "0.0.0.0/0"
  security_group_id = openstack_networking_secgroup_v2.allow_web.id
}

resource "openstack_compute_floatingip_associate_v2" "frontend_fip_assoc" {
  floating_ip = openstack_networking_floatingip_v2.frontend_fip.address
  instance_id = openstack_compute_instance_v2.nginx-frontend.id
}

output "demo-flask-url" {
  value = "${format("http://%s", openstack_compute_instance_v2.demo-flask.access_ip_v4)}:8080"
}

output "nginx-url" {
  value = "https://${openstack_networking_floatingip_v2.frontend_fip.address}.xip.opensteak.fr"
}
