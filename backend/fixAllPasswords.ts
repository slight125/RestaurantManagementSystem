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

async function fixAllPasswords() {
  try {
    // Generate hashes
    const adminHash = await bcrypt.hash('admin123', 10);
    const customerHash = await bcrypt.hash('customer123', 10);
    
    // Update admin password
    await pool.query(
      'UPDATE users SET password = $1 WHERE email = $2',
      [adminHash, 'admin@restaurant.com']
    );
    console.log('✅ Admin password updated');
    
    // Update John Doe password
    await pool.query(
      'UPDATE users SET password = $1 WHERE email = $2',
      [customerHash, 'john@example.com']
    );
    console.log('✅ John Doe password updated');
    
    // Update Jane Smith password
    await pool.query(
      'UPDATE users SET password = $1 WHERE email = $2',
      [customerHash, 'jane@example.com']
    );
    console.log('✅ Jane Smith password updated');
    
    console.log('\n📋 All Login Credentials:');
    console.log('\n🔐 Admin Account:');
    console.log('   Email: admin@restaurant.com');
    console.log('   Password: admin123');
    console.log('\n👤 Customer Accounts:');
    console.log('   Email: john@example.com');
    console.log('   Password: customer123');
    console.log('   ---');
    console.log('   Email: jane@example.com');
    console.log('   Password: customer123');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await pool.end();
  }
}

fixAllPasswords();
