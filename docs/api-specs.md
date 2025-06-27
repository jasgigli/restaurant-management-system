# API Specifications

## Authentication
- **Login:** `POST /api/auth/login` — Returns JWT token
- **Protected Routes:** Require `Authorization: Bearer <token>` header

## Endpoints

### Assets
- `GET /api/assets` — List all assets
- `POST /api/assets` — Create asset
- `GET /api/assets/:id` — Get asset by ID
- `PUT /api/assets/:id` — Update asset
- `DELETE /api/assets/:id` — Delete asset

### HR
- `GET /api/hr/employees` — List employees
- `POST /api/hr/employees` — Add employee
- `GET /api/hr/attendance` — List attendance records
- `POST /api/hr/attendance` — Record attendance
- `POST /api/hr/salary-advance` — Request salary advance

### Menu Items
- `GET /api/menu-items` — List menu items
- `POST /api/menu-items` — Create menu item
- `GET /api/menu-items/:id` — Get menu item by ID
- `PUT /api/menu-items/:id` — Update menu item
- `DELETE /api/menu-items/:id` — Delete menu item

### Sales/POS
- `GET /api/sales` — List sales
- `POST /api/sales` — Create sale
- `GET /api/sales/:id` — Get sale by ID

### Store/Warehouse
- `GET /api/store-items` — List store items
- `POST /api/store-items` — Add store item
- `PUT /api/store-items/:id` — Update store item
- `DELETE /api/store-items/:id` — Delete store item

### Reports
- `GET /api/reports/sales` — Sales reports
- `GET /api/reports/inventory` — Inventory reports
- `GET /api/reports/hr` — HR reports

## Request/Response Example

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

## Error Handling
- All errors return JSON with `status` and `message` fields
- Validation errors return 400, auth errors 401, not found 404, server errors 500

## Notes
- All endpoints are prefixed with `/api/`
