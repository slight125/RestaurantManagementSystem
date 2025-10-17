import { Request, Response } from 'express';
import pool from '../db/db';

// Get all drivers
export const getAllDrivers = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        id, 
        name as full_name, 
        status, 
        location as current_location, 
        orders_completed, 
        vehicle_type, 
        vehicle_number, 
        rating 
      FROM drivers
      ORDER BY rating DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Failed to fetch drivers:', err);
    res.status(500).json({ error: 'Failed to fetch drivers' });
  }
};

// Get single driver by ID
export const getDriverById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('SELECT * FROM drivers WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Failed to fetch driver:', err);
    res.status(500).json({ error: 'Failed to fetch driver' });
  }
};

// Create new driver
export const createDriver = async (req: Request, res: Response) => {
  try {
    const {
      user_id,
      full_name,
      status = 'Available',
      current_location,
      vehicle_type,
      vehicle_number
    } = req.body;

    if (!full_name) {
      return res.status(400).json({ error: 'Full name is required' });
    }

    const result = await pool.query(
      `INSERT INTO drivers (user_id, name, status, location, vehicle_type, vehicle_number)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name as full_name, status, location as current_location, orders_completed, vehicle_type, vehicle_number, rating`,
      [user_id, full_name, status, current_location, vehicle_type, vehicle_number]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Failed to create driver:', err);
    res.status(500).json({ error: 'Failed to create driver' });
  }
};

// Update driver
export const updateDriver = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      full_name,
      status,
      current_location,
      orders_completed,
      vehicle_type,
      vehicle_number,
      rating
    } = req.body;

    const result = await pool.query(
      `UPDATE drivers 
       SET name = COALESCE($1, name),
           status = COALESCE($2, status),
           location = COALESCE($3, location),
           orders_completed = COALESCE($4, orders_completed),
           vehicle_type = COALESCE($5, vehicle_type),
           vehicle_number = COALESCE($6, vehicle_number),
           rating = COALESCE($7, rating),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING id, name as full_name, status, location as current_location, orders_completed, vehicle_type, vehicle_number, rating`,
      [full_name, status, current_location, orders_completed, vehicle_type, vehicle_number, rating, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Driver not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Failed to update driver:', err);
    res.status(500).json({ error: 'Failed to update driver' });
  }
};

// Delete driver
export const deleteDriver = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM drivers WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Driver not found' });
    }
    
    res.json({ message: 'Driver deleted successfully' });
  } catch (err) {
    console.error('❌ Failed to delete driver:', err);
    res.status(500).json({ error: 'Failed to delete driver' });
  }
};
