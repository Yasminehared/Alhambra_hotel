<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureRole
{
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (!$request->user()?->hasRole(...$roles)) {
            abort(403, 'You do not have permission to access this section.');
        }

        return $next($request);
    }
}
