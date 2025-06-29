# Restaurant Management System (RMS)

A modern, full-stack application to streamline and automate restaurant operations, including asset management, HR, menu, sales/POS, warehouse, and reporting. RMS is designed for efficiency, security, and a premium user experience for restaurant managers and staff.

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Setup & Installation](#setup--installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
- [API Overview](#api-overview)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Overview
The Restaurant Management System (RMS) is a robust, extensible platform for managing all aspects of restaurant operations. It provides:
- Centralized asset and inventory management
- HR and payroll automation
- Menu and ingredient tracking
- Point-of-sale (POS) and sales analytics
- Warehouse/store management
- Secure authentication and role-based access
- Actionable reporting for business insights

## Features
- **Asset Management:** Track and manage restaurant assets and inventory
- **HR Management:** Employee records, attendance, salary advances, and staff assignments
- **Menu Management:** CRUD for menu items and their ingredients
- **Sales/POS:** Point-of-sale interface, sales tracking, and detailed sale records
- **Warehouse/Store Management:** Store item tracking, stock levels, and assignments
- **Reporting:** Generate reports for sales, inventory, HR, and more
- **Authentication & Authorization:** Secure login, JWT-based auth, and role-based access control
- **Modern UI/UX:** Responsive, accessible, and customizable dashboard with dark mode
- **Extensible:** Modular architecture for easy feature addition

## Architecture

### Frontend (React + TypeScript)
- Pages: Dashboard, Assets, HR, Menu, Sales/POS, Warehouse
- Components: Layout, Header, Sidebar, UI elements (Shadcn/UI)
- State/Data: TanStack Query for server state, React Context for auth
- API Layer: Axios-based client
- Routing: React Router

### Backend (Node.js + Express)
- Controllers: Handle HTTP requests for assets, HR, menu, sales, store, reports
- Services: Business logic for each domain
- Models: Sequelize models for all entities (employee, sale, asset, etc.)
- Middleware: Auth, validation (Joi), error handling
- Routes: RESTful endpoints grouped by resource
- Utils: Logging (Winston), file uploads (Multer)

### Database (MySQL)
- Relational schema managed via Sequelize ORM

### Security
- JWT-based authentication
- Role-based authorization
- Input validation (Joi)
- Secure password storage (bcrypt)

---

## Tech Stack
- **Backend:** Node.js, Express, Joi, Sequelize, Winston, Multer, JWT
- **Frontend:** React, TypeScript, Vite, TanStack Query, Shadcn/UI, Tailwind CSS, Framer Motion
- **Database:** MySQL

---

## Setup & Installation

### Prerequisites
- Node.js v18+
- MySQL
- npm or yarn

### Backend
1. `cd backend`
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Configure your environment variables in a `.env` file (see docs/AUTHENTICATION.md for required keys)
4. Run database migrations (if using sequelize-cli):
   ```bash
   npx sequelize-cli db:migrate
   ```
5. Start the backend server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The backend will run on `http://localhost:3000` by default.

### Frontend
1. `cd frontend`
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create a `.env` file with your API URL (see docs/AUTHENTICATION.md):
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```
4. Start the frontend dev server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The frontend will run on `http://localhost:5173` by default.

---

## Usage
- Access the frontend at `http://localhost:5173`
- Register or log in with your credentials
- Navigate based on your role (Admin, HR, Staff)
- Use the dashboard to manage assets, HR, menu, sales, store, and reports

---

## API Overview
- All endpoints are prefixed with `/api/`
- JWT authentication required for protected routes
- Example endpoints:
  - `POST /api/auth/register` — Register a new user
  - `POST /api/auth/login` — Login and receive JWT
  - `GET /api/assets` — List all assets
  - `POST /api/hr/employees` — Add employee
  - `GET /api/menu/items` — List menu items
  - `POST /api/sales` — Record a sale
  - `GET /api/reports/net-profit?start=YYYY-MM-DD&end=YYYY-MM-DD` — Net profit report
- See [docs/api-specs.md](docs/api-specs.md) for full API documentation and request/response examples

---

## Contributing
1. Fork the repository and create a new branch
2. Follow the code style and naming conventions
3. Write clear commit messages
4. Add tests for new features or bug fixes
5. Submit a pull request with a clear description of your changes

---

## License
This project is licensed under the MIT License (see the LICENSE file for details).

---

## Contact
- **Author:** Junaid Ali Shah Gigli (overview.jjj@gmail.com)
- **Repository:** [github.com/jasgigli/rms](https://github.com/jasgigli/restarant-management-system)

---

Built with ❤️ using React, TypeScript, Node.js, and modern web technologies.
