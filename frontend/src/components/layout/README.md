# Layout System

A modern, professional layout system for the Restaurant Management System (RMS) built with React, TypeScript, and Tailwind CSS.

## Overview

This layout system provides a cohesive, accessible, and performant foundation for the RMS application. It eliminates code duplication, enforces design consistency, and delivers a premium SaaS dashboard experience.

## Features

- **🎨 Modern Design System**: Consistent colors, typography, spacing, and component styles
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **⚡ Smooth Animations**: Framer Motion-powered transitions and micro-interactions
- **♿ Accessibility**: WCAG compliant with proper focus management and screen reader support
- **🌙 Dark Mode**: Full dark mode support with consistent theming
- **🔧 Customizable**: Easy to extend and modify for different use cases
- **📦 Modular**: Reusable components that can be mixed and matched

## Components

### Core Layout Components

#### `MainLayout`
The main layout wrapper that orchestrates the entire application layout.

```tsx
import MainLayout from '../layout/MainLayout';

// Usage in router
<Route path="/dashboard" element={<MainLayout />}>
  <Route index element={<Dashboard />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

#### `Sidebar`
The main navigation sidebar with collapsible functionality and role-based navigation.

```tsx
import Sidebar from '../components/layout/Sidebar';

<Sidebar onClose={handleClose} />
```

**Features:**
- Role-based navigation (admin, hr, staff)
- Collapsible sidebar with smooth animations
- Custom scrollbar with hover effects
- Mobile-responsive with overlay
- User profile section

#### `Header`
The top header bar with branding, page titles, and user actions.

```tsx
import { Header } from './Header';

<Header />
```

**Features:**
- Dynamic page titles based on current route
- User dropdown menu
- Responsive design
- Brand integration

#### `AppBar`
Alternative header component with additional features like search and notifications.

```tsx
import { AppBar } from '../components/dashboard/AppBar';

<AppBar
  notifications={5}
  theme="light"
  onToggleTheme={handleThemeToggle}
  showMobileMenu={isMobile}
  onMenuToggle={handleMenuToggle}
/>
```

**Features:**
- Global search functionality
- Notification system
- Theme toggle
- Mobile menu integration

#### `Footer`
The application footer with system status and support links.

```tsx
import { Footer } from '../components/layout/Footer';

<Footer
  version="1.0.0"
  lastSync={new Date().toLocaleString()}
  supportUrl="/support"
/>
```

### Shared Components

#### `Brand`
Reusable branding component with different variants.

```tsx
import { Brand } from '../components/layout/Brand';

// Default variant
<Brand />

// Compact variant
<Brand variant="compact" showTagline={false} />

// Sidebar variant
<Brand variant="sidebar" />
```

#### `NavigationItem`
Consistent navigation item component used across the application.

```tsx
import { NavigationItem } from '../components/layout/NavigationItem';

<NavigationItem
  to="/dashboard"
  label="Dashboard"
  icon={<Home size={20} />}
  description="Main dashboard view"
  variant="sidebar"
/>
```

**Variants:**
- `default`: Standard navigation item
- `compact`: Smaller, condensed version
- `sidebar`: Styled for sidebar use

#### `CustomScrollbar`
Modern scrollbar component with custom styling.

```tsx
import { CustomScrollbar } from '../components/layout/CustomScrollbar';

<CustomScrollbar variant="thin" className="h-64">
  {/* Scrollable content */}
</CustomScrollbar>
```

**Variants:**
- `default`: Standard scrollbar
- `thin`: Slim scrollbar (4px)
- `hidden`: Hidden scrollbar

## Hooks

### `useLayout`
Custom hook for managing layout state and responsive behavior.

```tsx
import { useLayout } from '../hooks/useLayout';

const {
  sidebarOpen,
  isMobile,
  isTablet,
  isDesktop,
  sidebarCollapsed,
  toggleSidebar,
  closeSidebar,
  openSidebar,
  toggleSidebarCollapsed,
  setSidebarCollapsed
} = useLayout();
```

## Design System

### Colors
The design system uses a consistent color palette:

- **Primary**: Indigo-600 (#3b82f6)
- **Accent**: Emerald-500 (#10b981)
- **Neutral**: Slate scale for text and backgrounds
- **Semantic**: Success (green), Warning (yellow), Error (red)

### Typography
- **Font Family**: Inter (system fallback)
- **Font Sizes**: xs (12px) to 5xl (48px)
- **Font Weights**: Light (300) to Extrabold (800)

### Spacing
Consistent spacing scale from xs (4px) to 4xl (96px)

### Animations
- **Duration**: 150ms (fast), 200ms (normal), 300ms (slow)
- **Easing**: ease-in-out for most transitions
- **Micro-interactions**: Scale and opacity changes on hover/focus

## Configuration

### Navigation Configuration
Navigation is centrally configured in `src/config/navigation.ts`:

```tsx
import { getNavigationByRole } from '../config/navigation';

