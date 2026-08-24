# API Integration

Backend URL: `https://assignment-4-sigma-ashen.vercel.app`

## Auth

| Component | Endpoint | Method |
|-----------|----------|--------|
| `app/auth/login` | `/api/auth/login` | POST |
| `app/auth/register` | `/api/auth/register` | POST |
| `app/auth/me` | `/api/auth/me` | GET |
| Navbar | `/api/auth/me` | GET |

## Public

| Component | Endpoint | Method |
|-----------|----------|--------|
| Home page | `/api/services` | GET |
| `/services` | `/api/services` | GET |
| `/technicians` | `/api/technicians` | GET |
| `/technicians/[id]` | `/api/technicians/:id` | GET |

## Customer Dashboard

| Component | Endpoint | Method |
|-----------|----------|--------|
| `/dashboard` | `/api/bookings` | GET |
| `/dashboard/bookings/new` | `/api/services`, `/api/technicians` | GET |
| Booking form | `/api/technicians/:id/availability` | GET |
| Create booking | `/api/bookings` | POST |
| Cancel booking | `/api/bookings/:id` | PATCH |
| `/dashboard/bookings/[id]` | `/api/bookings/:id` | GET |
| Payment | `/api/payments/create` | POST |
| Review | `/api/bookings/:id/review` | POST |

## Technician Dashboard

| Component | Endpoint | Method |
|-----------|----------|--------|
| `/technician-dashboard` | `/api/technicians/bookings` | GET |
| `/technician-dashboard/profile` | `/api/technicians/profile` | GET, PATCH |
| `/technician-dashboard/bookings` | `/api/technicians/bookings` | GET |
| Accept/decline booking | `/api/technicians/bookings/:id` | PATCH |
| Availability | `/api/technicians/availability` | GET, PATCH |

## Admin Dashboard

| Component | Endpoint | Method |
|-----------|----------|--------|
| `/admin-dashboard` | `/api/admin/users`, `/api/admin/bookings` | GET |
| `/admin-dashboard/users` | `/api/admin/users` | GET |
| Ban/unban user | `/api/admin/users/:id` | PATCH |
| `/admin-dashboard/bookings` | `/api/admin/bookings` | GET |
| `/admin-dashboard/categories` | `/api/admin/categories` | GET, POST |
