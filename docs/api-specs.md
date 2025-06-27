# API Specifications

## Authentication
- **Register:** `POST /api/auth/register` — Register a new user
- **Login:** `POST /api/auth/login` — Returns JWT token
- **Protected Routes:** Require `Authorization: Bearer <token>` header

## Endpoints

### Assets
- `GET /api/assets` — List all assets (SuperAdmin only)
- `POST /api/assets` — Create asset (SuperAdmin only)
- `PUT /api/assets/:id` — Update asset (SuperAdmin only)
- `DELETE /api/assets/:id` — Delete asset (SuperAdmin only)
- `POST /api/assigned-items` — Assign asset to staff (SuperAdmin only)
- `GET /api/assigned-items` — List assigned items (SuperAdmin only)

### HR
- `GET /api/hr/employees` — List employees (SuperAdmin, HR)
- `POST /api/hr/employees` — Add employee (SuperAdmin, HR)
- `PUT /api/hr/employees/:id` — Update employee (SuperAdmin, HR)
- `DELETE /api/hr/employees/:id` — Delete employee (SuperAdmin, HR)
- `GET /api/hr/attendance` — List attendance records (SuperAdmin, HR)
- `POST /api/hr/attendance` — Record attendance (SuperAdmin, HR)

### Menu Items
- `GET /api/menu/items` — List menu items (SuperAdmin, MenuManager)
- `POST /api/menu/items` — Create menu item (SuperAdmin only)
- `PUT /api/menu/items/:id` — Update menu item (SuperAdmin, MenuManager)
- `DELETE /api/menu/items/:id` — Delete menu item (SuperAdmin, MenuManager)
- `POST /api/menu/items/:id/ingredients` — Add ingredients to menu item (SuperAdmin only)

### Store/Warehouse
- `GET /api/store/items` — List store items (SuperAdmin, KitchenStaff)
- `POST /api/store/items` — Add store item (SuperAdmin, KitchenStaff)
- `PUT /api/store/items/:id` — Update store item (SuperAdmin, KitchenStaff)
- `DELETE /api/store/items/:id` — Delete store item (SuperAdmin only)

### Sales/POS
- `POST /api/sales` — Create sale (SuperAdmin, Sales)
- `GET /api/sales` — Get sales report (SuperAdmin, Moderator)

### Reports
- `GET /api/reports/net-profit?start=YYYY-MM-DD&end=YYYY-MM-DD` — Net profit report (SuperAdmin, Moderator)

## Request/Response Example

### Register
**Request:**
```json
POST /api/auth/register
{
  "username": "newuser",
  "password": "yourpassword"
}
```
**Response:**
```json
{
  "message": "User registered successfully"
}
```

### Login
**Request:**
```json
POST /api/auth/login
{
  "username": "admin",
  "password": "yourpassword"
}
```
**Response:**
```json
{
  "token": "<jwt-token>"
}
```

### Error Response
```json
{
  "status": "error",
  "message": "Invalid credentials"
}
```

## Security & Validation
- All sensitive endpoints require JWT and role-based authorization.
- Input validation is enforced using Joi schemas.
- File uploads (e.g., employee photo) are supported in HR endpoints.

## Error Handling
- All errors return JSON with `status` and `message` fields.
- Validation errors return 400, auth errors 401, not found 404, server errors 500.

## Notes
- All endpoints are prefixed with `/api/`.
- Pagination is supported on listing endpoints via `?page=` and `?limit=` query params where applicable.
