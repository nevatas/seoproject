#!/bin/bash

# Проверка наличия аргумента
if [ -z "$1" ]; then
  echo "Использование: ./setup-domain.sh имя-домена"
  exit 1
fi

DOMAIN=$1

# Создание структуры директорий
mkdir -p $DOMAIN/public/{css,js}

# Копирование базовых файлов из evelone.ru
cp evelone.ru/public/css/input.css $DOMAIN/public/css/
cp evelone.ru/public/css/common.css $DOMAIN/public/css/
cp evelone.ru/public/css/desktop.css $DOMAIN/public/css/
cp evelone.ru/public/js/main.js $DOMAIN/public/js/

# Создание базового index.html
cat > $DOMAIN/public/index.html << EOF
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$DOMAIN</title>
    
    <!-- Подключение стилей -->
    <link rel="stylesheet" href="css/output.css">
    <link rel="stylesheet" href="css/common.css">
    <link rel="stylesheet" href="css/desktop.css">
    
    <!-- Подключение Alpine.js -->
    <script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
</head>
<body class="bg-[#18162C] text-white font-inter">
    <main>
        <h1>Новый сайт для домена $DOMAIN</h1>
    </main>
    
    <script src="js/main.js"></script>
</body>
</html>
EOF

# Обновление package.json
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Добавление новых скриптов
pkg.scripts[\`build:${DOMAIN.replace(/\./g, '-')}\`] = \`tailwindcss -i ./${DOMAIN}/public/css/input.css -o ./${DOMAIN}/public/css/output.css\`;
pkg.scripts[\`watch:${DOMAIN.replace(/\./g, '-')}\`] = \`tailwindcss -i ./${DOMAIN}/public/css/input.css -o ./${DOMAIN}/public/css/output.css --watch\`;
pkg.scripts[\`deploy:${DOMAIN.replace(/\./g, '-')}\`] = \`rsync -avz --exclude 'node_modules' --exclude '.git' ./${DOMAIN}/public/ username@ваш-сервер:/var/www/${DOMAIN}/public/\`;

// Обновление скрипта build:all
pkg.scripts['build:all'] += \` && npm run build:${DOMAIN.replace(/\./g, '-')}\`;

fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
"

echo "Структура для домена $DOMAIN создана."
echo "Не забудьте настроить Nginx и получить SSL-сертификат для нового домена."
echo "Для сборки CSS выполните: npm run build:${DOMAIN//./-}" 