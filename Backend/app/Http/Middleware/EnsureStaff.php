<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureStaff
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user || !$user->isStaff()) {
            return redirect()->route('admin.login')
                ->with('error', 'Please sign in with a staff account.');
        }

        return $next($request);
    }
}
