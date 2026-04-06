# Finance Dashboard API

A backend REST API for a finance dashboard system built with **Node.js**, **Express**, and **SQLite (better-sqlite3)**. The system supports financial record management, role-based access control, and dashboard summary analytics.

***

## Tech Stack

| Layer | Choice |
|---|---|
| Runtime | Node.js v20+ (ESM) |
| Framework | Express.js |
| Database | SQLite via better-sqlite3 |
| Auth | Mock auth (hardcoded email header) |
| Validation | Custom middleware (no third-party library) |

***

## Project Structure

```
FINANCE-DASHBOARD-API/
├── config/
│   └── db.js                          # SQLite database connection
├── database/
│   ├── finance.db                     # SQLite database file
│   ├── migrations.js                  # Table creation
│   └── seed.js                        # Seed roles, users, and records
├── src/
│   ├── constants/
│   │   └── roles.js                   # Role constants
│   ├── middleware/
│   │   ├── authentication.middleware.js  # Mock auth — attaches user from email header
│   │   ├── authorization.middleware.js   # Role-based access control
│   │   ├── error.middleware.js           # Centralized error handler
│   │   └── validator.middleware.js       # Custom input validation
│   ├── modules/
│   │   ├── dashboard/
│   │   │   ├── dashboard.controller.js
│   │   │   ├── dashboard.repository.js
│   │   │   ├── dashboard.routes.js
│   │   │   └── dashboard.service.js
│   │   ├── records/
│   │   │   ├── record.controller.js
│   │   │   ├── record.repository.js
│   │   │   ├── record.routes.js
│   │   │   └── record.service.js
│   │   ├── users/
│   │   │   ├── user.controller.js
│   │   │   ├── user.repository.js
│   │   │   ├── user.routes.js
│   │   │   └── user.service.js
│   │   └── router.js                  # Central route registrar
│   └── utils/
│       ├── app.error.js               # Custom AppError class
│       ├── money.js                   # Money formatting helper
│       └── response.helper.js         # Consistent success/error responses
├── .env
├── .env.example
├── .gitignore
├── app.js
└── package.json
```

***

## Setup

### Prerequisites

- Node.js v20+

### 1. Clone and install

```bash
git clone https://github.com/milan903575/finance-dashboard-api
cd finance-dashboard-api
npm install
```

### 2. Configure environment

Create a `.env` file and copy the contents from `.env.example`:

```env
PORT=3000
```

### 3. Initialise the database

```bash
cd database
node migrations.js
```

This creates all tables and indexes.

### 4. Seed the database

```bash
cd database
node seed.js
```

This inserts:
- 3 roles (viewer, analyst, admin)
- 3 users (Milan, Sana, Shreyas)
- 20 financial records across Jan–Mar 2024

### 5. Start the server

```bash
npm start
```

Server runs at `http://localhost:3000`

***

## Mock Authentication

Authentication is simulated via a hardcoded email in `authentication.middleware.js`. If the user is found, it sets `req.user = user` and passes to the next middleware. All protected routes require this header.

To test protected routes, change the hardcoded email in `authentication.middleware.js`. The current email is `milan@gmail.com` (admin) which has access to all routes.

```
x-user-email: milan@gmail.com
```

### Test Users

| Email | Role |
|---|---|
| milan@gmail.com | admin |
| sana@gmail.com | analyst |
| shreyas@gmail.com | viewer |

***

## Roles and Permissions

| Action | Viewer | Analyst | Admin |
|---|---|---|---|
| View dashboard summary | Yes | Yes | Yes |
| View records | No | Yes | Yes |
| Create records | No | No | Yes |
| Update records | No | No | Yes |
| Delete records | No | No | Yes |
| View users | No | No | Yes |
| Create users | No | No | Yes |
| Update user role / status | No | No | Yes |

***

## API Reference

### User Routes — `/api/users`

> All routes require `x-user-email` header.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create a new user |
| PATCH | `/api/users/:id/role` | Update user role |
| PATCH | `/api/users/:id/status` | Update user status |

#### Create User — `POST /api/users`

```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "john123",
  "role_id": 1
}
```

#### Update Role — `PATCH /api/users/:id/role`

```json
{
  "role_id": 2
}
```

#### Update Status — `PATCH /api/users/:id/status`

```json
{
  "status": 1
}
```

> `1` = active, `0` = inactive

***

### Record Routes — `/api/records`

> All routes require `x-user-email` header.

