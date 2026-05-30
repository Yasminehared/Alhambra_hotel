@extends('admin.layouts.app')

@section('title', 'Staff Users')
@section('page-title', 'Staff Users')

@section('content')
<div class="card">
    <div class="card__header">
        <h2 class="card__title">Hotel Staff Accounts</h2>
    </div>
    <div class="table-wrap">
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                </tr>
            </thead>
            <tbody>
                @foreach($users as $user)
                    <tr>
                        <td>{{ $user->name }}</td>
                        <td>{{ $user->email }}</td>
                        <td>{{ $user->role?->label() }}</td>
                        <td>{{ $user->created_at?->format('d M Y') }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
    <div class="pagination">{{ $users->links() }}</div>
</div>

<div class="card" style="margin-top:1.5rem;padding:1.5rem;">
    <h3 class="card__title" style="margin-bottom:1rem;">Default login credentials (after seed)</h3>
    <table class="admin-table">
        <tr><th>Role</th><th>Email</th><th>Password</th></tr>
        <tr><td>Administrator</td><td>admin@alhambra.com</td><td>password</td></tr>
        <tr><td>Receptionist</td><td>receptionist@alhambra.com</td><td>password</td></tr>
        <tr><td>Housekeeping</td><td>housekeeping@alhambra.com</td><td>password</td></tr>
    </table>
</div>
@endsection
