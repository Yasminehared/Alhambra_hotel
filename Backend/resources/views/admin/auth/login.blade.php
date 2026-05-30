<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Staff Login — Alhambra Palace</title>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}">
</head>
<body>
<section class="admin-login">
    <div class="admin-login__card">
        <h1 class="admin-login__logo">✦ Alhambra ✦</h1>
        <p class="admin-login__sub">Staff Console</p>

        @if(session('error'))
            <div class="alert alert-error">{{ session('error') }}</div>
        @endif
        @if($errors->any())
            <div class="alert alert-error">{{ $errors->first() }}</div>
        @endif

        <form method="POST" action="{{ route('admin.login.submit') }}">
            @csrf
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" type="email" name="email" class="form-control" value="{{ old('email') }}" required autofocus
                       style="background:#0f0b07;color:#f8f4eb;border-color:rgba(212,175,95,0.3);">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input id="password" type="password" name="password" class="form-control" required
                       style="background:#0f0b07;color:#f8f4eb;border-color:rgba(212,175,95,0.3);">
            </div>
            <label style="display:flex;align-items:center;gap:0.5rem;color:#a89880;font-size:0.85rem;margin-bottom:1.25rem;">
                <input type="checkbox" name="remember"> Remember me
            </label>
            <button type="submit" class="btn btn-gold" style="width:100%;">Enter Dashboard</button>
        </form>

        <p style="margin-top:1.5rem;font-size:0.75rem;color:#6b5c48;text-align:center;line-height:1.6;">
            Demo: <strong style="color:#d4af7a;">admin@alhambra.com</strong> / password
        </p>
    </div>
</section>
</body>
</html>
