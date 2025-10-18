import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import mealsRouter from './routes/mealRoutes';
import registerRoutes from './routes/registerPageRoutes';
import orderRoutes from './routes/orderRoutes';
import restaurantRoutes from './routes/restaurantRoutes';
import driverRoutes from './routes/driverRoutes';
import cityRoutes from './routes/cityRoutes';
import commentRoutes from './routes/commentRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import userRoutes from './routes/userRoutes';
import db from './db/db';

dotenv.config();
const app = express();

// CORS configuration for production
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://*.vercel.app',
  process.env.FRONTEND_URL || '',
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin matches any allowed origin or wildcard pattern
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed.includes('*')) {
        const pattern = new RegExp(allowed.replace(/\*/g, '.*'));
        return pattern.test(origin);
      }
      return allowed === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// 🔗 Routes
app.use('/api/meals', mealsRouter);
app.use('/api/orders', orderRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/users', userRoutes);
app.use('/api', registerRoutes);

// 🌐 Health Check
app.get('/', (_req, res) => {
  res.send('🚀 API is running');
});

// 🔐 Login with bcrypt password verification
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('🔐 Login attempt for email:', email);
  
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    console.log('👤 User found:', { id: user.id, email: user.email, type: user.user_type });
    console.log('🔑 Stored hash:', user.password);
    console.log('🔑 Comparing password...');

    // Compare password with hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('🔑 Password valid:', isValidPassword);
    
    if (!isValidPassword) {
      console.log('❌ Invalid password for user:', email);
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        username: user.full_name,
        role: user.user_type,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log('✅ Login successful for:', email);
    res.json({
      message: 'Login successful',
      token,
      userId: user.id,
      username: user.full_name,
      role: user.user_type,
    });
  } catch (err) {
    console.error('💥 Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 🟢 Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🟢 Backend running at http://localhost:${PORT}`));
