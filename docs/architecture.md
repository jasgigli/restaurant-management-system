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