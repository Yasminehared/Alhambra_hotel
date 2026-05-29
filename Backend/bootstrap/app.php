<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        // Session-based API authentication (Sanctum stateful)
        $middleware->statefulApi();

        // Ensure blocked users lose access immediately
        $middleware->appendToGroup('api', \App\Http\Middleware\EnsureUserNotBlocked::class);

        // Append Security Headers to ALL responses
$middleware->api(append: [
    \App\Http\Middleware\EnsureUserNotBlocked::class,
]);    })
    ->withExceptions(function (Exceptions $exceptions): void {

        // ─── 404 Not Found ────────────────────────────────────────────────
        $exceptions->render(function (NotFoundHttpException $e, Request $request) {
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Resource not found.',
                    'code'    => 404,
                ], 404);
            }
        });

        // ─── 405 Method Not Allowed ───────────────────────────────────────
        $exceptions->render(function (MethodNotAllowedHttpException $e, Request $request) {
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'HTTP method not allowed.',
                    'code'    => 405,
                ], 405);
            }
        });

        // ─── 401 Unauthenticated ──────────────────────────────────────────
        $exceptions->render(function (AuthenticationException $e, Request $request) {
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthenticated. Please log in.',
                    'code'    => 401,
                ], 401);
            }
        });

        // ─── 422 Validation Errors ────────────────────────────────────────
        $exceptions->render(function (ValidationException $e, Request $request) {
            if ($request->expectsJson() || $request->is('api/*')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed.',
                    'errors'  => $e->errors(),
                    'code'    => 422,
                ], 422);
            }
        });

        // ─── Production: Sanitize 500 Errors ─────────────────────────────
        $exceptions->render(function (\Throwable $e, Request $request) {
            if ($request->expectsJson() || $request->is('api/*')) {
                // Only expose error details in non-production environments
                if (app()->environment('production')) {
                    // Log the full exception for internal tracking
                    Log::error('Unhandled API exception', [
                        'exception' => get_class($e),
                        'message'   => $e->getMessage(),
                        'file'      => $e->getFile(),
                        'line'      => $e->getLine(),
                        'url'       => $request->fullUrl(),
                        'method'    => $request->method(),
                        'user_id'   => $request->user()?->id,
                        'ip'        => $request->ip(),
                    ]);

                    return response()->json([
                        'success' => false,
                        'message' => 'An internal server error occurred. Our team has been notified.',
                        'code'    => 500,
                    ], 500);
                }

                // In non-production, show full error details
                return response()->json([
                    'success'   => false,
                    'message'   => $e->getMessage(),
                    'exception' => get_class($e),
                    'file'      => $e->getFile(),
                    'line'      => $e->getLine(),
                    'code'      => 500,
                ], 500);
            }
        });

    })->create();
