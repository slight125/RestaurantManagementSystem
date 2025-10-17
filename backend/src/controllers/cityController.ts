import { Request, Response } from 'express';
import pool from '../db/db';

// Get all cities
export const getAllCities = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM cities ORDER BY name ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Failed to fetch cities:', err);
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
};

// Get single city by ID
export const getCityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('SELECT * FROM cities WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'City not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Failed to fetch city:', err);
    res.status(500).json({ error: 'Failed to fetch city' });
  }
};

// Create new city
export const createCity = async (req: Request, res: Response) => {
  try {
    const { name, state, country = 'Kenya' } = req.body;

    if (!name || !state) {
      return res.status(400).json({ error: 'Name and state are required' });
    }

    const result = await pool.query(
      'INSERT INTO cities (name, state, country) VALUES ($1, $2, $3) RETURNING *',
      [name, state, country]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Failed to create city:', err);
    res.status(500).json({ error: 'Failed to create city' });
  }
};

// Update city
export const updateCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, state, country } = req.body;

    const result = await pool.query(
      `UPDATE cities 
       SET name = COALESCE($1, name),
           state = COALESCE($2, state),
           country = COALESCE($3, country)
       WHERE id = $4
       RETURNING *`,
      [name, state, country, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'City not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Failed to update city:', err);
    res.status(500).json({ error: 'Failed to update city' });
  }
};

// Delete city
export const deleteCity = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM cities WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'City not found' });
    }
    
    res.json({ message: 'City deleted successfully' });
  } catch (err) {
    console.error('❌ Failed to delete city:', err);
    res.status(500).json({ error: 'Failed to delete city' });
  }
};
