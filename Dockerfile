FROM richarvey/nginx-php-fpm:3.1.6

RUN apk add --no-cache nodejs npm

COPY . . 

# Image config
ENV SKIP_COMPOSER 1
ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1

# Laravel config
ENV APP_ENV production
ENV APP_DEBUG false
ENV LOG_CHANNEL stderr

# Allow composer to run as root
ENV COMPOSER_ALLOW_SUPERUSER 1

# Expose port 80 for Nginx
EXPOSE 80

# Ensure the Nginx service is running and set up the necessary environment for PHP-FPM
CMD ["/start.sh"]
