// Type definitions for the Restaurant Management System

export interface User {
  id: number;
  full_name: string;
  email: string;
  user_type: 'customer' | 'admin' | 'driver' | 'restaurant_owner';
  contact_phone?: string;
  created_at?: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  userId: number;
  username: string;
  role: string;
}

export interface Restaurant {
  id: number;
  name: string;
  location: string;
  city_id?: number;
  cuisine?: string;
  contact_phone?: string;
  email?: string;
  owner_id?: number;
  rating?: number;
  is_active?: boolean;
  created_at?: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description?: string;
  price: number;
  image?: string;
  ingredients?: string;
  restaurant_id?: number;
  category_id?: number;
  is_available?: boolean;
  created_at?: string;
}

export interface Order {
  id: number;
  user_id: number;
  restaurant_id?: number;
  driver_id?: number;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  delivery_address?: string;
  payment_method?: string;
  payment_status?: 'Unpaid' | 'Paid' | 'Refunded';
  notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  menu_item_id: number;
  quantity: number;
  price: number;
  subtotal: number;
  created_at?: string;
}

export interface Driver {
  id: number;
  user_id?: number;
  name: string;
  status: 'Available' | 'On Delivery' | 'Offline';
  location?: string;
  orders_completed?: number;
  vehicle_type?: string;
  vehicle_number?: string;
  rating?: number;
  created_at?: string;
}

export interface City {
  id: number;
  name: string;
  state: string;
  country?: string;
  created_at?: string;
}

export interface Comment {
  id: number;
  user_id: number;
  restaurant_id?: number;
  menu_item_id?: number;
  order_id?: number;
  rating?: number;
  comment?: string;
  created_at?: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}
