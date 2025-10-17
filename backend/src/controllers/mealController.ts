import { Request, Response } from 'express';
import pool from '../db/db'; // adjust this path to match your project

export const getAllMeals = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM menu_items ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error('❌ Failed to fetch meals:', err);
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
};

export const getMealById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM menu_items WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Meal not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error('❌ Failed to fetch meal:', err);
    res.status(500).json({ error: 'Failed to fetch meal' });
  }
};

export const addMeal = async (req: Request, res: Response) => {
  const { name, description, image, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO menu_items (name, description, image, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description || '', image || '', Number(price)]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Failed to add meal:', err);
    res.status(500).json({ error: 'Failed to add meal' });
  }
};
