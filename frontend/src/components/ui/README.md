# UI Components - shadcn/ui Implementation

This folder contains all shadcn/ui-based components for the Restaurant Management System, providing a consistent, accessible, and modern design system.

## Core Components

### Layout Components
- **Container** - Responsive container with consistent padding
- **Grid** - Flexible grid layout system with responsive columns
- **Stack** - Vertical and horizontal stacking with consistent spacing
- **Separator** - Visual divider for content sections

### Form Components
- **Button** - Interactive button with multiple variants and sizes
- **Input** - Basic text input field
- **FormInput** - Enhanced input with label, icons, and error handling
- **Textarea** - Multi-line text input
- **Select** - Dropdown selection component
- **Checkbox** - Checkbox input with custom styling
- **Switch** - Toggle switch component
- **Label** - Form label component

### Display Components
- **Card** - Container with header, content, and footer sections
- **Badge** - Status and category indicators
- **Avatar** - User profile images with fallbacks
- **Alert** - Notification and status messages
- **Progress** - Progress indicators
- **Table** - Data table with sorting and selection

### Navigation Components
- **Tabs** - Tabbed interface
- **Dialog** - Modal dialogs and overlays
- **DropdownMenu** - Context menus and dropdowns

### Feedback Components
- **Toast** - Notification system
- **useToast** - Toast hook for notifications

## Design Tokens

The components use CSS custom properties for consistent theming:

### Colors
- `--background` / `--foreground` - Main background and text
- `--primary` / `--primary-foreground` - Primary brand colors
- `--secondary` / `--secondary-foreground` - Secondary colors
- `--accent` / `--accent-foreground` - Accent colors
- `--muted` / `--muted-foreground` - Muted/subtle colors
- `--destructive` / `--destructive-foreground` - Error/danger colors
- `--border` - Border colors
- `--input` - Input field colors
- `--ring` - Focus ring colors

### Spacing
- `--radius` - Border radius values
- Consistent spacing scale (xs, sm, md, lg, xl)

## Usage Examples

### Basic Button
```tsx
import { Button } from "@/components/ui/button"

<Button variant="default" size="lg">
  Click me
</Button>
```

### Card with Content
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

### Form Input
```tsx
import { FormInput } from "@/components/ui/form-input"
import { Mail } from "lucide-react"

<FormInput
  label="Email"
  type="email"
  placeholder="Enter your email"
  leftIcon={<Mail className="w-4 h-4" />}
  error="Invalid email address"
/>
```

### Grid Layout
```tsx
import { Grid } from "@/components/ui/grid"

<Grid cols={3} gap="lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

## Best Practices

1. **Use Design Tokens** - Always use CSS custom properties instead of hardcoded colors
2. **Consistent Spacing** - Use the spacing scale (xs, sm, md, lg, xl)
3. **Accessibility** - All components include proper ARIA attributes and keyboard navigation
4. **Responsive Design** - Components are mobile-first and responsive
5. **Dark Mode** - All components support dark mode via CSS custom properties

## Variants and Sizes

### Button Variants
- `default` - Primary action button
- `secondary` - Secondary action button
- `outline` - Bordered button
- `ghost` - Transparent button
- `destructive` - Danger/delete action
- `link` - Link-style button

### Button Sizes
- `sm` - Small button
- `default` - Standard button
- `lg` - Large button
- `icon` - Square icon button

### Badge Variants
- `default` - Standard badge
- `secondary` - Secondary badge
- `outline` - Bordered badge
- `destructive` - Error/danger badge

## Migration Guide

When migrating from custom components to shadcn/ui:

1. Replace custom button classes with `<Button>` component
2. Use `<Card>` components instead of custom card divs
3. Replace custom form inputs with `<FormInput>` or `<Input>`
4. Use `<Grid>` and `<Stack>` for layout instead of custom flex/grid classes
5. Update color classes to use design tokens (e.g., `text-foreground` instead of `text-gray-900`)

## Accessibility Features

- All interactive elements are keyboard accessible
- Proper ARIA labels and roles
- Focus management for modals and dialogs
- Screen reader support
- High contrast mode support
- Reduced motion support for animations
