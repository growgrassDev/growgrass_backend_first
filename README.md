# 🚀 REST API with Node.js + TypeScript + Express + Bun Runtime

API ที่ทันสมัยสร้างด้วย Node.js, TypeScript, Express และ Bun runtime พร้อมระบบยืนยันตัวตนแบบ JWT, การเข้าสู่ระบบผ่าน Google และการจัดเก็บข้อมูลด้วย MongoDB

## ✨ คุณสมบัติเด่น

- 🚀 ใช้ Bun runtime เพื่อประสิทธิภาพที่เหนือกว่า
- 🔐 ระบบยืนยันตัวตนด้วย JWT
- 🔑 รองรับการเข้าสู่ระบบผ่าน Google
- 📦 ฐานข้อมูล MongoDB
- 🛡️ TypeScript เพื่อความปลอดภัยในการเขียนโค้ด
- 🔒 มาพร้อมระบบความปลอดภัยพื้นฐาน
- 📝 เอกสาร API ด้วย Swagger (เฉพาะโหมด Development)
- 🚦 ระบบจำกัดการเรียก API
- 🔄 ระบบ Refresh token
- 📈 บันทึกการใช้งาน API แบบละเอียด
- 🛠️ จัดการข้อผิดพลาดอย่างเป็นระบบ
- 🌐 รองรับ CORS
- 🚀 พร้อมสำหรับการ Deploy บน Vercel

## 🔧 สิ่งที่ต้องมี

- Bun runtime (เวอร์ชันล่าสุด)
- Node.js 18+
- ฐานข้อมูล MongoDB
- Google OAuth credentials (ถ้าต้องการใช้ Google Login)

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

3. สร้างไฟล์ `.env` จาก `.env.example` และกำหนดค่าต่างๆ:

   ```env
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   JWT_EXPIRES_IN=1h
   JWT_REFRESH_EXPIRES_IN=7d
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback
   CORS_ORIGIN=http://localhost:3000
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX=100
   ```

## 🏃‍♂️ การใช้งาน

### Development Mode

```bash
bun run dev
```

- API Documentation จะอยู่ที่ `http://localhost:3000/api-docs`
- Swagger UI จะใช้ได้เฉพาะใน Development Mode เท่านั้น

### Production Mode

```bash
bun run build
bun run start
```

## 🌐 API Endpoints

### 🔐 ระบบยืนยันตัวตน (Authentication)

- 📝 `POST /api/auth/register` - ลงทะเบียนผู้ใช้ใหม่

  ```typescript
  Body: {
    email: string;    // อีเมล
    password: string; // รหัสผ่าน (อย่างน้อย 6 ตัวอักษร)
    name: string;     // ชื่อผู้ใช้
  }
  ```

- 🔑 `POST /api/auth/login` - เข้าสู่ระบบ

  ```typescript
  Body: {
    email: string;    // อีเมล
    password: string; // รหัสผ่าน
  }
  ```

- 🔄 `POST /api/auth/refresh-token` - ต่ออายุ Token

  ```typescript
  Body: {
    refreshToken: string; // Refresh token
  }
  ```

### 👤 จัดการผู้ใช้ (User Management)

- 📱 `GET /api/users/me` - ดูข้อมูลตัวเอง
  - Headers: `Authorization: Bearer <token>`

- ✏️ `PUT /api/users/me` - แก้ไขข้อมูลตัวเอง

  ```typescript
  Headers: Authorization: Bearer <token>
  Body: {
    name?: string;   // ชื่อใหม่ (ไม่บังคับ)
    avatar?: string; // URL รูปโปรไฟล์ (ไม่บังคับ)
  }
  ```

### 📝 จัดการโพสต์ (Post Management)

- 📝 `POST /api/posts` - สร้างโพสต์ใหม่

  ```typescript
  Headers: Authorization: Bearer <token>
  Body: {
    title: string;   // หัวข้อโพสต์
    content: string; // เนื้อหาโพสต์
  }
  ```

- 📚 `GET /api/posts` - ดูโพสต์ทั้งหมด

- 📖 `GET /api/posts/{postId}` - ดูรายละเอียดโพสต์

- ✏️ `PUT /api/posts/{postId}` - แก้ไขโพสต์ (เจ้าของโพสต์เท่านั้น)

  ```typescript
  Headers: Authorization: Bearer <token>
  Body: {
    title?: string;   // หัวข้อใหม่ (ไม่บังคับ)
    content?: string; // เนื้อหาใหม่ (ไม่บังคับ)
  }
  ```

## 🔒 ระบบความปลอดภัย

- 🛡️ การป้องกันพื้นฐาน:
  - CORS protection
  - Helmet security headers
  - Rate limiting
  - JWT authentication
  - Password hashing (bcrypt)

- 📝 Validation:
  - Zod schema validation
  - Strong typing with TypeScript
  - Input sanitization

- 🚫 Error Handling:
  - Structured error responses
  - Detailed error logging (Development)
  - Clean error messages (Production)

## 🛠️ Development Tools

- TypeScript
- ESLint
- Prettier
- Swagger UI (Development only)
- Pino Logger

## 🚀 Deployment

1. Build โปรเจค:

```bash
bun run build
```

2. Deploy ไปที่ Vercel:

```bash
vercel
```

## 📝 Environment Variables

สร้างไฟล์ `.env` โดยใช้ `.env.example` เป็นต้นแบบ:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_uri

# JWT
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# Security
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

## 🤝 Contributing

1. Fork repository
2. สร้าง feature branch
3. Commit การเปลี่ยนแปลง
4. Push ไปที่ branch
5. สร้าง Pull Request

## 📄 License

This project is licensed under the ISC License.
