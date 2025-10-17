-- Seed data for Restaurant Management System
-- This file adds sample menu items and additional test data

-- Insert more menu items for TamuTamu Kitchen (Restaurant ID: 1)
INSERT INTO menu_items (name, description, price, image, ingredients, restaurant_id, is_available) VALUES
-- Breakfast Items
('Swahili Breakfast Platter', 'Traditional Kenyan breakfast with mahamri, mandazi, chai, and fresh fruits', 450.00, 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=500', 'Mahamri, Mandazi, Chai, Fresh Fruits, Coconut Milk', 1, true),
('Coastal Omelette', 'Fluffy omelette with coconut cream, tomatoes, and dhania served with chapati', 350.00, 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500', 'Eggs, Coconut Cream, Tomatoes, Coriander, Chapati', 1, true),
('Viazi Karai', 'Crispy fried potato rounds served with tangy tamarind chutney', 250.00, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500', 'Potatoes, Chickpea Flour, Spices, Tamarind Chutney', 1, true),

-- Main Courses
('Pilau ya Kuku', 'Aromatic spiced rice with tender chicken pieces and fried potatoes', 650.00, 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500', 'Basmati Rice, Chicken, Pilau Masala, Potatoes, Onions', 1, true),
('Biryani Special', 'Fragrant layered biryani with succulent meat and raita', 750.00, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500', 'Basmati Rice, Mutton/Chicken, Biryani Spices, Yogurt, Herbs', 1, true),
('Mchuzi wa Samaki', 'Coconut fish curry with fresh catch of the day, served with ugali', 800.00, 'https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500', 'Fresh Fish, Coconut Milk, Tomatoes, Spices, Ugali', 1, true),
('Nyama Choma Platter', 'Grilled goat meat served with kachumbari and ugali', 900.00, 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=500', 'Goat Meat, Kachumbari, Ugali, Lemon', 1, true),
('Matoke Stew', 'Slow-cooked green bananas in rich tomato-based gravy', 500.00, 'https://images.unsplash.com/photo-1604909052743-94e838986d24?w=500', 'Green Bananas, Tomatoes, Onions, Spices, Beef Stock', 1, true),

-- Vegetarian Options
('Maharage ya Nazi', 'Red kidney beans in creamy coconut sauce with chapati', 400.00, 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=500', 'Red Beans, Coconut Milk, Tomatoes, Spices, Chapati', 1, true),
('Sukuma Wiki Special', 'Sautéed kale with tomatoes and ugali', 300.00, 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500', 'Kale, Tomatoes, Onions, Ugali', 1, true),

-- Beverages
('Fresh Passion Juice', 'Freshly squeezed passion fruit juice', 180.00, 'https://images.unsplash.com/photo-1546173159-315724a31696?w=500', 'Passion Fruit, Sugar, Water', 1, true),
('Tangawizi Tea', 'Traditional ginger tea with lemon and honey', 150.00, 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=500', 'Ginger, Tea Leaves, Lemon, Honey', 1, true),
('Madafu (Coconut Water)', 'Fresh coconut water straight from the coast', 200.00, 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500', 'Fresh Coconut', 1, true),

-- Desserts
('Kashata Coconut Candy', 'Traditional sweet coconut candy bars', 100.00, 'https://images.unsplash.com/photo-1582716401301-b2407dc7563d?w=500', 'Coconut, Sugar, Cardamom', 1, true),
('Mkate wa Ufuta', 'Soft sesame seed cake with cardamom', 250.00, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500', 'Flour, Sesame Seeds, Cardamom, Sugar', 1, true);

-- Insert menu items for Hustle Bites (Restaurant ID: 2)
INSERT INTO menu_items (name, description, price, image, ingredients, restaurant_id, is_available) VALUES
-- Burgers & Grills
('Hustle Burger Deluxe', 'Double beef patty with cheese, lettuce, tomato, and special sauce', 550.00, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500', 'Beef Patty, Cheese, Lettuce, Tomato, Special Sauce, Brioche Bun', 2, true),
('Grilled Chicken Wings', '8 pieces of spicy grilled chicken wings with ranch dip', 450.00, 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=500', 'Chicken Wings, Hot Sauce, Ranch Dip', 2, true),
('BBQ Ribs Platter', 'Tender pork ribs glazed with BBQ sauce, served with fries', 850.00, 'https://images.unsplash.com/photo-1544025162-d76694265947?w=500', 'Pork Ribs, BBQ Sauce, French Fries, Coleslaw', 2, true),
('Beef Shawarma Wrap', 'Marinated beef with tahini, vegetables in warm pita', 400.00, 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=500', 'Beef, Tahini, Lettuce, Tomato, Pita Bread', 2, true),

-- Sides
('Loaded Cheese Fries', 'Crispy fries topped with melted cheese and bacon bits', 350.00, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500', 'French Fries, Cheese, Bacon, Sour Cream', 2, true),
('Chicken Nuggets', '10 pieces of crispy chicken nuggets with honey mustard', 380.00, 'https://images.unsplash.com/photo-1562967914-608f82629710?w=500', 'Chicken Breast, Breadcrumbs, Honey Mustard', 2, true),
('Onion Rings', 'Golden crispy onion rings with garlic aioli', 280.00, 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=500', 'Onions, Batter, Garlic Aioli', 2, true),

-- Drinks
('Classic Milkshake', 'Chocolate, vanilla, or strawberry milkshake', 250.00, 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500', 'Ice Cream, Milk, Flavor of Choice', 2, true),
('Fresh Lemonade', 'Homemade lemonade with fresh mint', 180.00, 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9d?w=500', 'Lemons, Sugar, Mint, Water', 2, true);

-- Insert menu items for The Garden Table (Restaurant ID: 3)
INSERT INTO menu_items (name, description, price, image, ingredients, restaurant_id, is_available) VALUES
-- Salads & Bowls
('Mediterranean Bowl', 'Quinoa, falafel, hummus, olives, and tahini dressing', 580.00, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500', 'Quinoa, Falafel, Hummus, Olives, Cucumbers, Tahini', 3, true),
('Garden Fresh Salad', 'Mixed greens with cherry tomatoes, avocado, and balsamic vinaigrette', 450.00, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500', 'Mixed Greens, Cherry Tomatoes, Avocado, Balsamic Dressing', 3, true),
('Buddha Bowl', 'Roasted vegetables, chickpeas, brown rice, and tahini sauce', 620.00, 'https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?w=500', 'Brown Rice, Roasted Vegetables, Chickpeas, Tahini, Sesame', 3, true),

-- Main Courses
('Mushroom Risotto', 'Creamy arborio rice with wild mushrooms and parmesan', 680.00, 'https://images.unsplash.com/photo-1476124369491-b79d6d97f7a6?w=500', 'Arborio Rice, Wild Mushrooms, Parmesan, White Wine, Herbs', 3, true),
('Vegetable Lasagna', 'Layers of pasta with roasted vegetables and béchamel sauce', 650.00, 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=500', 'Pasta, Zucchini, Eggplant, Bell Peppers, Béchamel, Mozzarella', 3, true),
('Stuffed Bell Peppers', 'Bell peppers filled with quinoa, black beans, and corn', 550.00, 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=500', 'Bell Peppers, Quinoa, Black Beans, Corn, Spices', 3, true),

-- Wraps & Sandwiches
('Hummus Veggie Wrap', 'Whole wheat wrap with hummus, grilled vegetables, and sprouts', 420.00, 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500', 'Whole Wheat Wrap, Hummus, Grilled Vegetables, Sprouts', 3, true),
('Avocado Toast Supreme', 'Sourdough with smashed avocado, poached egg, and microgreens', 480.00, 'https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?w=500', 'Sourdough Bread, Avocado, Poached Egg, Microgreens', 3, true),

-- Smoothies & Juices
('Green Detox Smoothie', 'Spinach, cucumber, apple, ginger, and lime', 320.00, 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?w=500', 'Spinach, Cucumber, Apple, Ginger, Lime', 3, true),
('Berry Blast Smoothie', 'Mixed berries, banana, almond milk, and chia seeds', 350.00, 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500', 'Strawberries, Blueberries, Banana, Almond Milk, Chia Seeds', 3, true),
('Turmeric Golden Latte', 'Warm almond milk with turmeric, ginger, and honey', 280.00, 'https://images.unsplash.com/photo-1577968897966-3d1b0fa8a674?w=500', 'Almond Milk, Turmeric, Ginger, Honey, Cinnamon', 3, true);

-- Update restaurant ratings based on menu variety
UPDATE restaurants SET rating = 4.7 WHERE id = 1;
UPDATE restaurants SET rating = 4.3 WHERE id = 2;
UPDATE restaurants SET rating = 4.6 WHERE id = 3;

-- Insert some sample comments/reviews
INSERT INTO comments (user_id, restaurant_id, rating, comment) VALUES
(2, 1, 5, 'Amazing Swahili cuisine! The pilau was absolutely delicious and authentic.'),
(3, 1, 4, 'Great food and good portion sizes. The coastal omelette is a must-try!'),
(2, 2, 4, 'Best burgers in town! The hustle burger deluxe is huge and tasty.'),
(3, 3, 5, 'Love the vegetarian options here. The Buddha bowl is my favorite!'),
(2, 3, 5, 'Fresh, healthy, and delicious. Perfect for health-conscious foodies!');

