#!/usr/bin/env bash
# =============================================================================
# Alhambra Hotel — Laravel Production Deployment Script
# =============================================================================
# Usage: bash deploy.sh [--rollback]
# Run from your VPS inside the Backend directory.
# =============================================================================

set -euo pipefail

# ─── Configuration ─────────────────────────────────────────────────────────
APP_DIR="/var/www/alhambra/Backend"
RELEASES_DIR="/var/www/alhambra/releases"
SHARED_DIR="/var/www/alhambra/shared"
KEEP_RELEASES=5
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
NEW_RELEASE="$RELEASES_DIR/$TIMESTAMP"
CURRENT_LINK="/var/www/alhambra/current"
LOG_FILE="/var/log/alhambra/deploy_$TIMESTAMP.log"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log() { echo -e "${BLUE}[$(date '+%H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"; }
success() { echo -e "${GREEN}✅ $1${NC}" | tee -a "$LOG_FILE"; }
warn() { echo -e "${YELLOW}⚠️  $1${NC}" | tee -a "$LOG_FILE"; }
error() { echo -e "${RED}❌ $1${NC}" | tee -a "$LOG_FILE"; exit 1; }

# ─── Rollback Mode ─────────────────────────────────────────────────────────
if [[ "${1:-}" == "--rollback" ]]; then
    log "🔄 ROLLBACK MODE ACTIVATED"
    PREVIOUS=$(ls -1d "$RELEASES_DIR"/*/ 2>/dev/null | sort | tail -n2 | head -n1)
    if [[ -z "$PREVIOUS" ]]; then
        error "No previous release to rollback to."
    fi
    ln -sfn "$PREVIOUS" "$CURRENT_LINK"
    success "Rolled back to: $PREVIOUS"
    # Restart queue workers
    php artisan queue:restart
    exit 0
fi

# ─── Pre-deployment Checks ──────────────────────────────────────────────────
log "🔍 Running pre-deployment checks..."

# Check PHP version
PHP_VERSION=$(php -r "echo PHP_VERSION;")
log "PHP Version: $PHP_VERSION"
if [[ ! "$PHP_VERSION" =~ ^8\.[3-9] ]]; then
    error "PHP 8.3+ required. Found: $PHP_VERSION"
fi

# Check .env exists
if [[ ! -f "$SHARED_DIR/.env" ]]; then
    error ".env not found at $SHARED_DIR/.env — aborting deployment"
fi

# Check disk space (require at least 500MB)
AVAILABLE=$(df "$APP_DIR" | awk 'NR==2 {print $4}')
if [[ "$AVAILABLE" -lt 512000 ]]; then
    warn "Low disk space: ${AVAILABLE}KB available. Proceeding with caution."
fi

success "Pre-deployment checks passed"

# ─── Create New Release Directory ───────────────────────────────────────────
log "📁 Creating release directory: $TIMESTAMP"
mkdir -p "$NEW_RELEASE"
mkdir -p "$SHARED_DIR/storage/logs"
mkdir -p "$SHARED_DIR/storage/app/public"
mkdir -p "/var/log/alhambra"

# ─── Maintenance Mode ────────────────────────────────────────────────────────
log "🔧 Enabling maintenance mode..."
if [[ -L "$CURRENT_LINK" ]]; then
    php "$CURRENT_LINK/artisan" down --render="errors::503" --retry=60 || true
fi

# ─── Copy & Link Files ───────────────────────────────────────────────────────
log "📂 Linking shared files..."
ln -sfn "$SHARED_DIR/.env" "$NEW_RELEASE/.env"
ln -sfn "$SHARED_DIR/storage" "$NEW_RELEASE/storage"

# ─── Composer Install ────────────────────────────────────────────────────────
log "📦 Installing Composer dependencies..."
cd "$NEW_RELEASE"
composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --prefer-dist \
    --quiet

success "Composer install complete"

# ─── Laravel Optimization ────────────────────────────────────────────────────
log "⚡ Running Laravel production optimizations..."

# Generate key only if not set in .env
grep -q "APP_KEY=base64:" .env || php artisan key:generate --force

# Cache everything for maximum performance
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache

success "Laravel caches compiled"

# ─── Database Migrations ─────────────────────────────────────────────────────
log "🗄️ Running database migrations..."
php artisan migrate --force --no-interaction
success "Migrations complete"

# ─── Storage Link ────────────────────────────────────────────────────────────
php artisan storage:link 2>/dev/null || true

# ─── Activate New Release ─────────────────────────────────────────────────────
log "🔗 Activating new release..."
ln -sfn "$NEW_RELEASE" "$CURRENT_LINK"
success "Release activated: $TIMESTAMP"

# ─── Disable Maintenance Mode ────────────────────────────────────────────────
log "🟢 Disabling maintenance mode..."
php artisan up

# ─── Queue & Workers ─────────────────────────────────────────────────────────
log "🔄 Restarting queue workers..."
php artisan queue:restart
success "Queue workers signaled to restart"

# ─── Cleanup Old Releases ────────────────────────────────────────────────────
log "🧹 Cleaning up old releases (keeping last $KEEP_RELEASES)..."
ls -1d "$RELEASES_DIR"/*/ 2>/dev/null | sort | head -n -$KEEP_RELEASES | xargs rm -rf --

# ─── Post-Deploy Health Check ────────────────────────────────────────────────
log "🏥 Running health check..."
sleep 3
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost/api/room-types" 2>/dev/null || echo "000")
if [[ "$HTTP_STATUS" == "200" ]]; then
    success "Health check PASSED — API responding correctly"
else
    warn "Health check returned HTTP $HTTP_STATUS — verify manually"
fi

# ─── Summary ─────────────────────────────────────────────────────────────────
echo ""
echo "═══════════════════════════════════════════════════════"
success "🎉 Alhambra Hotel Deployment Complete!"
log "   Release: $TIMESTAMP"
log "   Active:  $CURRENT_LINK → $NEW_RELEASE"
log "   Log:     $LOG_FILE"
echo "═══════════════════════════════════════════════════════"
