import express, { Request, Response } from 'express';
import pool from '../db/db';

const router = express.Router();

// GET all meals
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM menu_items ORDER BY id DESC');
    res.json(result.rows);
  } catch (err: any) {
    console.error('❌ Error fetching meals:', err.message);
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
});

// GET a single meal by ID
router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log('🔍 Fetching meal with ID:', id);
  
  try {
    const result = await pool.query('SELECT * FROM menu_items WHERE id = $1', [id]);
    console.log('📊 Query result:', result.rows);
    
    if (result.rows.length === 0) {
      console.log('❌ Meal not found with ID:', id);
      res.status(404).json({ error: 'Meal not found' });
      return;
    }
    
    console.log('✅ Meal found:', result.rows[0]);
    res.json(result.rows[0]);
  } catch (err: any) {
    console.error('❌ Error fetching meal:', err.message);
    res.status(500).json({ error: 'Failed to fetch meal' });
  }
});

// POST a new meal
router.post('/', async (req: Request, res: Response): Promise<void> => {
  console.log('💡 Incoming body:', req.body);
  const {
    name,
    description = '',
    price,
    image = '',
    ingredients = '',
    restaurant_id = null,
    category_id = null
  } = req.body;

  if (!name || typeof price !== 'number') {
    res.status(400).json({ error: 'Name and numeric price are required' });
    return;
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO menu_items (name, description, price, image, ingredients, restaurant_id, category_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
      `,
      [name, description, price, image, ingredients, restaurant_id, category_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err: any) {
    console.error('❌ Error inserting meal:', err.message);
    res.status(500).json({ error: 'Failed to add meal' });
  }
});

// DELETE a meal
router.delete('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM menu_items WHERE id = $1', [id]);
    res.sendStatus(204);
  } catch (err: any) {
    console.error('❌ Error deleting meal:', err.message);
    res.status(500).json({ error: 'Failed to delete meal' });
  }
});

export default router;
