# 🚀 REST API with Node.js + TypeScript + Express + Bun Runtime

API ที่ทันสมัยสร้างด้วย Node.js, TypeScript, Express และ Bun runtime พร้อมระบบยืนยันตัวตนแบบ JWT, การเข้าสู่ระบบผ่าน Google และการจัดเก็บข้อมูลด้วย MongoDB

## ✨ คุณสมบัติเด่น

- 🚀 ใช้ Bun runtime เพื่อประสิทธิภาพที่เหนือกว่า
- 🔐 ระบบยืนยันตัวตนด้วย JWT
- 🔑 รองรับการเข้าสู่ระบบผ่าน Google
- 📦 ฐานข้อมูล MongoDB
- 🛡️ TypeScript เพื่อความปลอดภัยในการเขียนโค้ด
- 🔒 มาพร้อมระบบความปลอดภัยพื้นฐาน
- 📝 เอกสาร API ด้วย Swagger
- 🚦 ระบบจำกัดการเรียก API
- 🔄 ระบบ Refresh token
- 📈 บันทึกการใช้งาน API
- 🛠️ จัดการข้อผิดพลาดอย่างเป็นระบบ
- 🌐 รองรับ CORS
- 🚀 พร้อมสำหรับการ Deploy บน Vercel

## 🔧 สิ่งที่ต้องมี

- Bun runtime (เวอร์ชันล่าสุด)
- Node.js 18+
- ฐานข้อมูล MongoDB
- Google OAuth credentials

## 📥 การติดตั้ง

1. Clone โปรเจค:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. ติดตั้ง Dependencies:

   ```bash
   bun install
   ```

3. สร้างไฟล์ `.env` และกำหนดค่าต่างๆ:

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

## 🏃‍♂️ การใช้งาน

เริ่มต้น Development Server:

```bash
bun run dev
```

## 🏗️ การ Build สำหรับ Production

```bash
bun run build
```

## 🌐 API Endpoints

### 🔐 ระบบยืนยันตัวตน (Authentication)

- 📝 `POST /api/auth/register` - ลงทะเบียนผู้ใช้ใหม่
  - Body: `{ email: string, password: string, name: string }`
  - ผลลัพธ์: `{ user: User }`

- 🔑 `POST /api/auth/login` - เข้าสู่ระบบ
  - Body: `{ email: string, password: string }`
  - ผลลัพธ์: `{ accessToken: string, refreshToken: string }`

- 🔄 `POST /api/auth/refresh-token` - ต่ออายุ Token
  - Body: `{ refreshToken: string }`
  - ผลลัพธ์: `{ accessToken: string, refreshToken: string }`

- 🚪 `POST /api/auth/logout` - ออกจากระบบ
  - Headers: `Authorization: Bearer <token>`

### 👤 จัดการผู้ใช้ (User Management)

- 📱 `GET /api/users/me` - ดูข้อมูลตัวเอง
  - Headers: `Authorization: Bearer <token>`
  - ผลลัพธ์: `User`

- ✏️ `PUT /api/users/me` - แก้ไขข้อมูลตัวเอง
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ name?: string, avatar?: string }`

- 👥 `GET /api/users` - ดูรายชื่อผู้ใช้ทั้งหมด (สำหรับ Admin)
  - Headers: `Authorization: Bearer <token>`

## 👑 การจัดการสิทธิ์ (Role Management)

### การตั้งค่า Admin คนแรก

1. ลงทะเบียนผู้ใช้ใหม่:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your_password",
    "name": "Admin User"
  }'
```

2. เปลี่ยนสิทธิ์เป็น Admin ผ่าน MongoDB Shell:

```javascript
use your_database_name
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### 🎭 ประเภทของสิทธิ์

- 👤 `user`: สิทธิ์พื้นฐาน
  - ดูและแก้ไขข้อมูลตัวเอง
  - ใช้งานระบบยืนยันตัวตน

- 👑 `admin`: สิทธิ์ทั้งหมด
  - ดูรายชื่อผู้ใช้ทั้งหมด
  - จัดการสิทธิ์ของผู้ใช้
  - เข้าถึงฟีเจอร์พิเศษ

## 🔒 ความปลอดภัย

- 🔑 ยืนยันตัวตนด้วย JWT
- 🔐 เข้ารหัสรหัสผ่านด้วย bcrypt
- 🚦 จำกัดการเรียก API
- 🛡️ ป้องกัน CORS
- 🔰 Headers ความปลอดภัยด้วย Helmet
- ✅ ตรวจสอบข้อมูลนำเข้า
- 🛡️ ป้องกัน XSS

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

## Role Management

### Setting up First Admin User

1. Register a new user through the API:

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your_password",
    "name": "Admin User"
  }'
```

2. Use MongoDB Shell to promote the user to admin:

```javascript
use your_database_name
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

### Managing User Roles via API

After having an admin account, you can manage other users' roles through the API:

```bash
# Update user role (Admin only)
PATCH /api/users/{userId}/role
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "role": "admin"  # or "user"
}
```

### Role Types

- `user`: Default role, limited access
- `admin`: Full access, can:
  - View all users
  - Manage user roles
  - Access admin-only endpoints

### Role-based Access Control

- Regular users can only:
  - View their own profile
  - Update their own profile
  - Use authentication endpoints

- Admin users can additionally:
  - View all users (`GET /api/users`)
  - Change user roles (`PATCH /api/users/{userId}/role`)
  - Access future admin-only features
