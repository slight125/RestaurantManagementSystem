import { Request, Response } from 'express';
import pool from '../db/db';

// Get all comments
export const getAllComments = async (req: Request, res: Response) => {
  try {
    const { restaurant_id, menu_item_id, user_id } = req.query;
    
    let query = `
      SELECT 
        c.*,
        u.full_name as user_name,
        r.name as restaurant_name,
        m.name as menu_item_name
      FROM comments c
      LEFT JOIN users u ON c.user_id = u.id
      LEFT JOIN restaurants r ON c.restaurant_id = r.id
      LEFT JOIN menu_items m ON c.menu_item_id = m.id
      WHERE 1=1
    `;
    
    const params: any[] = [];
    let paramIndex = 1;
    
    if (restaurant_id) {
      query += ` AND c.restaurant_id = $${paramIndex}`;
      params.push(restaurant_id);
      paramIndex++;
    }
    
    if (menu_item_id) {
      query += ` AND c.menu_item_id = $${paramIndex}`;
      params.push(menu_item_id);
      paramIndex++;
    }
    
    if (user_id) {
      query += ` AND c.user_id = $${paramIndex}`;
      params.push(user_id);
      paramIndex++;
    }
    
    query += ' ORDER BY c.created_at DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Failed to fetch comments:', err);
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// Create new comment
export const createComment = async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      restaurant_id,
      menu_item_id,
      order_id,
      rating,
      comment
    } = req.body;

    if (!user_id || !comment) {
      return res.status(400).json({ error: 'user_id and comment are required' });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const result = await pool.query(
      `INSERT INTO comments (user_id, restaurant_id, menu_item_id, order_id, rating, comment)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [user_id, restaurant_id, menu_item_id, order_id, rating, comment]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Failed to create comment:', err);
    res.status(500).json({ error: 'Failed to create comment' });
  }
};

// Update comment
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const result = await pool.query(
      `UPDATE comments 
       SET rating = COALESCE($1, rating),
           comment = COALESCE($2, comment),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING *`,
      [rating, comment, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Failed to update comment:', err);
    res.status(500).json({ error: 'Failed to update comment' });
  }
};

// Delete comment
export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM comments WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    console.error('❌ Failed to delete comment:', err);
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};