const navigation = getNavigationByRole(user.role);
```

### Design Tokens
Design tokens are defined in `src/lib/design-system.ts`:

```tsx
import { designSystem } from '../lib/design-system';

const { colors, typography, spacing, shadows } = designSystem;
```

## Usage Examples

### Basic Layout Setup
```tsx
import MainLayout from '../layout/MainLayout';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="admin/*" element={<AdminRoutes />} />
        <Route path="hr/*" element={<HRRoutes />} />
        <Route path="staff/*" element={<StaffRoutes />} />
      </Route>
    </Routes>
  );
}
```

### Custom Sidebar Content
```tsx
import Sidebar from '../components/layout/Sidebar';
import { CustomScrollbar } from '../components/layout/CustomScrollbar';

function CustomSidebar() {
  return (
    <Sidebar>
      <CustomScrollbar variant="thin">
        {/* Custom navigation content */}
      </CustomScrollbar>
    </Sidebar>
  );
}
```

### Responsive Header
```tsx
import { Header } from './Header';
import { useLayout } from '../hooks/useLayout';

function ResponsiveHeader() {
  const { isMobile } = useLayout();

  return (
    <Header>
      {!isMobile && <SearchBar />}
      <UserMenu />
    </Header>
  );
}
```

## Best Practices

1. **Use the Design System**: Always use the defined colors, typography, and spacing
2. **Responsive First**: Design for mobile first, then enhance for larger screens
3. **Accessibility**: Ensure proper focus management and screen reader support
4. **Performance**: Use React.memo for components that don't need frequent updates
5. **Consistency**: Use the same patterns across similar components

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

When adding new layout components:

1. Follow the existing naming conventions
2. Use the design system tokens
3. Include proper TypeScript types
4. Add comprehensive documentation
5. Test across different screen sizes
6. Ensure accessibility compliance

## Performance

The layout system is optimized for performance:

- **Lazy Loading**: Components are loaded only when needed
- **Memoization**: Expensive calculations are memoized
- **Efficient Animations**: Hardware-accelerated CSS transforms
- **Minimal Re-renders**: Proper use of React hooks and context

## Troubleshooting

### Common Issues

1. **Sidebar not collapsing**: Check if `useLayout` hook is properly initialized
2. **Navigation not showing**: Verify user role and navigation configuration
3. **Scrollbar not styled**: Ensure custom scrollbar CSS is loaded
4. **Animations not working**: Check if Framer Motion is installed

### Debug Mode

Enable debug mode by setting the environment variable:
```bash
REACT_APP_DEBUG_LAYOUT=true
```

This will show additional information about layout state and component props.

# Premium Layout Components

This directory contains world-class, premium SaaS-style layout components built with modern design principles, enhanced animations, and full light/dark mode support using shadcn/ui.

## Components Overview

### 🎨 Header Component (`Header.tsx`)

A premium SaaS-style header with advanced features:

**Key Features:**
- ✨ Premium glassmorphism design with animated backgrounds
- 🌓 Full light/dark mode support with smooth transitions
- 🔍 Enhanced search with focus animations
- 🔔 Smart notification system with badges
- 👤 Rich user dropdown with profile information
- ⏰ Real-time clock display
- 📱 Responsive design for all screen sizes
- 🎭 Smooth animations using Framer Motion

**Props:**
```typescript
interface HeaderProps {
  onMenuToggle?: () => void;
  showMobileMenu?: boolean;
  notifications?: number;
  breadcrumbs?: string[];
}
```

**Usage:**
```tsx
import { Header } from './Header';

<Header
  breadcrumbs={["Dashboard", "Sales", "Analytics"]}
  notifications={5}
  onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
  showMobileMenu={true}
/>
```

### 🎯 Sidebar Component (`Sidebar.tsx`)

A sophisticated sidebar with premium navigation:

**Key Features:**
- 🎨 Premium glassmorphism with animated backgrounds
- 🔄 Smooth collapse/expand animations
- 👤 Enhanced user profile section with premium badges
- 📊 Real-time system status indicators
- 👑 Premium plan indicators
- 🎭 Staggered animation effects
- 📱 Mobile-responsive with touch gestures
- 🌓 Full theme support

**Props:**
```typescript
interface SidebarProps {
  onClose?: () => void;
}
```

**Usage:**
```tsx
import Sidebar from './Sidebar';

