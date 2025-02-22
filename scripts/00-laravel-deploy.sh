#!/usr/bin/env bash
echo "Running composer"
composer install --no-dev --working-dir=/var/www/html

echo "Intalling npm packages"
npm ci

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Building frontend"
npm run build

echo "Running migrations..."
php artisan migrate --force

echo "Seeding database"
php artisan db:seed --force
