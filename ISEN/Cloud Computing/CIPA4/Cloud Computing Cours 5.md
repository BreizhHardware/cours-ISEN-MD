#DP #CloudComputing #CIPA4 
# TP Terraform
## 101
```tf
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
```

## 102
```tf
resource "openstack_compute_instance_v2" "demo-flask" {
  name        = "demo-flask"
  image_name  = "Debian 13"
  flavor_name = "small"
  key_pair    = "isen"
  network {
    name = "public"
  }
  security_groups = [openstack_networking_secgroup_v2.allow_ssh_and_ping.id]
  user_data = file("install-demo-flask.sh")
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

output "demo-flask-url" {
  value = "${format("http://%s", openstack_compute_instance_v2.demo-flask.access_ip_v4)}:8080"
}
```

## 103
```tf
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
```

## 104
`main.tf`
```tf
resource "kubernetes_config_map" "nginx-config" {
  metadata {
    name = "nginx-config"
  }

  data = {
    "nginx.conf" = <<EOF
events {}

http {
  server {
    listen 80;
    location / {
      proxy_pass http://demo-flask:8080;
    }
  }
}
EOF
  }
}

resource "kubernetes_deployment" "demo-flask" {
  metadata {
    name = "demo-flask"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "demo-flask"
      }
    }

    template {
      metadata {
        labels = {
          app = "demo-flask"
        }
      }

      spec {
        container {
          image = "arnaudmorin/demo-flask:latest"
          name  = "demo-flask"

          port {
            container_port = 8080
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "demo-flask" {
  metadata {
    name = "demo-flask"
  }

  spec {
    selector = {
      app = "demo-flask"
    }

    port {
      port        = 8080
      target_port = 8080
    }

    type = "ClusterIP"
  }
}

resource "kubernetes_deployment" "nginx-frontend" {
  metadata {
    name = "nginx-frontend"
  }

  spec {
    replicas = 1

    selector {
      match_labels = {
        app = "nginx-frontend"
      }
    }

    template {
      metadata {
        labels = {
          app = "nginx-frontend"
        }
      }

      spec {
        container {
          image = "nginx:latest"
          name  = "nginx"

          port {
            container_port = 80
          }

          volume_mount {
            name       = "nginx-config"
            mount_path = "/etc/nginx/nginx.conf"
            sub_path   = "nginx.conf"
          }
        }

        volume {
          name = "nginx-config"
          config_map {
            name = "nginx-config"
          }
        }
      }
    }
  }
}

resource "kubernetes_service" "nginx-frontend" {
  metadata {
    name = "nginx-frontend"
  }

  spec {
    selector = {
      app = "nginx-frontend"
    }

    port {
      port        = 80
      target_port = 80
    }

    type = "LoadBalancer"
  }

  wait_for_load_balancer = false
}

resource "kubernetes_ingress_v1" "frontend" {
  metadata {
    name = "frontend"
    annotations = {
      "cert-manager.io/cluster-issuer" = "letsencrypt-prod"
    }
  }

  spec {
    tls {
      secret_name = "frontend-tls"
      hosts       = ["135.125.246.84.xip.opensteak.fr"]
    }

    rule {
      host = "135.125.246.84.xip.opensteak.fr"
      http {
        path {
          path = "/"
          backend {
            service {
              name = "nginx-frontend"
              port {
                number = 80
              }
            }
          }
        }
      }
    }
  }
}

output "demo-flask-url" {
  value = "http://${kubernetes_service.demo-flask.metadata[0].name}:8080"
}

output "nginx-url" {
  value = "https://135.125.246.84.xip.opensteak.fr/"
}
```

`provider.tf`
```tf
terraform {
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
  }
}

provider "kubernetes" {
  config_path = "/etc/rancher/k3s/k3s.yaml"
}
```


