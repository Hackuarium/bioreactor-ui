

## Install a MQTT broker

The server is installed on `mqtt.beemos.org`. A dedicated virtual linux computer.

The problem is that in order to access a MQTT broker from the browser you will need to run it over websocket. Moreover you will also need to have it running in hTTPS (well WSS).

The server is running CentOS 8.1. 

## Image with websocket

We originally used: 

docker run -ti -p 1883:1883 -p 9001:9001  toke/mosquitto



However this image is suggested

https://hub.docker.com/_/eclipse-mosquitto/


## Install the server

Install apache 

`dnf install httpd  mod_ssl openssl certbot`

Install our ssh preferences

`vi /etc/httpd/conf.d/0-ssh.conf`

```
<Macro SSLConf3 $hostname>
        SSLEngine       On
        SSLCertificateFile      /etc/letsencrypt/live/$hostname/cert.pem
        SSLCertificateKeyFile   /etc/letsencrypt/live/$hostname/privkey.pem
        SSLCACertificateFile    /etc/letsencrypt/live/$hostname/chain.pem


SSLProtocol             all -SSLv3 -TLSv1 -TLSv1.1
SSLCipherSuite          ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305
:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384
SSLHonorCipherOrder     off

        <Files ~ "\.(cgi|shtml|phtml|php?)$">
                SSLOptions +StdEnvVars
        </Files>
</Macro>
```

`certbot certonly --webroot -w /var/www/html -d mqtt.beemos.org`

## Install docker

`vi /usr/local/docker/mosquitto/docker-compose.yml`

```
version: '2.2'
services:
  mosquitto:
    image: eclipse-mosquitto
    restart: always
    ports:
      - 1883:1883
      - 127.0.0.1:9001:9001
    volumes:
      - ./config:/mosquitto/config
```

`vi /usr/local/docker/mosquitto/config/mosquitto.conf`

```
allow_anonymous true

listener 1883


listener 9001
protocol websockets
```



## Interesting resource ?

http://www.steves-internet-guide.com/using-javascript-mqtt-client-websockets/
