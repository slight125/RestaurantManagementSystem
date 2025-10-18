import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import db from '../db/db'; 

export const handleUserRegistration = async (req: Request, res: Response) => {
  // Accept both old format (username, phone) and new format (full_name, contact_phone)
  const { 
    username, 
    full_name, 
    email, 
    password, 
    phone, 
    contact_phone 
  } = req.body;

  // Use full_name if provided, otherwise fall back to username
  const name = full_name || username;
  const phoneNumber = contact_phone || phone || null;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Full name, email, and password are required.' });
  }

  try {
    // 1. Hash the user's password
    const hashed = await bcrypt.hash(password, 10);

    // 2. ✅ INSERT the user into the database - all registrations default to 'customer'
    const result = await db.query(
      `INSERT INTO users (full_name, email, password, user_type, contact_phone)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, full_name, email, user_type`,
      [name, email, hashed, 'customer', phoneNumber]
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
