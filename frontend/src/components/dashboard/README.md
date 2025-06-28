# Dashboard Components

This directory contains the dashboard components for the Restaurant Management System.

## Components

### Core Components
- **DashboardShell.tsx** - Main layout wrapper for all dashboards
- **AppBar.tsx** - Top navigation bar with search, notifications, and user info
- **KPICard.tsx** - Key Performance Indicator cards with animations
- **SalesChart.tsx** - Recharts-based charts for sales and analytics

### Dashboard Pages
- **Admin Dashboard** (`/admin`) - Complete business overview with revenue, orders, staff, and inventory
- **HR Dashboard** (`/hr-dashboard`) - Employee management, attendance, and HR metrics
- **Staff Dashboard** (`/staff-dashboard`) - Daily tasks, orders, and staff-specific information

## Features

### Admin Dashboard
- Revenue and sales analytics
- Order tracking and status
- Staff efficiency metrics
- Inventory alerts
- Customer satisfaction ratings

### HR Dashboard
- Employee attendance tracking
- Leave request management
- Department efficiency metrics
- Payroll overview
- Employee satisfaction scores

### Staff Dashboard
- Daily task management
- Current order tracking
- Performance metrics
- Notifications
- Work schedule overview

## Data Structure

All dashboards currently use dummy data that can be easily replaced with real backend data:

```typescript
// Example KPI data structure
const kpiData = [
  {
    title: "Total Revenue",
    value: 45678,
    change: 12.5,
    trend: "up" | "down" | "stable",
    icon: LucideIcon,
  }
];

// Example sales data structure
const salesData = [
  {
    date: "Mon",
    sales: 12000,
    profit: 8000,
    orders: 45
  }
];
```

## Styling

The dashboards use:
- Tailwind CSS for styling
- Lucide React for icons
- Framer Motion for animations
- Recharts for data visualization

## Responsive Design

All dashboards are fully responsive and work on:
- Desktop (lg+)
- Tablet (md)
- Mobile (sm)

## Integration

To integrate with real backend data:

1. Replace dummy data with API calls
2. Update data structures to match backend responses
3. Add loading states and error handling
4. Implement real-time updates if needed

## Usage

```tsx
import AdminDashboard from './pages/dashboard/admin-dashboard/admin-dashboard';

// In your router
<Route path="/admin" element={<AdminDashboard />} />
```
