import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mealAPI, restaurantAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import type { MenuItem, Restaurant } from '../types';
import Loading from '../components/Loading';

const Menu = () => {
  const [meals, setMeals] = useState<MenuItem[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<MenuItem[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterMeals();
  }, [meals, selectedRestaurant, searchQuery]);

  const fetchData = async () => {
    try {
      const [mealsResponse, restaurantsResponse] = await Promise.all([
        mealAPI.getAll(),
        restaurantAPI.getAll()
      ]);
      setMeals(mealsResponse.data);
      setRestaurants(restaurantsResponse.data);
      setFilteredMeals(mealsResponse.data);
    } catch (err) {
      setError('Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  const filterMeals = () => {
    let filtered = [...meals];

    // Filter by restaurant
    if (selectedRestaurant) {
      filtered = filtered.filter(meal => meal.restaurant_id === selectedRestaurant);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(meal => 
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.ingredients?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMeals(filtered);
  };

  const handleAddToCart = (meal: MenuItem) => {
    addToCart(meal);
    // Create a simple toast notification
    const toast = document.createElement('div');
    toast.textContent = `✅ ${meal.name} added to cart!`;
    toast.style.cssText = `
      position: fixed;
      top: 5rem;
      right: 1rem;
      background: #10b981;
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 10px 15px rgba(0,0,0,0.1);
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  };

  const getRestaurantName = (restaurantId?: number) => {
    if (!restaurantId) return 'Unknown Restaurant';
    const restaurant = restaurants.find(r => r.id === restaurantId);
    return restaurant?.name || 'Unknown Restaurant';
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
        <div style={{ 
          backgroundColor: '#fee2e2',
          color: '#991b1b',
          padding: '1rem 2rem',
          borderRadius: '0.5rem',
          fontSize: '1rem',
          fontWeight: '500'
        }}>
          ❌ {error}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
            Our Menu
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>
            Explore {filteredMeals.length} delicious items from {restaurants.length} amazing restaurants
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ position: 'relative', maxWidth: '32rem' }}>
            <input
              type="text"
              placeholder="🔍 Search for food, ingredients, or cuisine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                paddingLeft: '1rem',
                fontSize: '0.95rem',
                border: '2px solid #e5e7eb',
                borderRadius: '0.75rem',
                outline: 'none',
                transition: 'all 0.2s',
                backgroundColor: 'white'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#dc2626';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e5e7eb';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>
        </div>

        {/* Restaurant Filter Pills */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '0.75rem',
            alignItems: 'center'
          }}>
            <span style={{ 
              fontSize: '0.875rem', 
              fontWeight: '600', 
              color: '#6b7280',
              marginRight: '0.5rem'
            }}>
              Filter by Restaurant:
            </span>
            
            <button
              onClick={() => setSelectedRestaurant(null)}
              style={{
                padding: '0.625rem 1.25rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: '600',
                border: '2px solid',
                borderColor: selectedRestaurant === null ? '#dc2626' : '#e5e7eb',
                backgroundColor: selectedRestaurant === null ? '#dc2626' : 'white',
                color: selectedRestaurant === null ? 'white' : '#374151',
                cursor: 'pointer',
                transition: 'all 0.2s',
                outline: 'none'
              }}
              onMouseEnter={(e) => {
                if (selectedRestaurant !== null) {
                  e.currentTarget.style.borderColor = '#dc2626';
                  e.currentTarget.style.color = '#dc2626';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedRestaurant !== null) {
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.color = '#374151';
                }
              }}
            >
              All Restaurants ({meals.length})
            </button>

            {restaurants.map((restaurant) => {
              const itemCount = meals.filter(m => m.restaurant_id === restaurant.id).length;
              const isSelected = selectedRestaurant === restaurant.id;
              
              return (
                <button
                  key={restaurant.id}
                  onClick={() => setSelectedRestaurant(restaurant.id)}
                  style={{
                    padding: '0.625rem 1.25rem',
                    borderRadius: '9999px',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    border: '2px solid',
                    borderColor: isSelected ? '#dc2626' : '#e5e7eb',
                    backgroundColor: isSelected ? '#dc2626' : 'white',
                    color: isSelected ? 'white' : '#374151',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    outline: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#dc2626';
                      e.currentTarget.style.color = '#dc2626';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = '#e5e7eb';
                      e.currentTarget.style.color = '#374151';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {restaurant.name}
                  <span style={{
                    backgroundColor: isSelected ? 'rgba(255,255,255,0.3)' : '#f3f4f6',
                    color: isSelected ? 'white' : '#6b7280',
                    padding: '0.125rem 0.5rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '700'
                  }}>
                    {itemCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Menu Grid */}
        <div className="menu-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1rem'
        }}>
          {filteredMeals.map((meal) => (
            <div
              key={meal.id}
              onClick={() => navigate(`/order/${meal.id}`)}
              style={{
                backgroundColor: 'white',
                borderRadius: '0.75rem',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.06)',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                border: '1px solid #e5e7eb',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.06)';
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative' }}>
                {meal.image && (
                  <img
                    src={meal.image}
                    alt={meal.name}
                    style={{ 
                      width: '100%', 
                      height: '10rem', 
                      objectFit: 'cover'
                    }}
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x300?text=🍽️+No+Image';
                    }}
                  />
                )}
                
                {/* Restaurant Badge */}
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  left: '0.5rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  padding: '0.25rem 0.625rem',
                  borderRadius: '9999px',
                  fontSize: '0.65rem',
                  fontWeight: '600'
                }}>
                  🏪 {getRestaurantName(meal.restaurant_id)}
                </div>

                {/* Price Badge */}
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '9999px',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                }}>
                  KSh {Number(meal.price).toFixed(0)}
                </div>
              </div>
              
              <div style={{ padding: '1rem' }}>
                {/* Title */}
                <h3 style={{ 
                  fontSize: '1.05rem', 
                  fontWeight: '700', 
                  color: '#111827',
                  marginBottom: '0.375rem',
                  lineHeight: '1.3'
                }}>
                  {meal.name}
                </h3>
                
                {/* Description */}
                {meal.description && (
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '0.8rem', 
                    marginBottom: '0.5rem',
                    lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {meal.description}
                  </p>
                )}
                
                {/* Ingredients */}
                {meal.ingredients && (
                  <div style={{
                    backgroundColor: '#f9fafb',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    marginBottom: '0.75rem'
                  }}>
                    <p style={{ 
                      color: '#6b7280', 
                      fontSize: '0.7rem',
                      lineHeight: '1.3',
                      display: '-webkit-box',
                      WebkitLineClamp: '1',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      <span style={{ fontWeight: '600', color: '#374151' }}>🥘 Ingredients:</span> {meal.ingredients}
                    </p>
                  </div>
                )}
                
                {/* Footer */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '0.75rem',
                  gap: '0.5rem'
                }}>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '9999px',
                      fontSize: '0.7rem',
                      fontWeight: '600',
                      backgroundColor: meal.is_available !== false ? '#d1fae5' : '#fee2e2',
                      color: meal.is_available !== false ? '#065f46' : '#991b1b'
                    }}
                  >
                    <span style={{ fontSize: '0.45rem' }}>
                      {meal.is_available !== false ? '🟢' : '🔴'}
                    </span>
                    {meal.is_available !== false ? 'Available' : 'Unavailable'}
                  </span>
                  
                  {isAuthenticated && meal.is_available !== false && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(meal);
                      }}
                      style={{
                        backgroundColor: '#dc2626',
                        color: 'white',
                        padding: '0.5rem 0.875rem',
                        borderRadius: '0.375rem',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.375rem'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#b91c1c';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#dc2626';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <span>🛒</span>
                      Add
                    </button>
                  )}

                  {!isAuthenticated && (
                    <span style={{
                      color: '#9ca3af',
                      fontSize: '0.65rem',
                      fontStyle: 'italic'
                    }}>
                      Login to order
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredMeals.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 1rem',
            backgroundColor: 'white',
            borderRadius: '1rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              No items found
            </h3>
            <p style={{ color: '#6b7280', fontSize: '1rem', marginBottom: '1.5rem' }}>
              Try adjusting your filters or search query
            </p>
            <button
              onClick={() => {
                setSelectedRestaurant(null);
                setSearchQuery('');
              }}
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Add CSS for toast animations and responsive styles */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        /* Responsive styles for Menu page */
        @media (max-width: 640px) {
          /* Mobile phones */
          .menu-grid {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
          .filter-select {
            font-size: 0.875rem !important;
            padding: 0.625rem !important;
          }
          .search-input {
            font-size: 0.875rem !important;
            padding: 0.625rem !important;
          }
        }

        @media (min-width: 641px) and (max-width: 768px) {
          /* Small tablets */
          .menu-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.875rem !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          /* Tablets */
          .menu-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 1rem !important;
          }
        }

        @media (min-width: 1025px) and (max-width: 1280px) {
          /* Small desktop */
          .menu-grid {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }

        @media (min-width: 1281px) {
          /* Large desktop */
          .menu-grid {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Menu;
