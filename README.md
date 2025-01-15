# REST API with Node.js + TypeScript + Express + Bun Runtime

A modern REST API built with Node.js, TypeScript, Express, and Bun runtime, featuring JWT authentication, Google OAuth2, and MongoDB integration.

## Features

- 🚀 Built with Bun runtime for superior performance
- 🔐 JWT Authentication
- 🔑 Google OAuth2 Integration
- 📦 MongoDB Database
- 🛡️ TypeScript for type safety
- 🔒 Secure by default with various security middlewares
- 📝 API Documentation with Swagger
- 🚦 Request validation with Zod
- 🔄 Refresh token mechanism
- 📈 Rate limiting
- 🛠️ Error handling middleware
- 🌐 CORS enabled
- 🚀 Ready for Vercel deployment

## Prerequisites

- Bun runtime (latest version)
- Node.js 18+
- MongoDB database
- Google OAuth credentials

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
   ```

## Development

Start the development server:

```bash
bun run dev
```

## Building for Production

Build the project:

```bash
bun run build
```

## Deployment to Vercel

1. Install Vercel CLI:

   ```bash
   bun i -g vercel
   ```

2. Deploy to Vercel:

   ```bash
   vercel
   ```

## API Documentation

Once the server is running, you can access the Swagger documentation at:

```http://localhost:3000/api-docs```

## API Endpoints

### Authentication

- POST `/api/auth/register` - Register a new user
  - Body: `{ email: string, password: string, name: string }`
  - Response: `{ user: User }`

- POST `/api/auth/login` - Login user
  - Body: `{ email: string, password: string }`
  - Response: `{ accessToken: string, refreshToken: string }`

- GET `/api/auth/google` - Initiate Google OAuth login
  - Redirects to Google login page

- GET `/api/auth/google/callback` - Google OAuth callback
  - Handles OAuth response
  - Redirects to frontend with tokens

- POST `/api/auth/refresh-token` - Refresh access token
  - Body: `{ refreshToken: string }`
  - Response: `{ accessToken: string, refreshToken: string }`

- POST `/api/auth/logout` - Logout user
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ message: string }`

### User Management

- GET `/api/users/me` - Get current user profile
  - Headers: `Authorization: Bearer <token>`
  - Response: `User`

- PUT `/api/users/me` - Update current user profile
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ name?: string, avatar?: string }`
  - Response: `User`

- GET `/api/users` - Get all users (Admin only)
  - Headers: `Authorization: Bearer <token>`
  - Response: `User[]`

### System

- GET `/api` - Welcome message
  - Response: `{ status: string, message: string, version: string, docs: string }`

- GET `/api/health` - Health check
  - Response: `{ status: string, message: string, timestamp: string }`

## Security

This project implements several security measures:

- JWT token authentication
- Password hashing
- Rate limiting
- CORS protection
- Helmet security headers
- Input validation
- XSS protection

## Testing

Run tests:

```bash
bun test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the ISC License.

# Backend API

## Project Architecture

This project follows **Clean Architecture** principles with the following layer structure:

### 1. Presentation Layer (External)

- `/routes` - API endpoints and routing
- `/controllers` - Request/response handlers

### 2. Application Layer (Business Logic)

- `/services` - Core business logic implementation
- `/middleware` - Cross-cutting concerns (auth, validation, etc.)

### 3. Domain Layer (Core)

- `/models` - Business entities and database models
- `/types` - TypeScript type definitions

### 4. Infrastructure Layer (External)

- `/config` - Application configuration
- `/utils` - Utility functions and helpers

### Data Flow

```Request → Routes → Controllers → Services → Models → Database```

### Key Benefits

- ✅ Clear separation of concerns
- ✅ Highly testable architecture
- ✅ Easy maintenance
- ✅ Scalable structure
- ✅ Suitable for small to medium teams
- ✅ Flexible for future changes

## Getting Started

1. Install dependencies:

```bash
bun install
```

2. Copy `.env.example` to `.env` and configure environment variables

3. Start development server:

```bash
bun run dev
```

## API Documentation

Access Swagger documentation at `/api-docs` when server is running.

## Models

### User

```typescript
{
  _id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
  googleId?: string;
}
```

## Authentication

All protected endpoints require a valid JWT token in the Authorization header:

```Authorization: Bearer <token>```

## Error Responses

```typescript
{
  status: 'error';
  message: string;
  stack?: string; // Only in development
}
```

Common HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Database Schema

### User Collection

```typescript
{
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true, // ยกเว้นเมื่อใช้ Google OAuth
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true
  },
  avatar: {
    type: String,
    optional: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  refreshToken: {
    type: String,
    optional: true
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Security Features

- Passwords are hashed using bcrypt
- JWT tokens for authentication
- Refresh token rotation
- Google OAuth2 integration
- Role-based access control (user/admin)

## Database Setup

1. Install MongoDB locally or use MongoDB Atlas
2. Set your MongoDB URI in `.env`:

```env
MONGODB_URI=mongodb://localhost:27017/your_database
```

3. The application will automatically:
   - Connect to MongoDB on startup
   - Create necessary indexes
   - Handle connection errors

## Data Flow

### Authentication Flow

1. Registration:
   - Validate user input
   - Hash password
   - Save to MongoDB
   - Return user data (without password)

2. Login:
   - Find user in MongoDB by email
   - Verify password hash
   - Generate JWT tokens
   - Update refresh token in database
   - Return tokens

3. Google OAuth:
   - Receive Google profile
   - Find or create user in MongoDB
   - Generate JWT tokens
   - Return tokens
