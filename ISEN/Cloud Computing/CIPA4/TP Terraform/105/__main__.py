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
