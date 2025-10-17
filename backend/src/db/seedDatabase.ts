import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function seedDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🌱 Starting database seeding...');
    
    // Read the seed SQL file
    const seedSQL = readFileSync(join(__dirname, 'seed.sql'), 'utf-8');
    
    // Execute the seed SQL
    await client.query(seedSQL);
    
    console.log('✅ Database seeded successfully!');
    
    // Verify the data
    const menuCount = await client.query('SELECT COUNT(*) FROM menu_items');
    const restaurantCount = await client.query('SELECT COUNT(*) FROM restaurants');
    const commentCount = await client.query('SELECT COUNT(*) FROM comments');
    
    console.log(`\n📊 Database Statistics:`);
    console.log(`   - Restaurants: ${restaurantCount.rows[0].count}`);
    console.log(`   - Menu Items: ${menuCount.rows[0].count}`);
    console.log(`   - Comments: ${commentCount.rows[0].count}`);
    console.log(`\n🎉 Seeding complete! Your menu page should now show items.`);
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the seeding
seedDatabase().catch(console.error);
