import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db/db'; 

export const handleUserRegistration = async (req: Request, res: Response) => {
  const { username, email, password, role = 'customer', phone = null } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Username, email, and password are required.' });
  }

  try {
    // 1. Hash the user's password
    const hashed = await bcrypt.hash(password, 10);

    // 2. ✅ INSERT the user into the database
    const result = await db.query(
      `INSERT INTO users (full_name, email, password, user_type, contact_phone)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, full_name, email, user_type`,
      [username, email, hashed, role, phone]
    );

    // 3. Respond with the inserted user's public details
    return res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error('Registration error:', err.message);
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Email already exists.' });
    }
    return res.status(500).json({ error: 'Server error during registration.' });
  }
};
