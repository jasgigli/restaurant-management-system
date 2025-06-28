# Authentication System Documentation

## Overview

The RMS (Restaurant Management System) features a comprehensive, enterprise-grade authentication system built with modern security practices and a beautiful, responsive UI.

## Features

### 🔐 Security Features
- **JWT Authentication** with access and refresh tokens
- **HTTP-only cookies** for secure token storage
- **Automatic token refresh** with seamless user experience
- **Password strength validation** with real-time feedback
- **Role-based access control** (Admin, HR, Staff)
- **Secure password reset** with time-limited tokens
- **Persistent authentication** across browser sessions

### 🎨 UI/UX Features
- **Modern, responsive design** with gradient backgrounds
- **Smooth animations** and micro-interactions
- **Dark mode support** with automatic theme detection
- **Loading states** and error handling
- **Form validation** with real-time feedback
- **Accessibility features** (ARIA labels, keyboard navigation)

### 🔧 Technical Features
- **React TanStack Query** for efficient data fetching
- **React Hook Form** with Zod validation
- **TypeScript** for type safety
- **Axios interceptors** for automatic token management
- **Protected routes** with role-based access
- **Error boundaries** and fallback UI

## Architecture

### Frontend Structure
```
frontend/src/
├── components/
│   ├── ProtectedRoute.tsx      # Route protection with role-based access
│   └── ui/                     # Reusable UI components
├── pages/auth/
│   ├── login/Login.tsx         # Login page
│   ├── register/Register.tsx   # Registration page
│   ├── forgot-password/        # Password reset request
│   └── reset-password/         # Password reset form
├── providers/
│   └── AuthProvider.tsx        # Authentication context
├── services/
│   └── api.ts                  # API client with interceptors
└── hooks/                      # Custom hooks
```

### Backend Structure
```
backend/
├── controllers/
│   └── authController.js       # Authentication logic
├── middleware/
│   └── authMiddleware.js       # JWT verification
├── models/
│   └── user.js                 # User model with password hashing
├── routes/
│   └── authRoutes.js           # Authentication endpoints
├── schemas/
│   └── auth.schema.js          # Request validation
└── data/
    └── userRepository.js       # Database operations
```

## API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | User registration | No |
| POST | `/auth/login` | User login | No |
| POST | `/auth/logout` | User logout | Yes |
| POST | `/auth/refresh` | Refresh access token | No (uses refresh cookie) |
| POST | `/auth/forgot-password` | Request password reset | No |
| POST | `/auth/reset-password` | Reset password with token | No |
| GET | `/auth/verify-reset-token/:token` | Verify reset token | No |
| GET | `/auth/me` | Get current user info | Yes |

### Request/Response Examples

#### Register
```json
POST /auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!",
  "role": "staff"
}

Response:
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "staff"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login
```json
POST /auth/login
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response:
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "staff"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Security Implementation

### JWT Configuration
- **Access Token**: 15 minutes expiry
- **Refresh Token**: 7 days expiry
- **Secure cookies**: HTTP-only, secure in production
- **Token rotation**: New refresh token on each refresh

### Password Security
- **Bcrypt hashing** with salt rounds of 12
- **Minimum requirements**:
  - 8 characters minimum
  - 1 uppercase letter
  - 1 number
  - 1 special character
- **Real-time strength indicator**

### Password Reset Flow
1. User requests reset via email
2. System generates secure random token
3. Token stored with 10-minute expiry
4. User receives reset link (email in production)
5. Token verified before password change
6. Token invalidated after use

## Frontend Implementation

### Authentication Provider
The `AuthProvider` manages authentication state and provides:
- User information
- Authentication status
- Login/logout functions
- Token management
- Persistent sessions

### Protected Routes
Routes are protected based on:
- Authentication status
- User role permissions
- Automatic redirects to appropriate dashboards

### API Client
The API client includes:
- Automatic token injection
- Token refresh on 401 errors
- Error handling and retry logic
- Request/response interceptors

## Environment Variables

### Backend (.env)
```env
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

## Usage Examples

### Login Flow
```typescript
import { useAuth } from '../providers/AuthProvider';
import { authAPI } from '../services/api';

const Login = () => {
  const { login } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      login(response.user, response.token);
      // User will be automatically redirected based on role
    } catch (error) {
      // Handle error
    }
  };
};
```

### Protected Component
```typescript
import { useAuth } from '../providers/AuthProvider';

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

## Error Handling

### Common Error Scenarios
- **Invalid credentials**: 401 Unauthorized
- **Token expired**: Automatic refresh attempt
- **Insufficient permissions**: 403 Forbidden
- **Validation errors**: 400 Bad Request with details
- **Server errors**: 500 Internal Server Error

### Error Recovery
- Automatic token refresh on 401 errors
- Graceful fallback to login page
- User-friendly error messages
- Toast notifications for feedback

## Best Practices

### Security
- Never store sensitive data in localStorage
- Use HTTP-only cookies for tokens
- Implement proper CORS policies
- Validate all inputs server-side
- Use HTTPS in production

### Performance
- Implement token caching
- Use React Query for data fetching
- Optimize bundle size
- Implement proper loading states

### User Experience
- Provide clear error messages
- Implement progressive enhancement
- Ensure accessibility compliance
- Test across different devices

## Testing

### Frontend Tests
- Unit tests for components
- Integration tests for auth flow
- E2E tests for critical paths
- Accessibility testing

### Backend Tests
- Unit tests for controllers
- Integration tests for endpoints
- Security testing
- Performance testing

## Deployment

### Production Checklist
- [ ] Set secure JWT secrets
- [ ] Configure HTTPS
- [ ] Set up proper CORS
- [ ] Configure email service for password reset
- [ ] Set up monitoring and logging
- [ ] Test all authentication flows
- [ ] Verify security headers

## Troubleshooting

### Common Issues
1. **Token not refreshing**: Check cookie settings
2. **CORS errors**: Verify frontend URL configuration
3. **Password reset not working**: Check email service setup
4. **Role-based access issues**: Verify user role in database

### Debug Mode
Enable debug mode by setting `VITE_ENABLE_DEBUG_MODE=true` to see detailed error messages and API calls.

## Support

For issues or questions about the authentication system:
1. Check the troubleshooting section
2. Review the error logs
3. Test with the provided examples
4. Contact the development team

---

*This authentication system provides a solid foundation for secure, scalable user management in the RMS application.*
