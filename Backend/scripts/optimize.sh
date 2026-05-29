#!/usr/bin/env bash
# =============================================================================
# Alhambra Hotel — Laravel Production Optimization Runner
# =============================================================================
# Run this once after initial VPS setup or after environment changes.
# =============================================================================

set -euo pipefail

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

log()     { echo -e "${BLUE}[$(date '+%H:%M:%S')]${NC} $1"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }
info()    { echo -e "${YELLOW}ℹ️  $1${NC}"; }

cd "$(dirname "$0")/.." || exit 1

echo "╔══════════════════════════════════════════╗"
echo "║  Alhambra Hotel — Laravel Optimization   ║"
echo "╚══════════════════════════════════════════╝"
echo ""

# ─── Verify Production Environment ──────────────────────────────────────────
APP_ENV=$(php artisan env 2>/dev/null | awk '{print $NF}' || echo "unknown")
log "Environment: $APP_ENV"

if [[ "$APP_ENV" != "production" ]]; then
    info "Note: Running in $APP_ENV mode. Some optimizations are production-only."
fi

# ─── Step 1: Clear All Stale Caches ─────────────────────────────────────────
log "🧹 Clearing stale caches..."
php artisan config:clear
php artisan route:clear
php artisan view:clear
php artisan event:clear
php artisan cache:clear
success "All caches cleared"

# ─── Step 2: Optimize Composer Autoloader ───────────────────────────────────
log "📦 Optimizing Composer autoloader..."
composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --prefer-dist \
    --quiet
success "Composer autoloader optimized"

# ─── Step 3: Build Production Caches ────────────────────────────────────────
log "⚡ Building production caches..."

php artisan config:cache
success "Config cache compiled → bootstrap/cache/config.php"

php artisan route:cache
success "Route cache compiled → bootstrap/cache/routes-v7.php"

php artisan view:cache
success "View cache compiled → storage/framework/views/"

php artisan event:cache
success "Event/listener cache compiled → bootstrap/cache/events.php"

# ─── Step 4: Optimize Filament ───────────────────────────────────────────────
log "🎨 Optimizing Filament admin panel..."
php artisan filament:optimize 2>/dev/null || php artisan filament:upgrade || true
success "Filament optimized"

# ─── Step 5: Storage Link ────────────────────────────────────────────────────
log "🔗 Ensuring storage symlink..."
php artisan storage:link 2>/dev/null || true
success "Storage symlink ready"

# ─── Step 6: OPcache Verification ────────────────────────────────────────────
log "🔍 Checking OPcache..."
PHP_OPCACHE=$(php -r "echo ini_get('opcache.enable') ? 'enabled' : 'disabled';")
if [[ "$PHP_OPCACHE" == "enabled" ]]; then
    success "OPcache: enabled"
else
    info "OPcache: disabled — recommend enabling in php.ini for production"
fi

# ─── Step 7: Queue Worker Configuration ─────────────────────────────────────
echo ""
echo "─────────────────────────────────────────────"
info "Queue Worker Setup Instructions:"
echo ""
echo "  Create /etc/supervisor/conf.d/alhambra-worker.conf:"
echo ""
cat << 'SUPERVISOR'
[program:alhambra-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/alhambra/current/artisan queue:work database \
    --sleep=3 \
    --tries=3 \
    --max-time=3600 \
    --timeout=90
directory=/var/www/alhambra/current
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/log/alhambra/worker.log
stopwaitsecs=3600
SUPERVISOR
echo ""

# ─── Step 8: Scheduler Crontab ──────────────────────────────────────────────
info "Laravel Scheduler — add to crontab (crontab -e):"
echo ""
echo "  * * * * * cd /var/www/alhambra/current && php artisan schedule:run >> /dev/null 2>&1"
echo ""

# ─── Step 9: Summary ─────────────────────────────────────────────────────────
echo "═══════════════════════════════════════════════"
success "🎉 Laravel production optimization complete!"
echo ""
log "Cache Files Created:"
ls -lh bootstrap/cache/*.php 2>/dev/null | awk '{print "  " $NF " → " $5}' || true
echo "═══════════════════════════════════════════════"
