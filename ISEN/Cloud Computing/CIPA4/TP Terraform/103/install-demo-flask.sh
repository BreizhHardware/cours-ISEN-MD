#!/bin/bash
apt-get update
apt-get -y install python3-pip git python3-venv
git clone https://github.com/arnaudmorin/demo-flask /opt/demo-flask
python3 -m venv /opt/demo-flask-venv
/opt/demo-flask-venv/bin/pip install -r /opt/demo-flask/requirements.txt
sed -i -r 's|^python3|/opt/demo-flask-venv/bin/python|' /opt/demo-flask/start.sh
cp /opt/demo-flask/demo-flask.service /etc/systemd/system/
systemctl enable demo-flask.service
systemctl daemon-reload
systemctl start demo-flask.service