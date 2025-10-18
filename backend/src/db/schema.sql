-- Restaurant Management System Database Schema

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS comments CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS menu_items CASCADE;
DROP TABLE IF EXISTS drivers CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_type VARCHAR(50) DEFAULT 'customer' CHECK (user_type IN ('customer', 'admin', 'driver', 'restaurant_owner')),
    contact_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Cities/Locations table
CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    country VARCHAR(255) DEFAULT 'Kenya',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Restaurants table
CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    city_id INTEGER REFERENCES cities(id) ON DELETE SET NULL,
    cuisine VARCHAR(255),
    contact_phone VARCHAR(20),
    email VARCHAR(255),
    owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    rating DECIMAL(3,2) DEFAULT 0.00,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu Items table
CREATE TABLE menu_items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image VARCHAR(500),
    ingredients TEXT,
    restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
    category_id INTEGER,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Drivers table
CREATE TABLE drivers (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Available' CHECK (status IN ('Available', 'On Delivery', 'Offline')),
    location VARCHAR(255),
    orders_completed INTEGER DEFAULT 0,
    vehicle_type VARCHAR(100),
    vehicle_number VARCHAR(50),
    rating DECIMAL(3,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE SET NULL,
    driver_id INTEGER REFERENCES drivers(id) ON DELETE SET NULL,
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled')),
    delivery_address TEXT,
    payment_method VARCHAR(50) DEFAULT 'Cash',
    payment_status VARCHAR(50) DEFAULT 'Unpaid' CHECK (payment_status IN ('Unpaid', 'Paid', 'Refunded')),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order Items table (many-to-many relationship between orders and menu items)
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    price DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comments/Reviews table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
    menu_item_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data

-- Insert cities
INSERT INTO cities (name, state, country) VALUES
('Nairobi', 'Nairobi County', 'Kenya'),
('Mombasa', 'Mombasa County', 'Kenya'),
('Kisumu', 'Kisumu County', 'Kenya'),
('Nakuru', 'Nakuru County', 'Kenya'),
('Eldoret', 'Uasin Gishu County', 'Kenya'),
('Thika', 'Kiambu County', 'Kenya'),
('Nyeri', 'Nyeri County', 'Kenya'),
('Laikipia', 'Laikipia County', 'Kenya');

-- Insert sample admin user (password: admin123)
INSERT INTO users (full_name, email, password, user_type, contact_phone) VALUES
('Admin User', 'admin@restaurant.com', '$2b$10$Yb6A.PJBA7SUTbYlvp8Z1uJ2dwG4pk8wfSxx3KuzyKVgxFTHHv/CW', 'admin', '+254700000000'),
('John Doe', 'john@example.com', '$2b$10$Yb6A.PJBA7SUTbYlvp8Z1uJ2dwG4pk8wfSxx3KuzyKVgxFTHHv/CW', 'customer', '+254711111111'),
('Jane Smith', 'jane@example.com', '$2b$10$Yb6A.PJBA7SUTbYlvp8Z1uJ2dwG4pk8wfSxx3KuzyKVgxFTHHv/CW', 'customer', '+254722222222');

-- Insert sample restaurants
INSERT INTO restaurants (name, location, city_id, cuisine, contact_phone, rating) VALUES
('TamuTamu Kitchen', 'Westlands', 1, 'Swahili Fusion', '+254733333333', 4.5),
('Hustle Bites', 'Town Center', 8, 'Grill & Fast Food', '+254744444444', 4.2),
('The Garden Table', 'CBD', 7, 'Vegetarian Delight', '+254755555555', 4.8);

-- Insert sample drivers
INSERT INTO drivers (name, status, location, orders_completed, vehicle_type, vehicle_number, rating) VALUES
('Amina Kariuki', 'Available', 'Nairobi CBD', 125, 'Motorcycle', 'KCA 123B', 4.7),
('Joseph Mwangi', 'On Delivery', 'Westlands', 89, 'Car', 'KCB 456C', 4.5),
('Lucy Wanjiku', 'Offline', 'Kasarani', 57, 'Motorcycle', 'KCC 789D', 4.3),
('Kevin Otieno', 'Available', 'Thika Road', 102, 'Motorcycle', 'KCD 321E', 4.6);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_menu_items_restaurant ON menu_items(restaurant_id);
CREATE INDEX idx_comments_restaurant ON comments(restaurant_id);

