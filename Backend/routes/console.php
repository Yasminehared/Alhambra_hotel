<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\Log;

// ─────────────────────────────────────────────────────────────────────────────
// Alhambra Hotel — Laravel Task Scheduler
// ─────────────────────────────────────────────────────────────────────────────
// Install on VPS:
//   * * * * * cd /var/www/alhambra/current && php artisan schedule:run >> /dev/null 2>&1
// ─────────────────────────────────────────────────────────────────────────────

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// ─── Database Maintenance ─────────────────────────────────────────────────────

// Prune stale queue jobs (failed jobs older than 7 days)
Schedule::command('queue:prune-failed --hours=168')
    ->daily()
    ->onFailure(fn () => Log::channel('api-errors')->error('Scheduler: queue:prune-failed failed'));

// ─── Cache Maintenance ────────────────────────────────────────────────────────

// Warm/refresh config cache weekly (avoids stale cache in production)
Schedule::command('optimize')
    ->weeklyOn(0, '04:00')
    ->onSuccess(fn () => Log::info('Scheduler: optimize cache refreshed'))
    ->onFailure(fn () => Log::channel('api-errors')->error('Scheduler: optimize failed'));

// ─── Reservation Auto-Expiry ──────────────────────────────────────────────────

// Cancel pending reservations older than 24 hours (no payment received)
Schedule::call(function () {
    $expired = \App\Models\Reservation::where('status', 'pending')
        ->where('created_at', '<', now()->subHours(24))
        ->count();

    if ($expired > 0) {
        \App\Models\Reservation::where('status', 'pending')
            ->where('created_at', '<', now()->subHours(24))
            ->update(['status' => 'cancelled']);

        Log::info("Scheduler: Auto-cancelled {$expired} expired pending reservations");
    }
})
->hourly()
->name('auto-cancel-expired-reservations')
->withoutOverlapping();

// ─── Security Monitoring ──────────────────────────────────────────────────────

// Alert on unusual login failures (more than 50 failed attempts today)
Schedule::call(function () {
    $todayLog = storage_path('logs/security-' . now()->format('Y-m-d') . '.log');
    if (! file_exists($todayLog)) {
        return;
    }

    $content      = file_get_contents($todayLog);
    $failureCount = substr_count($content, 'Failed login attempt');

    if ($failureCount > 50) {
        Log::channel('security')->critical('⚠️ HIGH VOLUME login failure spike detected', [
            'count'     => $failureCount,
            'threshold' => 50,
            'period'    => 'today',
            'action'    => 'Review security.log and consider IP blocking',
        ]);
    }
})
->hourly()
->name('security-login-failure-monitor')
->withoutOverlapping();

// ─── Maintenance Ticket Auto-Escalation ───────────────────────────────────────

// Flag overdue maintenance tickets (pending/in-progress > 48 hours) as critical priority
Schedule::call(function () {
    $overdue = \App\Models\MaintenanceTicket::whereIn('status', ['pending', 'in_progress'])
        ->where('created_at', '<', now()->subHours(48))
        ->where('priority', '!=', 'critical')
        ->get();

    foreach ($overdue as $ticket) {
        $ticket->update(['priority' => 'critical']);
        Log::info("Scheduler: Maintenance ticket #{$ticket->id} auto-escalated to critical");
    }
})
->everyTwoHours()
->name('auto-escalate-maintenance-tickets')
->withoutOverlapping();
