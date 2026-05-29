#!/usr/bin/env bash
# =============================================================================
# Alhambra Hotel — Database Backup Script
# =============================================================================
# Schedule: Add to crontab — 0 2 * * * /var/www/alhambra/scripts/backup.sh
# =============================================================================

set -euo pipefail

# ─── Configuration ─────────────────────────────────────────────────────────
BACKUP_DIR="/var/backups/alhambra"
STORAGE_DIR="/var/www/alhambra/shared/storage"
APP_DIR="/var/www/alhambra/current"
KEEP_DAILY=14          # Keep 14 daily backups
KEEP_WEEKLY=8          # Keep 8 weekly backups
KEEP_MONTHLY=6         # Keep 6 monthly backups
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
DAY_OF_WEEK=$(date +%u)    # 1=Monday, 7=Sunday
DAY_OF_MONTH=$(date +%d)

# Load env variables (database credentials)
if [[ -f "/var/www/alhambra/shared/.env" ]]; then
    export $(grep -v '^#' /var/www/alhambra/shared/.env | grep -E '^(DB_|APP_)' | xargs)
fi

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

log() { echo -e "${BLUE}[$(date '+%H:%M:%S')]${NC} $1"; }
success() { echo -e "${GREEN}✅ $1${NC}"; }
error() { echo -e "${RED}❌ $1${NC}"; exit 1; }

# ─── Create Backup Directories ──────────────────────────────────────────────
mkdir -p "$BACKUP_DIR/database/daily"
mkdir -p "$BACKUP_DIR/database/weekly"
mkdir -p "$BACKUP_DIR/database/monthly"
mkdir -p "$BACKUP_DIR/storage"

# ─── Database Backup ─────────────────────────────────────────────────────────
log "🗄️ Starting database backup..."

DB_BACKUP_FILE="$BACKUP_DIR/database/daily/alhambra_db_$TIMESTAMP.sql.gz"

if [[ "${DB_CONNECTION:-sqlite}" == "mysql" ]]; then
    # MySQL backup
    mysqldump \
        --host="${DB_HOST:-127.0.0.1}" \
        --port="${DB_PORT:-3306}" \
        --user="${DB_USERNAME}" \
        --password="${DB_PASSWORD}" \
        --single-transaction \
        --quick \
        --lock-tables=false \
        --set-gtid-purged=OFF \
        "${DB_DATABASE}" | gzip > "$DB_BACKUP_FILE"
elif [[ "${DB_CONNECTION:-sqlite}" == "pgsql" ]]; then
    # PostgreSQL backup
    PGPASSWORD="${DB_PASSWORD}" pg_dump \
        --host="${DB_HOST:-127.0.0.1}" \
        --port="${DB_PORT:-5432}" \
        --username="${DB_USERNAME}" \
        --no-password \
        --format=custom \
        "${DB_DATABASE}" | gzip > "$DB_BACKUP_FILE"
else
    # SQLite backup
    DB_PATH="${DB_DATABASE:-/var/www/alhambra/shared/database/database.sqlite}"
    cp "$DB_PATH" "$BACKUP_DIR/database/daily/alhambra_sqlite_$TIMESTAMP.db"
    gzip "$BACKUP_DIR/database/daily/alhambra_sqlite_$TIMESTAMP.db"
    DB_BACKUP_FILE="$BACKUP_DIR/database/daily/alhambra_sqlite_$TIMESTAMP.db.gz"
fi

BACKUP_SIZE=$(du -sh "$DB_BACKUP_FILE" | cut -f1)
success "Database backup complete: $DB_BACKUP_FILE ($BACKUP_SIZE)"

# ─── Weekly & Monthly Copies ─────────────────────────────────────────────────
if [[ "$DAY_OF_WEEK" == "7" ]]; then
    log "📅 Creating weekly backup copy..."
    cp "$DB_BACKUP_FILE" "$BACKUP_DIR/database/weekly/alhambra_weekly_$TIMESTAMP.sql.gz"
    success "Weekly backup created"
fi

if [[ "$DAY_OF_MONTH" == "01" ]]; then
    log "📅 Creating monthly backup copy..."
    cp "$DB_BACKUP_FILE" "$BACKUP_DIR/database/monthly/alhambra_monthly_$TIMESTAMP.sql.gz"
    success "Monthly backup created"
fi

# ─── Storage/Media Backup ────────────────────────────────────────────────────
log "📁 Backing up storage/media files..."

STORAGE_BACKUP_FILE="$BACKUP_DIR/storage/alhambra_storage_$TIMESTAMP.tar.gz"
tar -czf "$STORAGE_BACKUP_FILE" \
    --exclude="$STORAGE_DIR/logs" \
    --exclude="$STORAGE_DIR/framework/cache" \
    --exclude="$STORAGE_DIR/framework/sessions" \
    "$STORAGE_DIR" 2>/dev/null || true

STORAGE_SIZE=$(du -sh "$STORAGE_BACKUP_FILE" 2>/dev/null | cut -f1 || echo "N/A")
success "Storage backup: $STORAGE_BACKUP_FILE ($STORAGE_SIZE)"

# ─── Cleanup Old Backups ─────────────────────────────────────────────────────
log "🧹 Cleaning up old backups..."

# Remove daily backups older than KEEP_DAILY days
find "$BACKUP_DIR/database/daily" -name "*.gz" -mtime +$KEEP_DAILY -delete
find "$BACKUP_DIR/storage" -name "*.tar.gz" -mtime +$KEEP_DAILY -delete

# Remove weekly backups older than KEEP_WEEKLY weeks
find "$BACKUP_DIR/database/weekly" -name "*.gz" -mtime +$((KEEP_WEEKLY * 7)) -delete

# Remove monthly backups older than KEEP_MONTHLY months
find "$BACKUP_DIR/database/monthly" -name "*.gz" -mtime +$((KEEP_MONTHLY * 30)) -delete

success "Cleanup complete"

# ─── Offsite Backup (Optional: S3 or Rsync) ──────────────────────────────────
# Uncomment and configure for S3 offsite backup:
# log "☁️ Uploading to S3..."
# aws s3 cp "$DB_BACKUP_FILE" "s3://your-bucket/alhambra/db/$(basename $DB_BACKUP_FILE)"
# aws s3 cp "$STORAGE_BACKUP_FILE" "s3://your-bucket/alhambra/storage/$(basename $STORAGE_BACKUP_FILE)"
# success "Offsite backup complete"

# ─── Backup Integrity Verification ───────────────────────────────────────────
log "🔍 Verifying backup integrity..."
if gzip -t "$DB_BACKUP_FILE" 2>/dev/null; then
    success "Database backup integrity: OK"
else
    error "Database backup is CORRUPTED: $DB_BACKUP_FILE"
fi

# ─── Summary Report ──────────────────────────────────────────────────────────
TOTAL_BACKUP_SIZE=$(du -sh "$BACKUP_DIR" | cut -f1)

echo ""
echo "═══════════════════════════════════════════════"
success "🎉 Alhambra Hotel Backup Complete!"
log "  Timestamp:      $TIMESTAMP"
log "  DB Backup:      $DB_BACKUP_FILE ($BACKUP_SIZE)"
log "  Storage Backup: $STORAGE_BACKUP_FILE ($STORAGE_SIZE)"
log "  Total Size:     $TOTAL_BACKUP_SIZE"
echo "═══════════════════════════════════════════════"
