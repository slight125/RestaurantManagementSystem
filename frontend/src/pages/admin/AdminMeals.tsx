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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Modern Header with Gradient */}
        <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-orange-500 rounded-2xl shadow-2xl p-6 sm:p-8 mb-8">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-40 h-40 bg-white opacity-10 rounded-full"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-white opacity-10 rounded-full"></div>
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-white">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">🍽️</span>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Menu Management
                </h1>
              </div>
              <p className="text-red-100 text-sm sm:text-base flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                <span className="font-semibold">{filteredMeals.length}</span> items available
                {searchQuery || filterRestaurant ? (
                  <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full">
                    Filtered from {meals.length} total
                  </span>
                ) : null}
              </p>
            </div>
            
            <button
              onClick={() => handleOpenModal()}
              className="group relative bg-white text-red-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span className="text-xl group-hover:scale-110 transition-transform">➕</span>
              <span>Add New Item</span>
            </button>
          </div>
        </div>

        {/* Modern Search and Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <span className="text-xl">🔍</span>
                <span>Search Menu Items</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or description..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all text-gray-900 placeholder-gray-400"
                />
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">
                  🔎
                </span>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            
            <div className="group">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <span className="text-xl">🏪</span>
                <span>Filter by Restaurant</span>
              </label>
              <select
                value={filterRestaurant}
                onChange={(e) => setFilterRestaurant(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all text-gray-900 bg-white cursor-pointer"
              >
                <option value="">All Restaurants ({meals.length} items)</option>
                {restaurants.map((restaurant) => {
                  const count = meals.filter(m => m.restaurant_id === restaurant.id).length;
                  return (
                    <option key={restaurant.id} value={restaurant.id}>
                      {restaurant.name} ({count} items)
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          
          {/* Active Filters Display */}
          {(searchQuery || filterRestaurant) && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600 font-medium">Active filters:</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-red-900">✕</button>
                </span>
              )}
              {filterRestaurant && (
                <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  Restaurant: {restaurants.find(r => r.id.toString() === filterRestaurant)?.name}
                  <button onClick={() => setFilterRestaurant('')} className="ml-1 hover:text-blue-900">✕</button>
                </span>
              )}
              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterRestaurant('');
                }}
                className="text-sm text-red-600 hover:text-red-700 font-medium ml-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Modern Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal) => (
            <div
              key={meal.id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                {meal.image ? (
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x300?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl opacity-30">🍽️</span>
                  </div>
                )}
                
                {/* Restaurant Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-md">
                    <span>🏪</span>
                    <span>{getRestaurantName(meal.restaurant_id)}</span>
                  </span>
                </div>
                
                {/* Price Badge */}
                <div className="absolute top-3 right-3">
                  <span className="inline-flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    KSh {meal.price != null ? Number(meal.price).toFixed(2) : 'N/A'}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-red-600 transition-colors">
                  {meal.name}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                  {meal.description || 'No description available'}
                </p>
                
                {meal.ingredients && (
                  <div className="mb-4 p-2.5 bg-green-50 rounded-lg border border-green-100">
                    <p className="text-xs text-green-800 line-clamp-2 flex items-start gap-2">
                      <span className="text-base flex-shrink-0">🥗</span>
                      <span className="font-medium">{meal.ingredients}</span>
                    </p>
                  </div>
                )}
                
                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleOpenModal(meal)}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>✏️</span>
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(meal.id)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>🗑️</span>
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modern Empty States */}
        {filteredMeals.length === 0 && meals.length === 0 && (
          <div className="col-span-full">
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border-2 border-dashed border-gray-300">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-5xl">🍽️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No Menu Items Yet
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Start building your menu by adding your first delicious item. Your customers are waiting!
                </p>
                <button
                  onClick={() => handleOpenModal()}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className="text-xl">➕</span>
                  <span>Add Your First Item</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {filteredMeals.length === 0 && meals.length > 0 && (
          <div className="col-span-full">
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-200">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                  <span className="text-5xl">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  No Results Found
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  We couldn't find any menu items matching your search criteria. Try adjusting your filters or search terms.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setFilterRestaurant('');
                  }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span>🔄</span>
                  <span>Clear All Filters</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modern Add/Edit Meal Modal */}
      <Modal 
        isOpen={showModal} 
        onClose={() => {
          setShowModal(false);
          setEditingMeal(null);
        }} 
        title={
          <div className="flex items-center gap-3">
            <span className="text-2xl">{editingMeal ? '✏️' : '➕'}</span>
            <span>{editingMeal ? 'Edit Menu Item' : 'Add New Menu Item'}</span>
          </div>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Meal Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <span>📝</span>
              <span>Meal Name</span>
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g., Grilled Chicken Sandwich"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all text-gray-900"
            />
          </div>

          {/* Description */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <span>📄</span>
              <span>Description</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              placeholder="Describe your delicious meal..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all text-gray-900 resize-none"
            />
          </div>

          {/* Price and Restaurant - Two Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <span>💰</span>
                <span>Price (KSh)</span>
                <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="0.00"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all text-gray-900"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <span>🏪</span>
                <span>Restaurant</span>
              </label>
              <select
                value={formData.restaurant_id}
                onChange={(e) => setFormData({...formData, restaurant_id: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all text-gray-900 bg-white cursor-pointer"
              >
                <option value="">Select Restaurant</option>
                {restaurants.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <span>🖼️</span>
              <span>Image URL</span>
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all text-gray-900"
            />
            {formData.image && (
              <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          {/* Ingredients */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <span>🥗</span>
              <span>Ingredients</span>
            </label>
            <input
              type="text"
              value={formData.ingredients}
              onChange={(e) => setFormData({...formData, ingredients: e.target.value})}
              placeholder="e.g., Chicken, Lettuce, Tomato, Mayo"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all text-gray-900"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span className="text-xl">{editingMeal ? '💾' : '➕'}</span>
              <span>{editingMeal ? 'Update Item' : 'Add Item'}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setEditingMeal(null);
              }}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2"
            >
              <span>❌</span>
              <span>Cancel</span>
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AdminMeals;
