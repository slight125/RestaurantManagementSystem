import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import mealsRouter from './routes/mealRoutes';
import registerRoutes from './routes/registerPageRoutes';
import db from './db/db';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// 🔗 Routes
app.use('/api/meals', mealsRouter);
app.use('/api', registerRoutes);

// 🌐 Health Check
app.get('/', (_req, res) => {
  res.send('🚀 API is running');
});

// 🛒 Orders (placeholder)
app.post('/api/orders', (req, res) => {
  const { userId, mealId } = req.body;
  res.json({ message: `Order placed for meal ${mealId} by user ${userId}` });
});

// 🔐 Login (basic version – no hashing check yet)
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user || user.password !== password) {
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

    res.json({
      message: 'Login successful',
      token,
      userId: user.id,
      username: user.full_name,
      role: user.user_type,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// 🟢 Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🟢 Backend running at http://localhost:${PORT}`));
