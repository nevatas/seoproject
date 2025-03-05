#!/bin/bash

# Проверка наличия аргумента
if [ -z "$1" ]; then
  echo "Использование: ./setup-nginx.sh имя-домена"
  exit 1
fi

DOMAIN=$1
SERVER_PATH="/var/www"

# Создание конфигурации Nginx
cat > nginx-$DOMAIN.conf << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    
    root $SERVER_PATH/$DOMAIN/public;
    index index.html;
    
    access_log $SERVER_PATH/$DOMAIN/logs/access.log;
    error_log $SERVER_PATH/$DOMAIN/logs/error.log;
    
    location / {
        try_files \$uri \$uri/ =404;
    }
    
    # Для общих ресурсов
    location /assets/ {
        alias $SERVER_PATH/assets/;
    }
}
EOF

echo "Конфигурация Nginx для домена $DOMAIN создана в файле nginx-$DOMAIN.conf"
echo "Скопируйте этот файл на сервер и выполните:"
echo "sudo cp nginx-$DOMAIN.conf /etc/nginx/sites-available/$DOMAIN"
echo "sudo ln -s /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/"
echo "sudo nginx -t"
echo "sudo systemctl restart nginx"
echo "sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN" 