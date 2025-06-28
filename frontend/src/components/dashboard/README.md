# Dashboard Components

This directory contains the enhanced dashboard components for the Restaurant Management System (RMS). The layout system has been redesigned to be more professional, modern, responsive, and maintainable.

## Components Overview

### MainLayout.tsx
The main layout wrapper that provides:
- Responsive sidebar with mobile support
- AppBar with mobile menu toggle
- Proper content area with overflow handling
- Footer with system status

**Features:**
- Mobile-first responsive design
- Smooth sidebar transitions
- Overlay for mobile navigation
- Automatic sidebar closing on mobile route changes

### DashboardShell.tsx
A flexible container component for dashboard pages that provides:
- Consistent page header structure
- Title, subtitle, and action buttons
- Smooth page transitions with Framer Motion
- Responsive layout support

**Props:**
- `title`: Page title
- `subtitle`: Page description
- `actions`: Action buttons (optional)
- `children`: Page content
- `className`: Additional CSS classes

### AppBar.tsx
Enhanced top navigation bar with:
- Mobile menu toggle button
- Responsive search bar
- User information display
- Notification system
- Theme toggle
- Logout functionality

**Features:**
- Responsive design with mobile optimizations
- Breadcrumb navigation (hidden on mobile)
- Simplified mobile interface
- Smooth animations

### Sidebar.tsx
Role-based navigation sidebar with:
- User profile information
- Role-specific navigation links
- Responsive design with mobile close button
- Smooth hover effects and transitions

**Navigation Structure:**
- **Admin**: Dashboard, Analytics, Financial Management, HR, Operations, System Management
- **HR**: Dashboard, Employee Management, Attendance & Time, Payroll & Benefits, Compliance
- **Staff**: Dashboard, Orders & Service, Kitchen Operations, Inventory & Stock, My Schedule

## Usage Examples

### Basic Dashboard Page
```tsx
import DashboardShell from "@/components/dashboard/DashboardShell";
import { Button } from "@/components/ui/button";

const MyDashboard = () => {
  const actions = (
    <div className="flex items-center gap-3">
      <Button variant="outline" className="px-3 py-2 text-sm">
        Export
      </Button>
      <Button className="px-3 py-2 text-sm">
        New Item
      </Button>
    </div>
  );

  return (
    <DashboardShell
      title="My Dashboard"
      subtitle="Welcome to your dashboard"
      actions={actions}
    >
      {/* Your dashboard content */}
    </DashboardShell>
  );
};
```

### Role-Based Navigation
The sidebar automatically adapts based on user role:
- Admin users see financial and operational tools
- HR users see employee management tools
- Staff users see service and task management tools

## Responsive Design

### Breakpoints
- **Mobile**: < 1024px - Collapsible sidebar with overlay
- **Tablet**: 1024px - 1280px - Sidebar visible, responsive content
- **Desktop**: > 1280px - Full layout with optimal spacing

### Mobile Features
- Hamburger menu for sidebar toggle
- Simplified AppBar with essential elements only
- Touch-friendly navigation
- Automatic sidebar closing on navigation

## Design System

### Colors
- **Primary**: Purple gradient (sidebar)
- **Secondary**: Blue accents (AppBar, buttons)
- **Success**: Green (completed tasks, positive trends)
- **Warning**: Orange/Yellow (pending items, alerts)
- **Error**: Red (errors, negative trends)

### Typography
- **Headers**: Inter font family
- **Body**: System font stack
- **Consistent sizing**: text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl

### Spacing
- **Consistent gaps**: gap-2, gap-3, gap-4, gap-6
- **Padding**: p-4, p-6 for cards and sections
- **Margins**: mb-6, mb-8 for section separation

## Best Practices

### Dashboard Structure
1. Use `DashboardShell` for consistent page layout
2. Include meaningful titles and subtitles
3. Add relevant action buttons
4. Use responsive grid layouts
5. Implement proper loading states

### Navigation
1. Keep navigation items organized by function
2. Use descriptive labels and icons
3. Maintain consistent styling across roles
4. Test mobile navigation thoroughly

### Performance
1. Use React.memo for expensive components
2. Implement proper loading states
3. Optimize images and icons
4. Use lazy loading for routes

## Accessibility

### Features
- Proper ARIA labels
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management

### Guidelines
1. Use semantic HTML elements
2. Provide alt text for images
3. Ensure proper color contrast
4. Test with screen readers
5. Support keyboard-only navigation

## Maintenance

### Code Organization
- Components are modular and reusable
- Props are properly typed with TypeScript
- Consistent naming conventions
- Clear separation of concerns

### Updates
- Follow semantic versioning
- Document breaking changes
- Maintain backward compatibility
- Test across all roles and devices

## Future Enhancements

### Planned Features
- Dark mode support
- Customizable dashboard layouts
- Advanced filtering and search
- Real-time notifications
- Performance analytics

### Technical Improvements
- Virtual scrolling for large lists
- Advanced caching strategies
- Progressive web app features
- Enhanced mobile gestures
- Offline support