## 105
```py
import pulumi
import pulumi_kubernetes as k8s
import os

kubeconfig_path = "/etc/rancher/k3s/k3s.yaml"
kubeconfig = None

if os.path.exists(kubeconfig_path):
    with open(kubeconfig_path, "r") as f:
        kubeconfig = f.read()

k8s_provider = k8s.Provider("k3s", kubeconfig=kubeconfig)

opts = pulumi.ResourceOptions(provider=k8s_provider)

nginx_config_data = {
    "nginx.conf": """events {}

http {
  server {
    listen 80;
    location / {
      proxy_pass http://demo-flask:8080;
    }
  }
}
"""
}

nginx_config = k8s.core.v1.ConfigMap(
    "nginx-config",
    metadata=k8s.meta.v1.ObjectMetaArgs(
        name="nginx-config",
    ),
    data=nginx_config_data,
    opts=opts,
)

demo_flask_labels = {"app": "demo-flask"}
demo_flask_deployment = k8s.apps.v1.Deployment(
    "demo-flask",
    metadata=k8s.meta.v1.ObjectMetaArgs(
        name="demo-flask",
    ),
    spec=k8s.apps.v1.DeploymentSpecArgs(
        replicas=1,
        selector=k8s.meta.v1.LabelSelectorArgs(
            match_labels=demo_flask_labels,
        ),
        template=k8s.core.v1.PodTemplateSpecArgs(
            metadata=k8s.meta.v1.ObjectMetaArgs(
                labels=demo_flask_labels,
            ),
            spec=k8s.core.v1.PodSpecArgs(
                containers=[
                    k8s.core.v1.ContainerArgs(
                        name="demo-flask",
                        image="arnaudmorin/demo-flask:latest",
                        ports=[k8s.core.v1.ContainerPortArgs(container_port=8080)],
                    )
                ],
            ),
        ),
    ),
    opts=opts,
)

demo_flask_service = k8s.core.v1.Service(
    "demo-flask",
    metadata=k8s.meta.v1.ObjectMetaArgs(
        name="demo-flask",
    ),
    spec=k8s.core.v1.ServiceSpecArgs(
        selector=demo_flask_labels,
        ports=[
            k8s.core.v1.ServicePortArgs(
                port=8080,
                target_port=8080,
            )
        ],
        type="ClusterIP",
    ),
    opts=opts,
)

nginx_frontend_labels = {"app": "nginx-frontend"}
nginx_frontend_deployment = k8s.apps.v1.Deployment(
    "nginx-frontend",
    metadata=k8s.meta.v1.ObjectMetaArgs(
        name="nginx-frontend",
    ),
    spec=k8s.apps.v1.DeploymentSpecArgs(
        replicas=1,
        selector=k8s.meta.v1.LabelSelectorArgs(
            match_labels=nginx_frontend_labels,
        ),
        template=k8s.core.v1.PodTemplateSpecArgs(
            metadata=k8s.meta.v1.ObjectMetaArgs(
                labels=nginx_frontend_labels,
            ),
            spec=k8s.core.v1.PodSpecArgs(
                containers=[
                    k8s.core.v1.ContainerArgs(
                        name="nginx",
                        image="nginx:latest",
                        ports=[k8s.core.v1.ContainerPortArgs(container_port=80)],
                        volume_mounts=[
                            k8s.core.v1.VolumeMountArgs(
                                name="nginx-config",
                                mount_path="/etc/nginx/nginx.conf",
                                sub_path="nginx.conf",
                            )
                        ],
                    )
                ],
                volumes=[
                    k8s.core.v1.VolumeArgs(
                        name="nginx-config",
                        config_map=k8s.core.v1.ConfigMapVolumeSourceArgs(
                            name=nginx_config.metadata.name,
                        ),
                    )
                ],
            ),
        ),
    ),
    opts=opts,
)

nginx_frontend_service = k8s.core.v1.Service(
    "nginx-frontend",
    metadata=k8s.meta.v1.ObjectMetaArgs(
        name="nginx-frontend",
    ),
    spec=k8s.core.v1.ServiceSpecArgs(
        selector=nginx_frontend_labels,
        ports=[
            k8s.core.v1.ServicePortArgs(
                port=80,
                target_port=80,
            )
        ],
        type="LoadBalancer",
    ),
    opts=opts,
)

ingress_host = "135.125.246.84.xip.opensteak.fr"

frontend_ingress = k8s.networking.v1.Ingress(
    "frontend",
    metadata=k8s.meta.v1.ObjectMetaArgs(
        name="frontend",
        annotations={
            "cert-manager.io/cluster-issuer": "letsencrypt-prod",
        },
    ),
    spec=k8s.networking.v1.IngressSpecArgs(
        tls=[
            k8s.networking.v1.IngressTLSArgs(
                secret_name="frontend-tls",
                hosts=[ingress_host],
            )
        ],
        rules=[
            k8s.networking.v1.IngressRuleArgs(
                host=ingress_host,
                http=k8s.networking.v1.HTTPIngressRuleValueArgs(
                    paths=[
                        k8s.networking.v1.HTTPIngressPathArgs(
                            path="/",
                            path_type="Prefix",
                            backend=k8s.networking.v1.IngressBackendArgs(
                                service=k8s.networking.v1.IngressServiceBackendArgs(
                                    name=nginx_frontend_service.metadata.name,
                                    port=k8s.networking.v1.ServiceBackendPortArgs(
                                        number=80,
                                    ),
                                ),
                            ),
                        )
                    ],
                ),
            )
        ],
    ),
    opts=opts,
)

pulumi.export("demo-flask-url", demo_flask_service.metadata.apply(lambda m: f"http://{m.name}:8080"))
pulumi.export("nginx-uri", f"https://{ingress_host}/")
```
