import pool from './db';
import fs from 'fs';
import path from 'path';

const initializeDatabase = async () => {
  try {
    console.log('🔄 Initializing database...');
    
    // Read the schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    
    // Execute the schema
    await pool.query(schema);
    
    console.log('✅ Database initialized successfully!');
    console.log('📊 Tables created:');
    console.log('   - users');
    console.log('   - cities');
    console.log('   - restaurants');
    console.log('   - menu_items');
    console.log('   - drivers');
    console.log('   - orders');
    console.log('   - order_items');
    console.log('   - comments');
    console.log('\n👤 Default admin user created:');
    console.log('   Email: admin@restaurant.com');
    console.log('   Password: admin123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
};

initializeDatabase();