<Sidebar onClose={() => setMobileMenuOpen(false)} />
```

### 🎪 Footer Component (`Footer.tsx`)

A comprehensive footer with system monitoring:

**Key Features:**
- 📊 Real-time system status monitoring
- 🔒 Security status indicators
- 🌐 Global connectivity status
- ⏰ Live clock and sync timestamps
- 👑 Premium plan branding
- 🎭 Smooth entrance animations
- 📱 Responsive layout
- 🔗 Support and legal links

**Props:**
```typescript
interface FooterProps {
  version: string;
  lastSync: string;
  supportUrl?: string;
  isOnline?: boolean;
  systemStatus?: 'operational' | 'degraded' | 'down';
}
```

**Usage:**
```tsx
import { Footer } from './Footer';

<Footer
  version="1.0.0"
  lastSync="2 minutes ago"
  supportUrl="/support"
  isOnline={true}
  systemStatus="operational"
/>
```

## Design System

### Color Palette
- **Primary**: Modern blue tones with gradient variations
- **Accent**: Emerald green for success states
- **Warning**: Yellow/Orange for alerts
- **Error**: Red for destructive actions
- **Neutral**: Sophisticated grays for text and borders

### Typography
- **Font Family**: Inter (system fallback)
- **Weights**: Light (300) to Bold (700)
- **Sizes**: Responsive scale from xs to 5xl

### Animations
- **Entrance**: Staggered fade-in with scale effects
- **Hover**: Subtle scale and glow effects
- **Transitions**: Smooth 200-400ms durations
- **Micro-interactions**: Button presses, focus states

### Spacing
- **Consistent**: 4px base unit system
- **Responsive**: Scales with screen size
- **Hierarchical**: Clear visual hierarchy

## Technical Features

### Performance Optimizations
- ⚡ Lazy loading for animations
- 🎯 Optimized re-renders with React.memo
- 📦 Tree-shaking friendly imports
- 🖼️ Efficient SVG icons

### Accessibility
- ♿ Full keyboard navigation
- 🎨 High contrast mode support
- 📱 Touch-friendly interactions
- 🗣️ Screen reader compatible

### Browser Support
- ✅ Modern browsers (Chrome, Firefox, Safari, Edge)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ✅ Progressive enhancement

## Installation & Setup

### Dependencies
```json
{
  "framer-motion": "^10.0.0",
  "lucide-react": "^0.263.0",
  "tailwindcss": "^3.3.0"
}
```

### Theme Configuration
Ensure your `tailwind.config.js` includes the design tokens:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        // ... other color tokens
      }
    }
  }
}
```

### CSS Variables
Add these CSS custom properties to your global styles:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  /* ... other variables */
}

.dark {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... dark mode variables */
}
```

## Best Practices

### Performance
1. **Lazy Load**: Use React.lazy for route-based code splitting
2. **Memoization**: Memoize expensive calculations
3. **Debouncing**: Debounce search inputs and resize handlers
4. **Optimization**: Use `will-change` CSS property sparingly

### Accessibility
1. **Semantic HTML**: Use proper heading hierarchy
2. **ARIA Labels**: Provide descriptive labels for interactive elements
3. **Focus Management**: Ensure logical tab order
4. **Color Contrast**: Maintain WCAG AA compliance

### Responsive Design
1. **Mobile First**: Design for mobile, enhance for desktop
2. **Touch Targets**: Minimum 44px touch targets
3. **Breakpoints**: Use consistent breakpoint system
4. **Flexible Layouts**: Use CSS Grid and Flexbox

## Customization

### Theme Customization
```typescript
// Custom theme colors
const customTheme = {
  colors: {
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a',
    }
  }
};
```

### Animation Customization
```typescript
// Custom animation variants
const customVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
```

### Component Customization
```tsx
// Custom styling with className
<Header
  className="custom-header-styles"
  breadcrumbs={["Custom", "Path"]}
