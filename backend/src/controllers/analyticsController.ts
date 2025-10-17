import { Request, Response } from 'express';
import pool from '../db/db';

// Get dashboard analytics
export const getDashboardAnalytics = async (_req: Request, res: Response) => {
  try {
    // Get total counts
    const usersCount = await pool.query('SELECT COUNT(*) FROM users');
    const restaurantsCount = await pool.query('SELECT COUNT(*) FROM restaurants');
    const ordersCount = await pool.query('SELECT COUNT(*) FROM orders');
    const driversCount = await pool.query('SELECT COUNT(*) FROM drivers');
    
    // Get revenue (sum of all orders)
    const revenueResult = await pool.query('SELECT COALESCE(SUM(total), 0) as total_revenue FROM orders WHERE payment_status = \'Paid\'');
    
    // Get orders by status
    const ordersByStatus = await pool.query(`
      SELECT status, COUNT(*) as count 
      FROM orders 
      GROUP BY status
    `);
    
    // Get recent orders
    const recentOrders = await pool.query(`
      SELECT 
        o.*,
        u.full_name as user_name,
        r.name as restaurant_name
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN restaurants r ON o.restaurant_id = r.id
      ORDER BY o.created_at DESC
      LIMIT 10
    `);
    
    // Get top restaurants by orders
    const topRestaurants = await pool.query(`
      SELECT 
        r.name,
        r.rating,
        COUNT(o.id) as order_count,
        COALESCE(SUM(o.total), 0) as total_revenue
      FROM restaurants r
      LEFT JOIN orders o ON r.id = o.restaurant_id
      GROUP BY r.id, r.name, r.rating
      ORDER BY order_count DESC
      LIMIT 5
    `);

    res.json({
      totalUsers: parseInt(usersCount.rows[0].count),
      totalRestaurants: parseInt(restaurantsCount.rows[0].count),
      totalOrders: parseInt(ordersCount.rows[0].count),
      totalDrivers: parseInt(driversCount.rows[0].count),
      totalRevenue: parseFloat(revenueResult.rows[0].total_revenue),
      ordersByStatus: ordersByStatus.rows,
      recentOrders: recentOrders.rows,
      topRestaurants: topRestaurants.rows
    });
  } catch (err) {
    console.error('❌ Failed to fetch analytics:', err);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
};

// Get user analytics
export const getUserAnalytics = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    const ordersCount = await pool.query('SELECT COUNT(*) FROM orders WHERE user_id = $1', [userId]);
    const totalSpent = await pool.query('SELECT COALESCE(SUM(total), 0) as total FROM orders WHERE user_id = $1', [userId]);
    
    const recentOrders = await pool.query(`
      SELECT 
        o.*,
        r.name as restaurant_name
      FROM orders o
      LEFT JOIN restaurants r ON o.restaurant_id = r.id
      WHERE o.user_id = $1
      ORDER BY o.created_at DESC
      LIMIT 10
    `, [userId]);

    res.json({
      totalOrders: parseInt(ordersCount.rows[0].count),
      totalSpent: parseFloat(totalSpent.rows[0].total),
      recentOrders: recentOrders.rows
    });
  } catch (err) {
    console.error('❌ Failed to fetch user analytics:', err);
    res.status(500).json({ error: 'Failed to fetch user analytics' });
  }
};
