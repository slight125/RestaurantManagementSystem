# 🚀 Quick Reference Card

## Development Commands

### Backend
```bash
cd backend
pnpm install          # Install dependencies
pnpm run init-db      # Initialize database
pnpm run dev          # Start dev server (port 5000)
```

### Frontend
```bash
cd frontend
pnpm install          # Install dependencies
pnpm run dev          # Start dev server (port 5173)
pnpm run build        # Build for production
pnpm run preview      # Preview production build
```

## URLs

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **API Docs:** http://localhost:5000/api

## Login Credentials

### Admin
```
Email: admin@restaurant.com
Password: admin123
```

### Customer
```
Email: john@example.com
Password: admin123
```

## API Endpoints Quick Reference

### Authentication
- `POST /api/login` - Login
- `POST /api/register` - Register

### Menu
- `GET /api/meals` - Get all meals
- `POST /api/meals` - Add meal (admin)
- `DELETE /api/meals/:id` - Delete meal (admin)

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order
- `PATCH /api/orders/:id` - Update order status (admin)

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/:id` - Get restaurant by ID

### Users
- `GET /api/users` - Get all users (admin)
- `PUT /api/users/:id` - Update user (admin)

### Drivers
- `GET /api/drivers` - Get all drivers
- `POST /api/drivers` - Add driver (admin)

### Cities
- `GET /api/cities` - Get all cities
- `POST /api/cities` - Add city (admin)

## Project Structure

```
frontend/src/
├── components/       # Reusable UI components
├── context/          # Auth & Cart contexts
├── pages/            # Page components
│   └── admin/       # Admin pages
├── services/         # API integration (api.ts)
├── types/            # TypeScript types
└── App.tsx           # Main app with routes
```

## Common Tasks

### Add a New Menu Item (Admin)
1. Login as admin
2. Go to "Admin Dashboard"
3. Click "Manage Menu"
4. Click "Add New Meal"
5. Fill form and submit

### Place an Order (Customer)
1. Login or register
2. Browse menu
3. Click "Add to Cart"
4. Go to cart
5. Enter delivery address
6. Click "Proceed to Checkout"

### Update Order Status (Admin)
1. Login as admin
2. Go to "Manage Orders"
3. Select new status from dropdown
4. Status updates automatically

## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:pass@localhost:5432/restaurant_db
JWT_SECRET=your_secret_key
PORT=5000
```

### Frontend (Optional)
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Troubleshooting

### Backend won't start
- ✅ Check PostgreSQL is running
- ✅ Verify DATABASE_URL in .env
- ✅ Run `pnpm run init-db`

### Frontend API errors
- ✅ Ensure backend is running
- ✅ Check CORS settings
- ✅ Verify API base URL

### Database errors
- ✅ Create database: `createdb restaurant_db`
- ✅ Run init script: `pnpm run init-db`
- ✅ Check connection string

## Tech Stack

**Frontend:**
- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

**Backend:**
- Node.js
- Express
- TypeScript
- PostgreSQL
- JWT
- bcryptjs

## File Locations

### Important Files
- `backend/src/index.ts` - Backend entry
- `backend/src/db/schema.sql` - Database schema
- `frontend/src/App.tsx` - Frontend routes
- `frontend/src/services/api.ts` - API calls
- `frontend/tailwind.config.js` - Theme config

### Configuration
- `backend/.env` - Backend environment
- `frontend/vite.config.ts` - Vite config
- `backend/tsconfig.json` - TS config (backend)
- `frontend/tsconfig.json` - TS config (frontend)

## Database Schema

**Main Tables:**
- users (id, full_name, email, password, user_type)
- restaurants (id, name, location, cuisine, rating)
- menu_items (id, name, price, description, image)
- orders (id, user_id, total, status, delivery_address)
- order_items (id, order_id, menu_item_id, quantity)
- drivers (id, name, status, location, rating)
- cities (id, name, state, country)
- comments (id, user_id, restaurant_id, rating, comment)

## Order Statuses
- Pending
- Confirmed
- Preparing
- Out for Delivery
- Delivered
- Cancelled

## User Types
- customer
- admin
- driver
- restaurant_owner

---

**Keep this card handy for quick reference! 📌**
