# TamuEats Setup Guide

## Quick Start Instructions

Follow these steps to get your Restaurant Management System up and running:

### Step 1: Database Setup

1. Make sure PostgreSQL is installed and running
2. Create a new database:
   ```bash
   createdb restaurant_db
   ```

### Step 2: Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file in the backend folder with:
   ```
   DATABASE_URL=postgresql://your_username:your_password@localhost:5432/restaurant_db
   JWT_SECRET=your_secret_key_here_change_this_in_production
   PORT=5000
   ```

4. Initialize the database (creates tables and adds sample data):
   ```bash
   pnpm run init-db
   ```

5. Start the backend server:
   ```bash
   pnpm run dev
   ```

   Backend should now be running at `http://localhost:5000`

### Step 3: Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already done):
   ```bash
   pnpm install
   ```

3. Start the frontend development server:
   ```bash
   pnpm run dev
   ```

   Frontend should now be running at `http://localhost:5173`

### Step 4: Access the Application

1. Open your browser and go to: `http://localhost:5173`

2. Log in with the default admin credentials:
   - **Email:** admin@restaurant.com
   - **Password:** admin123

3. Or register a new customer account

## Testing the Application

### As a Customer:
1. Browse restaurants and menu items
2. Add items to your cart
3. Place an order with a delivery address
4. View your cart and checkout

### As an Admin:
1. Log in with admin credentials
2. Access the Admin Dashboard
3. Manage menu items (add, delete)
4. View and update order statuses
5. View all restaurants, users, and drivers

## Troubleshooting

### Backend Issues

**Database Connection Error:**
- Verify PostgreSQL is running
- Check DATABASE_URL in .env file
- Ensure database exists

**Port Already in Use:**
- Change PORT in .env file
- Or stop the process using port 5000

### Frontend Issues

**API Connection Error:**
- Ensure backend is running on port 5000
- Check browser console for errors
- Verify API base URL in frontend/src/services/api.ts

**Port 5173 Already in Use:**
- Vite will automatically try the next available port
- Or stop the process using port 5173

### Common Issues

**Module Not Found:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**TypeScript Errors:**
- Most TypeScript errors are warnings and won't prevent the app from running
- Check tsconfig.json if you want to adjust strict mode

## Sample Data

The database initialization script creates:
- 3 sample users (1 admin, 2 customers)
- 3 restaurants
- 4 drivers
- 8 cities

You can add more data through the admin panel or directly in the database.

## Next Steps

- Customize the theme colors in `frontend/tailwind.config.js`
- Add more menu items through the admin panel
- Configure email notifications (requires additional setup)
- Set up payment gateway integration
- Deploy to production

## Need Help?

- Check the PROJECT_README.md for detailed documentation
- Review the API documentation section
- Check browser console and terminal for error messages

## Production Deployment Checklist

Before deploying to production:

1. ✅ Change JWT_SECRET to a strong random string
2. ✅ Update DATABASE_URL to production database
3. ✅ Set NODE_ENV=production
4. ✅ Build frontend: `pnpm run build`
5. ✅ Configure CORS for production domain
6. ✅ Set up SSL/HTTPS
7. ✅ Configure environment variables on hosting platform
8. ✅ Test all features thoroughly

---

**Happy Coding! 🚀**
