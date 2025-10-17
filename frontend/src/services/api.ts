import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Auth APIs
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/login', { email, password }),
  register: (data: any) => api.post('/register', data),
};

// Restaurant APIs
export const restaurantAPI = {
  getAll: (includeInactive = false) => api.get(`/restaurants${includeInactive ? '?includeInactive=true' : ''}`),
  getById: (id: number) => api.get(`/restaurants/${id}`),
  create: (data: any) => api.post('/restaurants', data),
  update: (id: number, data: any) => api.put(`/restaurants/${id}`, data),
  delete: (id: number) => api.delete(`/restaurants/${id}`),
};

// Menu/Meal APIs
export const mealAPI = {
  getAll: () => api.get('/meals'),
  getById: (id: number) => api.get(`/meals/${id}`),
  create: (data: any) => api.post('/meals', data),
  delete: (id: number) => api.delete(`/meals/${id}`),
};

// Order APIs
export const orderAPI = {
  getAll: () => api.get('/orders'),
  getById: (id: number) => api.get(`/orders/${id}`),
  create: (data: any) => api.post('/orders', data),
  updateStatus: (id: number, status: string) =>
    api.patch(`/orders/${id}`, { status }),
  delete: (id: number) => api.delete(`/orders/${id}`),
};

// User APIs
export const userAPI = {
  getAll: () => api.get('/users'),
  getById: (id: number) => api.get(`/users/${id}`),
  update: (id: number, data: any) => api.put(`/users/${id}`, data),
  delete: (id: number) => api.delete(`/users/${id}`),
};

// Driver APIs
export const driverAPI = {
  getAll: () => api.get('/drivers'),
  getById: (id: number) => api.get(`/drivers/${id}`),
  create: (data: any) => api.post('/drivers', data),
  update: (id: number, data: any) => api.put(`/drivers/${id}`, data),
  delete: (id: number) => api.delete(`/drivers/${id}`),
};

// City APIs
export const cityAPI = {
  getAll: () => api.get('/cities'),
  getById: (id: number) => api.get(`/cities/${id}`),
  create: (data: any) => api.post('/cities', data),
  update: (id: number, data: any) => api.put(`/cities/${id}`, data),
  delete: (id: number) => api.delete(`/cities/${id}`),
};

// Comment APIs
export const commentAPI = {
  getAll: () => api.get('/comments'),
  getById: (id: number) => api.get(`/comments/${id}`),
  create: (data: any) => api.post('/comments', data),
  update: (id: number, data: any) => api.put(`/comments/${id}`, data),
  delete: (id: number) => api.delete(`/comments/${id}`),
};

// Analytics APIs
export const analyticsAPI = {
  getStats: () => api.get('/analytics/stats'),
  getRevenue: () => api.get('/analytics/revenue'),
};
