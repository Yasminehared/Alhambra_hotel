# Alhambra — Laravel Admin Dashboard (No Filament)

## Access the dashboard

1. Start the backend:
   ```bash
   cd Backend
   php artisan serve --port=8001
   ```

2. Open in your browser:
   **http://localhost:8001/admin/login**

3. Sign in with a **staff** account (not guest/customer).

## Default staff accounts (after `php artisan db:seed`)

| Role | Email | Password |
|------|--------|----------|
| **Administrator** | `admin@alhambra.com` | `password` |
| **Receptionist** | `receptionist@alhambra.com` | `password` |
| **Housekeeping** | `housekeeping@alhambra.com` | `password` |

## What each role sees

| Section | Admin | Receptionist | Housekeeping |
|---------|-------|--------------|--------------|
| Dashboard overview | ✓ | ✓ | → redirected to Maintenance |
| Reservations | ✓ | ✓ | — |
| Payments | ✓ | ✓ | — |
| Rooms | ✓ | ✓ | ✓ |
| Maintenance | ✓ | — | ✓ |
| Staff users | ✓ | — | — |

## Themes

Use the **Gold** / **Dark** toggle in the top bar. Your choice is saved in the browser (`localStorage`).

## Public website (React)

The guest site still runs separately:

```bash
cd Frontend
npm install
npm start
```

→ http://localhost:3000

Staff can also use the React admin at `/log-in` with the **same emails/passwords** (session API). The new Laravel dashboard at `/admin` is the recommended staff console.

## Docker (recommended — less lag on Windows)

Use the Docker stack instead of `npm start` + `php artisan serve`:

```powershell
cd ..   # project root (Alhambra_hotel-main)
.\docker-up.ps1
```

→ http://localhost:8080/admin/login  

See **DOCKER.md** for full instructions.

## First-time setup (without Docker)

```bash
cd Backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve --port=8001
```

## Filament

Filament is **disabled** (removed from `bootstrap/providers.php`). All hotel operations are handled by this Laravel admin + the existing JSON API for the React frontend.
