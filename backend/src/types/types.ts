export interface Meal {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface Order {
  userId: number;
  mealId: number;
}
