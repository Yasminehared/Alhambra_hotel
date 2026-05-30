# Docker setup (fast, low lag)

This stack avoids slow Windows `npm start` and `php artisan serve` by running:

- **Nginx** serving a **production React build** (not webpack dev server)
- **PHP-FPM + Nginx** for Laravel (not single-threaded `artisan serve`)
- **MySQL** + **Redis** for database, sessions, and cache
- One URL: **http://localhost:8080**

## Requirements

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) with **WSL2** enabled (Windows)
- 4 GB+ RAM for Docker

## Quick start

```powershell
cd Alhambra_hotel-main

# Copy env file (once) — APP_KEY is generated automatically on first start
copy docker\alhambra.env.example .env.docker

# First time (build images — 5–15 min)
docker compose up --build -d

# Watch logs
docker compose logs -f gateway backend
```

Open:

| What | URL |
|------|-----|
| **Website (React)** | http://localhost:8080 |
| **Admin dashboard** | http://localhost:8080/admin/login |
| **API** | http://localhost:8080/api/... |

### Staff login (after seed)

| Email | Password |
|-------|----------|
| admin@alhambra.com | password |
| receptionist@alhambra.com | password |
| housekeeping@alhambra.com | password |

## Stop

```powershell
docker compose down
```

Data is kept in Docker volumes (`mysql_data`, etc.). To reset everything:

```powershell
docker compose down -v
docker compose up --build -d
```

## After code changes

Rebuild only what changed:

```powershell
# Frontend or backend code changed
docker compose up --build -d

# Backend only
docker compose up --build -d backend

# Frontend only
docker compose up --build -d frontend
```

## Why this is faster

| Old (laggy) | Docker |
|-------------|--------|
| `npm start` webpack dev on Windows | Pre-built static files in Nginx |
| `php artisan serve` (1 worker) | PHP-FPM + Opcache |
| SQLite / file sessions | MySQL + Redis sessions/cache |
| Thousands of files on Windows disk | Code inside Linux containers |

**Stop** local `npm start` and `php artisan serve` while using Docker — use port **8080** only.

## Troubleshooting

**Port 8080 in use**

```powershell
docker compose down
# Or change gateway ports in docker-compose.yml to "8888:80"
```

**Backend keeps restarting**

```powershell
docker compose logs backend
```

**Blank page**

```powershell
docker compose ps
docker compose restart gateway frontend backend
```

**CORS / login issues**

Ensure you use **http://localhost:8080** (not 3000). `.env.docker` sets `FRONTEND_URL` and `APP_URL` to 8080.

## Services

| Service | Role |
|---------|------|
| `gateway` | Public entry (port 8080) |
| `frontend` | React production build |
| `backend` | Laravel API + admin |
| `mysql` | Database |
| `redis` | Cache + sessions |

## Optional: run without Docker

See `Backend/ADMIN_DASHBOARD.md` and `Frontend/package.json` for local dev.
