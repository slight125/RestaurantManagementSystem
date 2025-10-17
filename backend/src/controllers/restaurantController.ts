import { Request, Response } from 'express';
import pool from '../db/db';

// Get all restaurants
export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const { includeInactive } = req.query;
    
    let query = `
      SELECT 
        r.*,
        r.cuisine as cuisine_type,
        c.name as city_name,
        c.state as city_state
      FROM restaurants r
      LEFT JOIN cities c ON r.city_id = c.id
    `;
    
    // For public endpoints, only show active restaurants
    // For admin, show all restaurants
    if (includeInactive !== 'true') {
      query += ' WHERE r.is_active = true';
    }
    
    query += ' ORDER BY r.rating DESC';
    
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Failed to fetch restaurants:', err);
    res.status(500).json({ error: 'Failed to fetch restaurants' });
  }
};

// Get single restaurant by ID
export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(`
      SELECT 
        r.*,
        c.name as city_name,
        c.state as city_state
      FROM restaurants r
      LEFT JOIN cities c ON r.city_id = c.id
      WHERE r.id = $1
    `, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Failed to fetch restaurant:', err);
    res.status(500).json({ error: 'Failed to fetch restaurant' });
  }
};

// Create new restaurant
export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const {
      name,
      location,
      city_id,
      cuisine_type,
      contact_phone,
      email,
      owner_id
    } = req.body;

    if (!name || !location) {
      return res.status(400).json({ error: 'Name and location are required' });
    }

    const result = await pool.query(
      `INSERT INTO restaurants (name, location, city_id, cuisine, contact_phone, email, owner_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *, cuisine as cuisine_type`,
      [name, location, city_id, cuisine_type, contact_phone, email, owner_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Failed to create restaurant:', err);
    res.status(500).json({ error: 'Failed to create restaurant' });
  }
};

// Update restaurant
export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      location,
      city_id,
      cuisine_type,
      contact_phone,
      email,
      rating,
      is_active
    } = req.body;

    const result = await pool.query(
      `UPDATE restaurants 
       SET name = COALESCE($1, name),
           location = COALESCE($2, location),
           city_id = COALESCE($3, city_id),
           cuisine = COALESCE($4, cuisine),
           contact_phone = COALESCE($5, contact_phone),
           email = COALESCE($6, email),
           rating = COALESCE($7, rating),
           is_active = COALESCE($8, is_active),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $9
       RETURNING *, cuisine as cuisine_type`,
      [name, location, city_id, cuisine_type, contact_phone, email, rating, is_active, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Failed to update restaurant:', err);
    res.status(500).json({ error: 'Failed to update restaurant' });
  }
};

// Delete restaurant
export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM restaurants WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (err) {
    console.error('❌ Failed to delete restaurant:', err);
    res.status(500).json({ error: 'Failed to delete restaurant' });
  }
};
