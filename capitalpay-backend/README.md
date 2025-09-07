# CapitalPay Backend API

A comprehensive Node.js backend API for CapitalPay with user management, JWT authentication, blog post management, and contact form handling.

## Features

- 🔐 **JWT Authentication** - Secure user authentication with JSON Web Tokens
- 👥 **User Management** - Complete user CRUD operations with role-based access
- 📝 **Blog Management** - Full blog post system with categories, tags, and search
- 📧 **Contact Form** - Contact message handling with status tracking
- 🛡️ **Security** - Rate limiting, CORS, helmet, input validation
- 📊 **Analytics** - Statistics and reporting for admin users
- 🔍 **Search** - Full-text search for blog posts and contact messages

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** express-validator
- **Security:** helmet, cors, express-rate-limit
- **Password Hashing:** bcryptjs

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd capitalpay-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   ```bash
   cp config.env.example config.env
   ```

   Edit `config.env` with your configuration:

   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/capitalpay
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=7d
   ADMIN_EMAIL=admin@capitalpay.com
   ADMIN_PASSWORD=admin123
   ```

4. **Start the server**

   ```bash
   # Development mode with nodemon
   npm run dev

   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint           | Description         | Access  |
| ------ | ------------------ | ------------------- | ------- |
| POST   | `/register`        | Register new user   | Public  |
| POST   | `/login`           | Login user          | Public  |
| GET    | `/me`              | Get current user    | Private |
| PUT    | `/profile`         | Update user profile | Private |
| PUT    | `/change-password` | Change password     | Private |
| POST   | `/logout`          | Logout user         | Private |

### User Management Routes (`/api/users`)

| Method | Endpoint             | Description         | Access |
| ------ | -------------------- | ------------------- | ------ |
| GET    | `/`                  | Get all users       | Admin  |
| GET    | `/stats`             | Get user statistics | Admin  |
| GET    | `/:id`               | Get single user     | Admin  |
| PUT    | `/:id`               | Update user         | Admin  |
| DELETE | `/:id`               | Delete user         | Admin  |
| PATCH  | `/:id/toggle-status` | Toggle user status  | Admin  |
| PATCH  | `/:id/role`          | Change user role    | Admin  |

### Blog Routes (`/api/blogs`)

| Method | Endpoint        | Description                      | Access                 |
| ------ | --------------- | -------------------------------- | ---------------------- |
| GET    | `/`             | Get published blogs              | Public                 |
| GET    | `/featured`     | Get featured blogs               | Public                 |
| GET    | `/categories`   | Get blog categories              | Public                 |
| GET    | `/:slug`        | Get single blog by slug          | Public                 |
| POST   | `/`             | Create new blog                  | Admin/Moderator        |
| PUT    | `/:id`          | Update blog                      | Admin/Moderator/Author |
| DELETE | `/:id`          | Delete blog                      | Admin/Moderator/Author |
| GET    | `/admin/all`    | Get all blogs (including drafts) | Admin                  |
| PATCH  | `/:id/featured` | Toggle featured status           | Admin                  |

### Contact Routes (`/api/contact`)

| Method | Endpoint          | Description            | Access          |
| ------ | ----------------- | ---------------------- | --------------- |
| POST   | `/`               | Submit contact message | Public          |
| GET    | `/`               | Get all messages       | Admin/Moderator |
| GET    | `/stats`          | Get message statistics | Admin/Moderator |
| GET    | `/:id`            | Get single message     | Admin/Moderator |
| PATCH  | `/:id/status`     | Update message status  | Admin/Moderator |
| POST   | `/:id/notes`      | Add note to message    | Admin/Moderator |
| DELETE | `/:id`            | Delete message         | Admin           |
| PATCH  | `/bulk/mark-read` | Mark multiple as read  | Admin/Moderator |

## Data Models

### User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: ['user', 'admin', 'moderator'],
  avatar: String,
  isActive: Boolean,
  lastLogin: Date,
  timestamps: true
}
```

### Blog Post Model

```javascript
{
  title: String,
  slug: String (auto-generated),
  excerpt: String,
  content: String,
  featuredImage: String,
  category: ['FINANCE', 'TECHNOLOGY', 'BUSINESS', 'NEWS', 'TUTORIAL'],
  tags: [String],
  author: ObjectId (ref: User),
  status: ['draft', 'published', 'archived'],
  featured: Boolean,
  views: Number,
  readTime: Number (auto-calculated),
  publishedAt: Date,
  timestamps: true
}
```

### Contact Message Model

```javascript
{
  name: String,
  email: String,
  company: String,
  subject: String,
  message: String,
  status: ['new', 'read', 'replied', 'resolved', 'spam'],
  priority: ['low', 'medium', 'high', 'urgent'],
  assignedTo: ObjectId (ref: User),
  notes: [{
    content: String,
    addedBy: ObjectId (ref: User),
    addedAt: Date
  }],
  timestamps: true
}
```

## Authentication

This API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Error Handling

The API returns consistent error responses:

```javascript
{
  "success": false,
  "message": "Error message",
  "errors": [] // Validation errors (if any)
}
```

## Rate Limiting

API requests are limited to 100 requests per 15 minutes per IP address.

## Security Features

- **Password Hashing:** bcryptjs with salt rounds of 12
- **JWT Security:** Configurable expiration and secret
- **Input Validation:** Comprehensive validation using express-validator
- **Rate Limiting:** Protection against brute force attacks
- **CORS:** Configurable cross-origin resource sharing
- **Helmet:** Security headers protection

## Development

### Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests (Jest)
```

### Environment Variables

| Variable         | Description               | Default                              |
| ---------------- | ------------------------- | ------------------------------------ |
| `PORT`           | Server port               | 5000                                 |
| `NODE_ENV`       | Environment               | development                          |
| `MONGODB_URI`    | MongoDB connection string | mongodb://localhost:27017/capitalpay |
| `JWT_SECRET`     | JWT signing secret        | -                                    |
| `JWT_EXPIRE`     | JWT expiration time       | 7d                                   |
| `ADMIN_EMAIL`    | Default admin email       | admin@capitalpay.com                 |
| `ADMIN_PASSWORD` | Default admin password    | admin123                             |

## Default Admin Account

On first run, you can create an admin account using:

- Email: admin@capitalpay.com
- Password: admin123

**⚠️ Important:** Change the default admin credentials in production!

## API Testing

You can test the API using tools like:

- **Postman:** Import the API collection
- **curl:** Command line HTTP client
- **Thunder Client:** VS Code extension

### Example Requests

**Register User:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

**Get Blogs:**

```bash
curl -X GET http://localhost:5000/api/blogs
```

**Submit Contact Form:**

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","subject":"Question","message":"Hello, I have a question..."}'
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@capitalpay.com or create an issue in the repository.