| Method | Endpoint | Role Required | Description |
|---|---|---|---|
| GET | `/api/records` | Analyst, Admin | Get records with optional filters |
| GET | `/api/records/:id` | Analyst, Admin | Get record by ID |
| POST | `/api/records` | Admin | Create a new record |
| PATCH | `/api/records/:id` | Admin | Update a record |
| DELETE | `/api/records/:id` | Admin | Delete a record |

#### Create Record — `POST /api/records`

```json
{
  "amount": 85000,
  "type": "income",
  "category": "salary",
  "record_date": "2024-04-01",
  "note": "April salary",
  "created_by": 1
}
```

> `note` is optional. `type` must be `income` or `expense`.

#### Get Records with Filters — `GET /api/records`

```
GET /api/records?type=income&from=2024-01-01&to=2024-03-31&page=1&limit=10
```

| Query Param | Required | Description |
|---|---|---|
| `type` | No | `income` or `expense` |
| `category` | No | e.g. `salary`, `rent` |
| `from` | No | Start date (requires `to`) |
| `to` | No | End date (requires `from`) |
| `page` | No | Default `1` |
| `limit` | No | Default `10` |

> No filters returns all records. `from` and `to` must always be provided together.

#### Update Record — `PATCH /api/records/:id`

```json
{
  "amount": 90000,
  "note": "Updated April salary"
}
```

> At least one field required. Updatable fields: `amount`, `type`, `category`, `record_date`, `note`.

***

### Dashboard Routes — `/api/dashboard`

> All roles can access. Requires `x-user-email` header.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/dashboard/summary` | Total income, expenses, net balance |
| GET | `/api/dashboard/category-totals` | Totals grouped by category |
| GET | `/api/dashboard/trends` | Monthly income vs expense trends |
| GET | `/api/dashboard/recent` | Most recent activity |

#### Summary Response — `GET /api/dashboard/summary`

```json
{
  "success": true,
  "message": "summary fetched successfully",
  "data": {
    "total_income": 358750,
    "total_expenses": 134400,
    "net_balance": 224350
  }
}
```

#### Category Totals — `GET /api/dashboard/category-totals`

```json
{
  "success": true,
  "message": "category totals fetched successfully",
  "data": [
    {
      "category": "salary",
      "type": "income",
      "total": "172550.00"
    }
  ]
}
```

#### Monthly Trends — `GET /api/dashboard/trends`

> Returns the most recent 5 months

```json
{
  "success": true,
  "message": "monthly trends fetched successfully",
  "data": [
    {
      "month": "2024-04",
      "total_income": "170000.00",
      "total_expense": "0.00",
      "net_balance": "170000.00"
    }
  ]
}
```

***

## Response Format

All responses follow a consistent structure handled by `response.helper.js`:

**Success**
```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

**Error**
```json
{
  "success": false,
  "error": "..."
}
```

***

## Error Handling

Errors are handled centrally through `error.middleware.js` using the custom `AppError` class from `utils/app.error.js`.

| Status Code | Meaning |
|---|---|
| 400 | Bad request / validation error |
| 401 | Missing or invalid auth header |
| 403 | Forbidden — insufficient role |
| 404 | Resource not found |
| 409 | Conflict — user or record already exists |
| 500 | Internal server error |

***

## Validation

Validation is handled by a custom `validator.middleware.js` — no third-party library used.

- `throw new AppError(...)` is used in direct synchronous middleware
- `next(new AppError(...))` is used inside nested callbacks (e.g. when chaining `validateId` inside another validator) — this was a key challenge encountered, as `throw` inside a callback is not caught by Express

***

## Assumptions

- Mock auth is intentional — the assignment permits it and the focus is on backend structure and access control logic
- Each user is assigned exactly one role

***

## Tradeoffs

- The `DELETE /api/records/:id` endpoint returns a `200` status with a success message instead of the standard `204 No Content`. This decision was made to keep the response format consistent and provide meaningful feedback to the frontend

***

## Optional Features Implemented

- [x] Pagination for record listing
- [x] Filter support (type, category, date range)
- [x] Seed script with realistic data
- [x] Centralized error handling
- [x] Custom validation middleware
- [x] Role-based access control middleware
- [x] Consistent response helper
- [x] Database indexes for optimised query performance


***

## AI Assistance

All code in this project was written from scratch — including project structure, middleware, services, repositories, and business logic. AI was used only to understand specific types of errors encountered during development (such as the `throw` vs `next(error)` issue in Express callbacks) and to help structure and draft this README based on the actual project details.

***

## Contact

**Milan**
GitHub: [milan903575](https://github.com/milan903575)
