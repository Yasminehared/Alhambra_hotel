<!DOCTYPE html>
<html lang="en" data-theme="gold">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Dashboard') — Alhambra Admin</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}">
</head>
<body class="admin-body">
<div class="admin-shell">
    <aside class="admin-sidebar">
        <div class="admin-sidebar__brand">✦ Alhambra</div>
        <nav class="admin-sidebar__nav">
            @if(auth()->user()->hasRole('admin', 'receptionist'))
                <a href="{{ route('admin.dashboard') }}" class="admin-sidebar__link {{ request()->routeIs('admin.dashboard') ? 'active' : '' }}">⌂ Dashboard</a>
                <a href="{{ route('admin.reservations.index') }}" class="admin-sidebar__link {{ request()->routeIs('admin.reservations.*') ? 'active' : '' }}">📋 Reservations</a>
                <a href="{{ route('admin.payments.index') }}" class="admin-sidebar__link {{ request()->routeIs('admin.payments.*') ? 'active' : '' }}">💳 Payments</a>
            @endif
            @if(auth()->user()->hasRole('admin', 'receptionist', 'housekeeping'))
                <a href="{{ route('admin.rooms.index') }}" class="admin-sidebar__link {{ request()->routeIs('admin.rooms.*') ? 'active' : '' }}">🛏 Rooms</a>
            @endif
            @if(auth()->user()->hasRole('admin', 'housekeeping'))
                <a href="{{ route('admin.maintenance.index') }}" class="admin-sidebar__link {{ request()->routeIs('admin.maintenance.*') ? 'active' : '' }}">🔧 Maintenance</a>
            @endif
            @if(auth()->user()->hasRole('admin'))
                <a href="{{ route('admin.users.index') }}" class="admin-sidebar__link {{ request()->routeIs('admin.users.*') ? 'active' : '' }}">👤 Staff Users</a>
            @endif
            <a href="http://localhost:3000" target="_blank" class="admin-sidebar__link">🌐 Public Website</a>
        </nav>
        <div class="admin-sidebar__footer">
            {{ auth()->user()->name }}<br>
            <small>{{ auth()->user()->role?->label() }}</small>
        </div>
    </aside>

    <div class="admin-main">
        <header class="admin-topbar">
            <h1 class="admin-topbar__title">@yield('page-title', 'Dashboard')</h1>
            <div class="admin-topbar__actions">
                <div class="theme-toggle" role="group" aria-label="Theme">
                    <button type="button" data-set-theme="gold" class="active">Gold</button>
                    <button type="button" data-set-theme="dark">Dark</button>
                </div>
                <form method="POST" action="{{ route('admin.logout') }}">
                    @csrf
                    <button type="submit" class="btn btn-ghost btn-sm">Sign out</button>
                </form>
            </div>
        </header>

        <main class="admin-content">
            @if(session('success'))
                <div class="alert alert-success">{{ session('success') }}</div>
            @endif
            @if(session('error'))
                <div class="alert alert-error">{{ session('error') }}</div>
            @endif
            @yield('content')
        </main>
    </div>
</div>
<script>
(function () {
    const key = 'alhambra-admin-theme';
    const root = document.documentElement;
    const saved = localStorage.getItem(key) || 'gold';
    root.setAttribute('data-theme', saved);
    document.querySelectorAll('[data-set-theme]').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.setTheme === saved);
        btn.addEventListener('click', () => {
            const t = btn.dataset.setTheme;
            root.setAttribute('data-theme', t);
            localStorage.setItem(key, t);
            document.querySelectorAll('[data-set-theme]').forEach(b =>
                b.classList.toggle('active', b.dataset.setTheme === t)
            );
        });
    });
})();
</script>
@stack('scripts')
</body>
</html>
