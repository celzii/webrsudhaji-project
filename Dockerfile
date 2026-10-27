
FROM php:8.3-apache

# 1. Install system libraries and PHP dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    curl \
    pkg-config \
    libpq-dev \
    libicu-dev \
    libzip-dev \
    libxml2-dev \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j"$(nproc)" \
       pdo_pgsql \
       mbstring \
       bcmath \
       exif \
       pcntl \
       intl \
       gd \
       zip \
       opcache \
    && a2enmod rewrite \
    && rm -rf /var/lib/apt/lists/*

# 2. Install Node.js and npm
COPY --from=node:22-bookworm-slim /usr/local/bin/node /usr/local/bin/node
COPY --from=node:22-bookworm-slim /usr/local/lib/node_modules /usr/local/lib/node_modules

RUN ln -sf /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm \
    && ln -sf /usr/local/lib/node_modules/npm/bin/npx-cli.js /usr/local/bin/npx

# 3. Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# 4. Set project directory
WORKDIR /var/www/html

# 5. Copy application source
COPY . .

# 6. Install Laravel dependencies
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction

# 7. Build React/Vite assets
RUN npm ci \
    && npm run build \
    && test -f public/build/manifest.json

# 8. Configure Apache to serve Laravel public directory on port 8000
RUN sed -i 's#DocumentRoot /var/www/html#DocumentRoot /var/www/html/public#' \
    /etc/apache2/sites-available/000-default.conf \
    && sed -i 's/AllowOverride None/AllowOverride All/g' \
    /etc/apache2/apache2.conf \
    && sed -i 's/Listen 80/Listen 8000/' /etc/apache2/ports.conf \
    && sed -i 's/<VirtualHost \*:80>/<VirtualHost *:8000>/' \
    /etc/apache2/sites-available/000-default.conf

# 9. Set permissions for Laravel writable directories
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R ug+rwX storage bootstrap/cache

# 10. Expose application port
EXPOSE 8000

CMD ["apache2-foreground"]
