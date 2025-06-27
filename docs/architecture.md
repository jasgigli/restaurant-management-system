# Architecture



## Components

### Frontend (React + TypeScript)
- **Pages:** Dashboard, Assets, HR, Menu, Sales/POS, Warehouse
- **Components:** Layout, Header, Sidebar, UI elements (Shadcn/UI)
- **State/Data:** TanStack Query for server state, React Context for auth
- **API Layer:** `apiClient.ts` for HTTP requests
- **Routing:** React Router

### Backend (Node.js + Express)
- **Controllers:** Handle HTTP requests for assets, HR, menu, sales, store, reports
- **Services:** Business logic for each domain
- **Models:** Sequelize models for all entities (employee, sale, asset, etc.)
- **Middleware:** Auth, validation (Joi), error handling
- **Routes:** RESTful endpoints grouped by resource
- **Utils:** Logging (Winston), file uploads (Multer)

### Database (MySQL)
- Relational schema managed via Sequelize ORM


## Data Flow
1. User interacts with the React frontend.
2. Frontend sends HTTP requests to the Express backend (protected by JWT auth).
3. Backend validates, processes, and interacts with the MySQL database via Sequelize.
4. Responses are sent back to the frontend for display or further action.

## Security
- JWT-based authentication
- Role-based authorization
- Input validation (Joi)
- Secure password storage (bcrypt)

## Extensibility
- Modular service/controller structure for easy feature addition
- Clear separation of concerns between frontend, backend, and database


have me apply all changes in one batch and then summarize the results?

# Project Overview

## Purpose
The Restaurant Management System (RMS) is a full-stack application designed to streamline and automate restaurant operations, including asset management, HR, menu, sales/POS, warehouse, and reporting. It aims to improve efficiency, reduce manual errors, and provide actionable insights for restaurant managers and staff.

## Features
- **Asset Management:** Track and manage restaurant assets and inventory.
- **HR Management:** Employee records, attendance, salary advances, and staff assignments.
- **Menu Management:** CRUD for menu items and their ingredients.
- **Sales/POS:** Point-of-sale interface, sales tracking, and detailed sale records.
- **Warehouse/Store Management:** Store item tracking, stock levels, and assignments.
- **Reporting:** Generate reports for sales, inventory, HR, and more.
- **Authentication & Authorization:** Secure login and role-based access control.

## Tech Stack
- **Backend:** Node.js, Express, Joi (validation)
- **Frontend:** React, TypeScript, Vite, TanStack Query, Shadcn/UI
- **Database:** MySQL
- **ORM:** Sequelize
- **Other:** Winston (logging), Multer (file uploads), JWT (authentication)
