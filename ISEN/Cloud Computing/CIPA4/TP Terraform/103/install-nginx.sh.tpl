#!/bin/bash
apt-get update
apt-get install -y nginx python3-certbot-nginx certbot
cat <<EOF > /etc/nginx/sites-enabled/default
server {
 listen 80;
 server_name ${frontend}.xip.opensteak.fr;
 listen [::]:80;
 access_log /var/log/nginx/reverse-access.log;
 error_log /var/log/nginx/reverse-error.log;
 location / { proxy_pass http://${backend}:8080; }
}
EOF

systemctl restart nginx

# certbot
certbot run --agree-tos --register-unsafely-without-email --non-interactive --nginx --redirect --domain ${frontend}.xip.opensteak.fr