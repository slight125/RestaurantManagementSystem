import { useState, useEffect } from 'react';
import { mealAPI, restaurantAPI } from '../../services/api';
import type { MenuItem, Restaurant } from '../../types';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';

const AdminMeals = () => {
  const [meals, setMeals] = useState<MenuItem[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<MenuItem[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMeal, setEditingMeal] = useState<MenuItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRestaurant, setFilterRestaurant] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    ingredients: '',
    restaurant_id: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let filtered = [...meals];
    
    if (searchQuery) {
      filtered = filtered.filter(meal =>
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filterRestaurant) {
      filtered = filtered.filter(meal => 
        meal.restaurant_id?.toString() === filterRestaurant
      );
    }
    
    setFilteredMeals(filtered);
  }, [meals, searchQuery, filterRestaurant]);

  const fetchData = async () => {
    try {
      const [mealsRes, restaurantsRes] = await Promise.all([
        mealAPI.getAll(),
        restaurantAPI.getAll(),
      ]);
      setMeals(mealsRes.data);
      setFilteredMeals(mealsRes.data);
      setRestaurants(restaurantsRes.data);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getRestaurantName = (restaurantId?: number) => {
    if (!restaurantId) return 'No Restaurant';
    const restaurant = restaurants.find(r => r.id === restaurantId);
    return restaurant?.name || 'Unknown';
  };

  const handleOpenModal = (meal?: MenuItem) => {
    if (meal) {
      setEditingMeal(meal);
      setFormData({
        name: meal.name,
        description: meal.description || '',
        price: meal.price.toString(),
        image: meal.image || '',
        ingredients: meal.ingredients || '',
        restaurant_id: meal.restaurant_id?.toString() || '',
      });
    } else {
      setEditingMeal(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        ingredients: '',
        restaurant_id: '',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const mealData = {
        ...formData,
        price: parseFloat(formData.price),
        restaurant_id: formData.restaurant_id ? parseInt(formData.restaurant_id) : null,
      };

      if (editingMeal) {
        await mealAPI.update(editingMeal.id, mealData);
      } else {
        await mealAPI.create(mealData);
      }
      
      setShowModal(false);
      setEditingMeal(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        ingredients: '',
        restaurant_id: '',
      });
      fetchData();
    } catch (err) {
      alert(editingMeal ? 'Failed to update meal' : 'Failed to add meal');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this meal?')) return;

    try {
      await mealAPI.delete(id);
      setMeals(meals.filter(meal => meal.id !== id));
    } catch (err) {
      alert('Failed to delete meal');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Menu Items</h1>
            <p className="text-gray-600 mt-1">Total: {filteredMeals.length} items</p>
          </div>
          <Button onClick={() => handleOpenModal()}>
            ➕ Add New Meal
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🔍 Search Menu Items
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or description..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                🏪 Filter by Restaurant
              </label>
              <select
                value={filterRestaurant}
                onChange={(e) => setFilterRestaurant(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">All Restaurants</option>
                {restaurants.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal) => (
            <Card key={meal.id}>
              {meal.image && (
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
              )}
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{meal.name}</h3>
                <p className="text-xs text-gray-500 mb-2 flex items-center">
                  🏪 {getRestaurantName(meal.restaurant_id)}
                </p>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{meal.description}</p>
                {meal.ingredients && (
                  <p className="text-xs text-gray-500 mb-2">
                    🥗 {meal.ingredients}
                  </p>
                )}
                <p className="text-lg font-bold text-primary-600 mb-4">
                  KSh {meal.price != null ? Number(meal.price).toFixed(2) : 'N/A'}
                </p>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleOpenModal(meal)}
                    className="flex-1 text-sm bg-blue-600 hover:bg-blue-700"
                  >
                    ✏️ Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(meal.id)}
                    className="flex-1 text-sm"
                  >
                    🗑️ Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredMeals.length === 0 && meals.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-6xl mb-4">🍽️</div>
            <p className="text-gray-600 text-lg">No meals found. Add your first meal!</p>
          </div>
        )}

        {filteredMeals.length === 0 && meals.length > 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-600 text-lg">No meals match your search criteria.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Meal Modal */}
      <Modal 
        isOpen={showModal} 
        onClose={() => {
          setShowModal(false);
          setEditingMeal(null);
        }} 
        title={editingMeal ? 'Edit Menu Item' : 'Add New Menu Item'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Meal Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price (KSh) *
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ingredients
            </label>
            <input
              type="text"
              value={formData.ingredients}
              onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="e.g., Chicken, Rice, Vegetables"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Restaurant
            </label>
            <select
              value={formData.restaurant_id}
              onChange={(e) => setFormData({...formData, restaurant_id: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="">Select Restaurant</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingMeal ? '💾 Update Meal' : '➕ Add Meal'}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowModal(false);
                setEditingMeal(null);
              }}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminMeals;
