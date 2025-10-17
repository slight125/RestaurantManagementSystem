# 🍽️ TamuEats - Restaurant Management System

A full-stack restaurant management and food delivery platform built with React, TypeScript, Node.js, Express, and PostgreSQL.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Default Credentials](#default-credentials)

## ✨ Features

### Customer Features
- 🏠 Browse restaurants with ratings and locations
- 🍕 View comprehensive menu with prices and descriptions
- 🛒 Shopping cart with quantity management
- 📦 Place orders with delivery address
- 👤 User registration and authentication
- 💳 Order tracking

### Admin Features
- 📊 Dashboard with real-time statistics
- 🍽️ Complete menu management (Add, Edit, Delete)
- 📦 Order management with status updates
- 🏪 Restaurant management
- 👥 User management
- 🚗 Driver management
- 🏙️ City management
- 📈 Analytics and reporting

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS
- **Context API** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin support

## 📁 Project Structure

```
New folder (2)/
├── backend/                 # Backend server
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── db/            # Database config
│   │   │   ├── db.ts      # PostgreSQL connection
│   │   │   ├── init.ts    # Database initialization
│   │   │   └── schema.sql # Database schema
│   │   ├── types/         # TypeScript types
│   │   └── index.ts       # Entry point
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/               # Frontend application
    ├── src/
    │   ├── components/    # Reusable components
    │   ├── context/       # React contexts
    │   ├── pages/         # Page components
    │   │   ├── admin/    # Admin pages
    │   │   ├── Home.tsx
    │   │   ├── Login.tsx
    │   │   ├── Register.tsx
    │   │   ├── Menu.tsx
    │   │   └── Cart.tsx
    │   ├── services/      # API services
    │   ├── types/         # TypeScript types
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    └── vite.config.ts
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v12 or higher)
- pnpm (recommended) or npm

### 1. Database Setup

```bash
# Create PostgreSQL database
createdb restaurant_db

# Or using psql
psql -U postgres
CREATE DATABASE restaurant_db;
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
pnpm install

# Create .env file
# Add the following variables:
DATABASE_URL=postgresql://username:password@localhost:5432/restaurant_db
JWT_SECRET=your_secret_key_here
PORT=5000

# Initialize database (creates tables and seed data)
pnpm run init-db

# Start backend server
pnpm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
pnpm install

# Start frontend development server
pnpm run dev
```

Frontend will run on `http://localhost:5173`

## 🔐 Default Credentials

### Admin Account
```
Email: admin@restaurant.com
Password: admin123
```

### Customer Accounts
```
Email: john@example.com
Password: admin123

Email: jane@example.com
Password: admin123
```

## 📡 API Documentation

### Authentication Endpoints

#### Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "admin@restaurant.com",
  "password": "admin123"
}
```

#### Register
```http
POST /api/register
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "contact_phone": "+254700000000",
  "user_type": "customer"
}
```

### Menu Endpoints

#### Get All Meals
```http
GET /api/meals
```

#### Add Meal
```http
POST /api/meals
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "Chicken Biryani",
  "description": "Aromatic rice with chicken",
  "price": 450,
  "image": "https://example.com/image.jpg",
  "ingredients": "Chicken, Rice, Spices",
  "restaurant_id": 1
}
```

#### Delete Meal
```http
DELETE /api/meals/:id
Authorization: Bearer <token>
```

### Order Endpoints

#### Get All Orders
```http
GET /api/orders
Authorization: Bearer <token>
```

#### Create Order
```http
POST /api/orders
Content-Type: application/json
Authorization: Bearer <token>

{
  "user_id": 1,
  "total": 1500,
  "delivery_address": "123 Main St, Nairobi",
  "status": "Pending",
  "items": [
    {
      "menu_item_id": 1,
      "quantity": 2,
      "price": 450,
      "subtotal": 900
    }
  ]
}
```

#### Update Order Status
```http
PATCH /api/orders/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "status": "Confirmed"
}
```

### Restaurant Endpoints

#### Get All Restaurants
```http
GET /api/restaurants
```

#### Get Restaurant by ID
```http
GET /api/restaurants/:id
```

### Other Endpoints

- `GET /api/users` - Get all users
- `GET /api/drivers` - Get all drivers
- `GET /api/cities` - Get all cities
- `GET /api/comments` - Get all comments
- `GET /api/analytics/stats` - Get analytics stats

## 🎨 Features Breakdown

### Customer Experience
1. **Home Page** - Hero section with featured restaurants
2. **Restaurant Listing** - Browse all available restaurants
3. **Menu** - View all menu items with filtering
4. **Shopping Cart** - Add items, adjust quantities, checkout
5. **Order Placement** - Enter delivery details and confirm order

### Admin Panel
1. **Dashboard** - Overview with key metrics
2. **Order Management** - View and update order statuses
3. **Menu Management** - CRUD operations for menu items
4. **Restaurant Management** - View restaurant details
5. **User Management** - View and manage users
6. **Driver Management** - Manage delivery drivers
7. **City Management** - Manage service locations

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes
- Role-based access control
- SQL injection prevention with parameterized queries
- CORS configuration

## 🎯 Key Technologies Explained

### Frontend Architecture
- **Context API** for global state (Auth, Cart)
- **Protected Routes** for authentication
- **Axios Interceptors** for token management
- **Responsive Design** with Tailwind CSS

### Backend Architecture
- **MVC Pattern** - Controllers, Routes, Models
- **PostgreSQL** with connection pooling
- **JWT Tokens** with 24-hour expiration
- **RESTful API** design

## 📱 Responsive Design

The application is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1280px+)

## 🧪 Testing

```bash
# Backend tests (if implemented)
cd backend
pnpm test

# Frontend tests (if implemented)
cd frontend
pnpm test
```

## 📦 Building for Production

### Backend
```bash
cd backend
pnpm run build
pnpm start
```

### Frontend
```bash
cd frontend
pnpm run build
# Output will be in dist/ folder
```

## 🚀 Deployment

### Backend Deployment Options
- Heroku
- Railway
- Render
- AWS EC2
- DigitalOcean

### Frontend Deployment Options
- Vercel (recommended)
- Netlify
- AWS S3 + CloudFront
- GitHub Pages

### Database Hosting
- ElephantSQL
- Heroku Postgres
- AWS RDS
- Supabase

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- React and Vite teams
- Tailwind CSS
- PostgreSQL community
- Express.js community

## 📞 Support

For support, email support@tamueats.com or create an issue in the repository.

---

**Made with ❤️ in Kenya**
