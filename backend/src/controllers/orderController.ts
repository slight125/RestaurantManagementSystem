import { Request, Response } from 'express';
import pool from '../db/db';

// Get all orders (with filters for user)
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    
    let query = `
      SELECT 
        o.*,
        u.full_name as user_name,
        u.email as user_email,
        r.name as restaurant_name,
        d.name as driver_name,
        d.status as driver_status
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN restaurants r ON o.restaurant_id = r.id
      LEFT JOIN drivers d ON o.driver_id = d.id
    `;
    
    const params: any[] = [];
    if (userId) {
      query += ' WHERE o.user_id = $1';
      params.push(userId);
    }
    
    query += ' ORDER BY o.created_at DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Failed to fetch orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};

// Get single order by ID
export const getOrderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const orderResult = await pool.query(`
      SELECT 
        o.*,
        u.full_name as user_name,
        u.email as user_email,
        u.contact_phone as user_phone,
        r.name as restaurant_name,
        d.name as driver_name
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN restaurants r ON o.restaurant_id = r.id
      LEFT JOIN drivers d ON o.driver_id = d.id
      WHERE o.id = $1
    `, [id]);
    
    if (orderResult.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Get order items
    const itemsResult = await pool.query(`
      SELECT 
        oi.*,
        mi.name as item_name,
        mi.image as item_image
      FROM order_items oi
      LEFT JOIN menu_items mi ON oi.menu_item_id = mi.id
      WHERE oi.order_id = $1
    `, [id]);
    
    const order = {
      ...orderResult.rows[0],
      items: itemsResult.rows
    };
    
    res.json(order);
  } catch (err) {
    console.error('❌ Failed to fetch order:', err);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
};

// Create new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      meal_id,
      quantity = 1,
      total,
      delivery_address = '',
      payment_method = 'Cash',
      notes = ''
    } = req.body;

    if (!user_id || !meal_id || !total) {
      return res.status(400).json({ error: 'user_id, meal_id, and total are required' });
    }

    // Get meal details
    const mealResult = await pool.query('SELECT * FROM menu_items WHERE id = $1', [meal_id]);
    if (mealResult.rows.length === 0) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    
    const meal = mealResult.rows[0];
    const restaurant_id = meal.restaurant_id;

    // Create order
    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, restaurant_id, total, delivery_address, payment_method, notes, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'Pending')
       RETURNING *`,
      [user_id, restaurant_id, total, delivery_address, payment_method, notes]
    );

    const order = orderResult.rows[0];

    // Create order item
    const subtotal = meal.price * quantity;
    await pool.query(
      `INSERT INTO order_items (order_id, menu_item_id, quantity, price, subtotal)
       VALUES ($1, $2, $3, $4, $5)`,
      [order.id, meal_id, quantity, meal.price, subtotal]
    );

    res.status(201).json(order);
  } catch (err) {
    console.error('❌ Failed to create order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// Update order status
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, driver_id } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const validStatuses = ['Pending', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    let query = 'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP';
    const params: any[] = [status];
    
    if (driver_id) {
      query += ', driver_id = $2';
      params.push(driver_id);
    }
    
    query += ' WHERE id = $' + (params.length + 1) + ' RETURNING *';
    params.push(id);

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Failed to update order:', err);
    res.status(500).json({ error: 'Failed to update order' });
  }
};

// Delete order
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM orders WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    console.error('❌ Failed to delete order:', err);
    res.status(500).json({ error: 'Failed to delete order' });
  }
};
