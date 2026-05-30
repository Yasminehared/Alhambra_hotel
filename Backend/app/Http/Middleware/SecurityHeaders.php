<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * SecurityHeaders Middleware
 *
 * Applies production-grade HTTP security headers to all responses.
 * Protects against XSS, clickjacking, MIME sniffing, and other common attacks.
 */
class SecurityHeaders
{
    /**
     * Security header configuration.
     *
     * Adjust CSP and other policies to match your specific domain and CDN setup.
     */
    private array $headers = [];

    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // ─── Content Security Policy ──────────────────────────────────────
        // Customize sources based on your CDN, fonts, and external services
        $csp = implode('; ', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.bunny.net",
    "font-src 'self' https://fonts.gstatic.com https://fonts.bunny.net data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' http://127.0.0.1:8000 http://localhost:8000",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
]);

        // ─── Apply Security Headers ───────────────────────────────────────
        $response->headers->set('Content-Security-Policy', $csp);

        // Prevent clickjacking — allow only same origin iframes
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');

        // Stop MIME sniffing
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        // Enable XSS filter in older browsers (belt-and-suspenders)
        $response->headers->set('X-XSS-Protection', '1; mode=block');

        // Force HTTPS for 1 year, include subdomains
        if ($request->secure() || app()->environment('production')) {
            $response->headers->set(
                'Strict-Transport-Security',
                'max-age=31536000; includeSubDomains; preload'
            );
        }

        // Control referrer information
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        // Restrict browser features
        $response->headers->set('Permissions-Policy', implode(', ', [
            'camera=()',
            'microphone=()',
            'geolocation=()',
            'payment=(self)',
            'usb=()',
        ]));

        // Prevent server version disclosure
        $response->headers->remove('X-Powered-By');
        $response->headers->remove('Server');

        // Cache control for API responses (prevent sensitive data caching)
        if ($request->is('api/*')) {
            $response->headers->set('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
            $response->headers->set('Pragma', 'no-cache');
        }

        return $response;
    }
}
