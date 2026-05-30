#!/bin/sh
set -e

cd /var/www/html

if [ ! -f .env ] && [ -f .env.docker ]; then
  cp .env.docker .env
elif [ ! -f .env ]; then
  cp .env.example .env 2>/dev/null || true
fi

echo "Waiting for MySQL..."
until php -r "
  try {
    new PDO(
      'mysql:host=' . getenv('DB_HOST') . ';port=' . (getenv('DB_PORT') ?: '3306'),
      getenv('DB_USERNAME'),
      getenv('DB_PASSWORD')
    );
    exit(0);
  } catch (Throwable \$e) {
    exit(1);
  }
" 2>/dev/null; do
  sleep 2
done
echo "MySQL is ready."

if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "" ]; then
  php artisan key:generate --force --no-interaction
fi

php artisan migrate --force --no-interaction

if [ "${ALHAMBRA_SEED:-true}" = "true" ]; then
  php artisan db:seed --force --no-interaction 2>/dev/null || true
fi

php artisan view:clear --no-interaction 2>/dev/null || true
php artisan config:cache --no-interaction
php artisan route:cache --no-interaction
# Skip view:cache — leftover blades or admin views change often; on-demand compile is fine
php artisan event:cache --no-interaction 2>/dev/null || true

exec "$@"
