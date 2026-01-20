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