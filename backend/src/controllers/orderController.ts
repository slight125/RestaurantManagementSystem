import { Request, Response } from 'express';

export const createOrder = (req: Request, res: Response) => {
  // Your order logic here
  res.json({ message: 'Order created!' });
};
