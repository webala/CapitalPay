# CapitalPay Admin Dashboard

A comprehensive React-based admin dashboard for managing CapitalPay's users, blog posts, and contact messages with secure JWT authentication.

## Features

- 🔐 **Secure Authentication** - JWT-based login with role-based access control
- 👥 **User Management** - Complete CRUD operations for user accounts (Admin only)
- 📧 **Message Management** - View, respond to, and manage contact form messages
- 📝 **Blog Management** - Create, edit, publish, and manage blog posts
- 📊 **Dashboard Overview** - Real-time statistics and system status
- 🎨 **Modern UI** - Beautiful, responsive interface with dark theme
- 🔒 **Role-Based Access** - Different permissions for Admin and Moderator roles

## Access the Dashboard

Navigate to: `http://localhost:3000/admin`

### Demo Credentials

**Admin Account:**

- Email: `admin@capitalpay.com`
- Password: `admin123`

**Moderator Account:**

- Email: `sarah@capitalpay.com`
- Password: `password123`

## Dashboard Sections

### 1. Overview

- Real-time statistics
- Quick actions
- Recent activity
- System status

### 2. User Management (Admin Only)

- View all users
- User statistics
- Activate/deactivate accounts
- Change user roles
- Delete users (with safety checks)
- Search and filter users

### 3. Message Management

- View contact messages
- Message statistics
- Update message status (new, read, replied, resolved)
- Add internal notes
- Search and filter messages
- Bulk operations

### 4. Blog Management

- Create new blog posts
- Edit existing posts
- Manage post status (draft, published, archived)
- Feature/unfeature posts
- View blog statistics
- Search and filter posts
- Rich content editor

### 5. Settings (Admin Only)

- Account information
- System information
- Logout functionality

## User Roles

### Admin

- Full access to all dashboard features
- User management capabilities
- Can delete users and posts
- System settings access

### Moderator

- Access to blog management
- Access to message management
- Cannot manage users
- Limited system access

### User

- No dashboard access
- Regular user account only

## API Integration

The dashboard integrates with the CapitalPay backend API:

### Endpoints Used

- `POST /api/auth/login` - Authentication
- `GET /api/auth/me` - Get current user
- `GET /api/users/*` - User management (Admin only)
- `GET /api/contact/*` - Message management
- `GET /api/blogs/*` - Blog management
- Various CRUD operations for each resource

### Environment Configuration

Create a `.env` file in the frontend root:

```env
VITE_API_URL=http://localhost:5000/api
```

## Security Features

### Authentication

- JWT token-based authentication
- Automatic token validation
- Secure token storage in localStorage
- Auto-logout on token expiration

### Authorization

- Role-based access control
- Route protection
- Component-level permissions
- API endpoint security

### Data Protection

- Input validation
- XSS protection
- CSRF protection
- Secure API communication

## UI Components

### Layout

- Responsive sidebar navigation
- Mobile-friendly design
- Dark theme with gradient backgrounds
- Modern card-based layout

### Interactive Elements

- Modal dialogs for forms
- Dropdown menus for actions
- Search and filter controls
- Pagination for large datasets

### Feedback

- Loading states
- Success/error messages
- Confirmation dialogs
- Real-time updates

## Development

### Prerequisites

- Node.js 16+
- React 18+
- TypeScript
- Tailwind CSS
- Shadcn/ui components

### Setup

1. Ensure the backend server is running on `http://localhost:5000`
2. Start the frontend development server
3. Navigate to `/admin` route
4. Login with admin credentials

### File Structure

```
src/
├── components/admin/
│   ├── AdminDashboard.tsx      # Main dashboard component
│   ├── LoginModal.tsx          # Authentication modal
│   ├── DashboardLayout.tsx     # Layout with sidebar
│   └── sections/
│       ├── DashboardOverview.tsx    # Overview section
│       ├── UserManagement.tsx       # User management
│       ├── MessageManagement.tsx    # Message management
│       └── BlogManagement.tsx       # Blog management
├── contexts/
│   └── AuthContext.tsx         # Authentication context
└── pages/
    └── AdminDashboard.tsx      # Dashboard page route
```

## Usage Examples

### Accessing the Dashboard

1. Go to `http://localhost:3000/admin`
2. Click "Access Dashboard"
3. Enter admin credentials
4. Navigate through different sections

### Managing Users (Admin)

1. Click "User Management" in sidebar
2. View user statistics
3. Search/filter users
4. Use dropdown menu for user actions
5. Activate/deactivate or change roles

### Managing Messages

1. Click "Messages" in sidebar
2. View message statistics
3. Click on message to view details
4. Update status or add notes
5. Use filters to find specific messages

### Managing Blogs

1. Click "Blog Posts" in sidebar
2. View blog statistics
3. Click "New Post" to create
4. Use edit dropdown for existing posts
5. Toggle featured status or delete

## Troubleshooting

### Common Issues

**Login Issues:**

- Ensure backend server is running
- Check API URL in environment variables
- Verify admin credentials

**Permission Errors:**

- Ensure user has admin/moderator role
- Check JWT token validity
- Verify API authentication headers

**Data Not Loading:**

- Check network requests in browser dev tools
- Verify backend API endpoints are working
- Check CORS configuration

### Debug Mode

Enable debug logging by setting:

```javascript
localStorage.setItem("debug", "true");
```

## Production Deployment

### Environment Variables

```env
VITE_API_URL=https://api.capitalpay.com/api
```

### Security Considerations

- Use HTTPS in production
- Implement proper CORS policies
- Set secure JWT expiration times
- Enable rate limiting
- Use strong admin passwords

### Performance Optimization

- Enable React production build
- Implement code splitting
- Use CDN for static assets
- Enable gzip compression
- Optimize API calls with caching

## Support

For technical support or questions about the admin dashboard:

- Check the backend API documentation
- Review component error boundaries
- Check browser console for errors
- Verify network connectivity to backend

The dashboard is designed to be intuitive and user-friendly while providing powerful administrative capabilities for managing the CapitalPay platform.
