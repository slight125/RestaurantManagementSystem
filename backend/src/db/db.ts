import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL not set in .env');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

pool.query('SELECT NOW()')
  .then(res => console.log('✅ Connected to DB at:', res.rows[0].now))
  .catch(err => console.error('❌ DB connection error:', err));

export default pool;
