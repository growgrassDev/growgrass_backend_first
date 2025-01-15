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
   npm i -g vercel
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
- POST `/api/auth/login` - Login user
- GET `/api/auth/google` - Google OAuth login
- GET `/api/auth/google/callback` - Google OAuth callback
- POST `/api/auth/refresh-token` - Refresh access token
- POST `/api/auth/logout` - Logout user

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
