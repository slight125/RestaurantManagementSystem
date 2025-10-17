import bcrypt from 'bcryptjs';
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function updateAdminPassword() {
  const password = 'admin123';
  
  try {
    // Generate new hash
    const hash = await bcrypt.hash(password, 10);
    console.log('🔑 Generated hash for "admin123":', hash);
    
    // Update database
    await pool.query(
      'UPDATE users SET password = $1 WHERE email = $2',
      [hash, 'admin@restaurant.com']
    );
    
    console.log('✅ Password updated successfully!');
    console.log('\n📋 Login credentials:');
    console.log('   Email: admin@restaurant.com');
    console.log('   Password: admin123');
    
    // Verify it works
    const result = await pool.query('SELECT * FROM users WHERE email = $1', ['admin@restaurant.com']);
    const user = result.rows[0];
    const isValid = await bcrypt.compare(password, user.password);
    
    console.log('\n🔍 Verification:', isValid ? '✅ Password matches!' : '❌ Password does not match');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await pool.end();
  }
}

updateAdminPassword();
