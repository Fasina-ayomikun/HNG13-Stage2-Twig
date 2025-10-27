# Apache + PHP 8.2
FROM php:8.2-apache

# Set Apache DocumentRoot to /var/www/html/public
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf

# Enable useful Apache modules
RUN a2enmod rewrite headers

# Install system deps & Composer
RUN apt-get update && apt-get install -y git unzip \
    && rm -rf /var/lib/apt/lists/*
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy app
WORKDIR /var/www/html
COPY . /var/www/html

# Install PHP deps (Twig) with optimized autoloader
RUN composer install --no-dev --optimize-autoloader

# Permissions (optional, helpful on some hosts)
RUN chown -R www-data:www-data /var/www/html