/>
```

## Troubleshooting

### Common Issues

1. **Animations not working**
   - Check if Framer Motion is installed
   - Verify animation variants are properly defined

2. **Theme not switching**
   - Ensure ThemeProvider is wrapping components
   - Check CSS variables are properly defined

3. **Responsive issues**
   - Verify Tailwind breakpoints are configured
   - Check viewport meta tag is present

### Performance Issues

1. **Slow animations**
   - Reduce animation complexity
   - Use `transform` instead of layout properties
   - Consider `will-change` for heavy animations

2. **Memory leaks**
   - Clean up event listeners in useEffect
   - Cancel animation subscriptions

## Contributing

When contributing to these components:

1. **Follow the design system** - Maintain consistency
2. **Add animations thoughtfully** - Don't over-animate
3. **Test accessibility** - Ensure keyboard navigation works
4. **Document changes** - Update this README
5. **Performance first** - Optimize for speed

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and shadcn/ui

# Layout Components

This directory contains the refactored layout components for the Restaurant Management System. The components have been optimized to eliminate duplication and improve consistency.

## Components Overview

### Core Layout Components

#### `Header.tsx`
- **Purpose**: Main application header with navigation, search, and user controls
- **Features**:
  - Glassmorphism background with animated effects
  - Responsive design with mobile menu support
  - Integrated search functionality
  - Theme toggle with smooth animations
  - User profile dropdown with comprehensive tabs
  - Status indicators (connection, version, time)
  - Breadcrumb navigation

#### `Footer.tsx`
- **Purpose**: Application footer with system status and information
- **Features**:
  - Glassmorphism background matching header
  - System status indicators
  - Time display and sync status
  - Premium badge and security status
  - Global status information

#### `UserProfileDropdown.tsx`
- **Purpose**: Comprehensive user profile management dropdown
- **Features**:
  - Tabbed interface (Profile, Settings, Security)
  - User information display with badges
  - Theme toggle integration
  - Profile management options
  - Security settings
  - Help and support links
  - Logout functionality

### Shared Components

#### `shared/StatusIndicators.tsx`
- **Purpose**: Reusable status badges and indicators
- **Components**:
  - `StatusBadge`: Base status badge component
  - `SystemStatus`: System operational status
  - `ConnectionStatus`: Online/offline status
  - `VersionBadge`: Application version display
  - `SecurityStatus`: SSL/security status
  - `PremiumBadge`: Premium plan indicator
  - `TimeDisplay`: Current time display
  - `SyncStatus`: Last sync timestamp
  - `SupportLink`: Support link with animations
  - `GlobalStatus`: Global system status

#### `shared/GlassmorphismBackground.tsx`
- **Purpose**: Reusable animated glassmorphism background
- **Features**:
  - Animated gradient overlays
  - Subtle pattern background
  - Consistent styling across components
  - Configurable via props

## Usage Examples

### Header Component
```tsx
import { Header } from './Header';

<Header
  breadcrumbs={["Dashboard", "Sales", "Reports"]}
  notifications={5}
  version="1.2.0"
  isOnline={true}
  showMobileMenu={true}
  onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
/>
```

### Footer Component
```tsx
import { Footer } from './components/layout/Footer';

<Footer
  version="1.2.0"
  lastSync="2 minutes ago"
  supportUrl="/help"
  isOnline={true}
  systemStatus="operational"
/>
```

### User Profile Dropdown
```tsx
import { UserProfileDropdown } from './components/layout/UserProfileDropdown';

<UserProfileDropdown className="custom-styles" />
```

### Status Indicators
```tsx
import {
  SystemStatus,
  ConnectionStatus,
  VersionBadge
} from './components/layout/shared/StatusIndicators';

<div className="flex gap-2">
  <SystemStatus status="operational" />
  <ConnectionStatus isOnline={true} />
  <VersionBadge version="1.2.0" />
</div>
```

## Key Improvements

### 1. Eliminated Duplication
- **Before**: Header and Footer had duplicate status indicator code
- **After**: Shared `StatusIndicators` component used by both

### 2. Consistent Styling
- **Before**: Inconsistent background implementations
- **After**: Shared `GlassmorphismBackground` component

### 3. Enhanced User Experience
- **Before**: Basic user dropdown
- **After**: Comprehensive tabbed profile management

### 4. Better Code Organization
- **Before**: All code in single files
- **After**: Modular shared components

### 5. Improved Maintainability
- **Before**: Changes required updates in multiple places
- **After**: Single source of truth for shared functionality

## Component Props

### Header Props
```typescript
interface HeaderProps {
  onMenuToggle?: () => void;
  showMobileMenu?: boolean;
  notifications?: number;
  breadcrumbs?: string[];
}
```

### Footer Props
```typescript
interface FooterProps {
  version: string;
  lastSync: string;
  supportUrl?: string;
  isOnline?: boolean;
  systemStatus?: "operational" | "degraded" | "down";
}
```

### UserProfileDropdown Props
```typescript
interface UserProfileDropdownProps {
  className?: string;
}
```

## Styling

All components use:
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **CSS Variables** for theming
- **Glassmorphism** design patterns
- **Responsive** design principles

## Accessibility

Components include:
- Proper ARIA labels
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast support

## Performance

Optimizations include:
- Memoized components where appropriate
- Efficient re-renders
- Lazy loading of heavy components
- Optimized animations

## Future Enhancements

1. **Internationalization**: Add i18n support for all text
2. **Customization**: Allow theme customization
3. **Analytics**: Add usage tracking
4. **Offline Support**: Enhance offline functionality
5. **Accessibility**: Further improve a11y features
