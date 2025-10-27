# Apache + PHP 8.2
FROM php:8.2-apache

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf
RUN a2enmod rewrite headers

# System deps + Composer
RUN apt-get update && apt-get install -y git unzip \
    && rm -rf /var/lib/apt/lists/*
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# 1) Copy only composer files first (cacheable layer)
COPY composer.json composer.lock ./

# 2) Install PHP deps (no dev, optimized)
RUN composer install --no-dev --prefer-dist --no-progress --no-interaction \
 && composer dump-autoload -o

# 3) Now copy the rest of your app
COPY . .

# Permissions (optional)
RUN chown -R www-data:www-data /var/www/html