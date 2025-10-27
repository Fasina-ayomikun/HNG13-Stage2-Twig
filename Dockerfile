# Dockerfile
FROM php:8.2-cli

RUN apt-get update && apt-get install -y git unzip \
  && rm -rf /var/lib/apt/lists/*
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --prefer-dist --no-progress --no-interaction \
 && composer dump-autoload -o

COPY . .

# Railway provides $PORT at runtime
ENV PORT=8080
CMD php -S 0.0.0.0:${PORT} -t public public/router.php