import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mealAPI, restaurantAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import type { MenuItem, Restaurant } from '../types';
import Loading from '../components/Loading';

const OrderMeal = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [meal, setMeal] = useState<MenuItem | null>(null);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      fetchMealDetails();
    }
  }, [id]);

  const fetchMealDetails = async () => {
    try {
      console.log('🔍 Fetching meal with ID:', id);
      const response = await mealAPI.getById(Number(id));
      console.log('✅ Meal data received:', response.data);
      const mealData = response.data;
      setMeal(mealData);
      
      if (mealData.restaurant_id) {
        console.log('🔍 Fetching restaurant with ID:', mealData.restaurant_id);
        const restaurantResponse = await restaurantAPI.getById(mealData.restaurant_id);
        console.log('✅ Restaurant data received:', restaurantResponse.data);
        setRestaurant(restaurantResponse.data);
      }
    } catch (err: any) {
      console.error('❌ Error fetching meal details:', err);
      console.error('Error response:', err.response?.data);
      setError('Failed to load meal details');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!meal) return;
    
    for (let i = 0; i < quantity; i++) {
      addToCart(meal);
    }
    
    // Show success toast
    const toast = document.createElement('div');
    toast.textContent = `✅ ${quantity} x ${meal.name} added to cart!`;
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
      font-weight: 600;
      animation: slideIn 0.3s ease-out;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
    
    // Navigate to cart after a short delay
    setTimeout(() => navigate('/cart'), 2200);
  };

  const handleOrderNow = () => {
    if (!meal) return;
    
    for (let i = 0; i < quantity; i++) {
      addToCart(meal);
    }
    navigate('/cart');
  };

  if (loading) return <Loading />;

  if (error || !meal) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f9fafb',
        padding: '1rem'
      }}>
        <div style={{ 
          backgroundColor: '#fee2e2',
          color: '#991b1b',
          padding: '1.5rem 2rem',
          borderRadius: '0.75rem',
          fontSize: '1rem',
          fontWeight: '500',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>😕</div>
          ❌ {error || 'Meal not found'}
          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={() => navigate('/menu')}
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  const totalPrice = Number(meal.price) * quantity;

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb',
      paddingTop: '1rem',
      paddingBottom: '1.5rem'
    }}>
      <div style={{ maxWidth: '72rem', margin: '0 auto', padding: '0 1rem' }}>
        {/* Back Button */}
        <button
          onClick={() => navigate('/menu')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            color: '#6b7280',
            fontSize: '0.85rem',
            fontWeight: '500',
            marginBottom: '0.75rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.35rem',
            borderRadius: '0.375rem',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#dc2626';
            e.currentTarget.style.backgroundColor = '#fee2e2';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#6b7280';
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
        >
          <span style={{ fontSize: '1rem' }}>←</span>
          Back to Menu
        </button>

        <div className="order-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem'
        }}>
          {/* Left Column - Image and Details */}
          <div>
            {/* Main Image */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
              marginBottom: '0.75rem'
            }}>
              <img
                src={meal.image || 'https://via.placeholder.com/800x600?text=🍽️+No+Image'}
                alt={meal.name}
                style={{ 
                  width: '100%', 
                  height: '16rem', 
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/800x600?text=🍽️+No+Image';
                }}
              />
            </div>

            {/* Restaurant Info Card */}
            {restaurant && (
              <div style={{
                backgroundColor: 'white',
                padding: '0.875rem',
                borderRadius: '0.75rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
              }}>
                <h3 style={{ 
                  fontSize: '0.95rem', 
                  fontWeight: '700', 
                  color: '#111827',
                  marginBottom: '0.5rem'
                }}>
                  🏪 From {restaurant.name}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.9rem' }}>📍</span>
                    <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>
                      {restaurant.location}
                    </span>
                  </div>
                  
                  {restaurant.cuisine && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.9rem' }}>🍽️</span>
                      <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>
                        {restaurant.cuisine}
                      </span>
                    </div>
                  )}
                  
                  {restaurant.contact_phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.9rem' }}>📱</span>
                      <span style={{ color: '#6b7280', fontSize: '0.8rem' }}>
                        {restaurant.contact_phone}
                      </span>
                    </div>
                  )}
                  
                  {restaurant.rating && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '0.9rem' }}>⭐</span>
                      <span style={{ 
                        color: '#f59e0b', 
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        {Number(restaurant.rating).toFixed(1)} Rating
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Details */}
          <div>
            <div style={{
              backgroundColor: 'white',
              padding: '1rem',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
              position: 'sticky',
              top: '5rem'
            }}>
              {/* Meal Title */}
              <h1 style={{ 
                fontSize: '1.25rem', 
                fontWeight: '700', 
                color: '#111827',
                marginBottom: '0.5rem',
                lineHeight: '1.3'
              }}>
                {meal.name}
              </h1>

              {/* Price */}
              <div style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                color: '#dc2626',
                marginBottom: '0.75rem'
              }}>
                KSh {Number(meal.price).toFixed(2)}
              </div>

              {/* Status Badge */}
              <div style={{ marginBottom: '0.75rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    backgroundColor: meal.is_available !== false ? '#d1fae5' : '#fee2e2',
                    color: meal.is_available !== false ? '#065f46' : '#991b1b'
                  }}
                >
                  <span style={{ fontSize: '0.5rem' }}>
                    {meal.is_available !== false ? '🟢' : '🔴'}
                  </span>
                  {meal.is_available !== false ? 'Available Now' : 'Currently Unavailable'}
                </span>
              </div>

              {/* Description */}
              {meal.description && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <h3 style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: '600', 
                    color: '#374151',
                    marginBottom: '0.25rem'
                  }}>
                    Description
                  </h3>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '0.8rem',
                    lineHeight: '1.4'
                  }}>
                    {meal.description}
                  </p>
                </div>
              )}

              {/* Ingredients */}
              {meal.ingredients && (
                <div style={{
                  backgroundColor: '#f9fafb',
                  padding: '0.625rem',
                  borderRadius: '0.5rem',
                  marginBottom: '0.75rem'
                }}>
                  <h3 style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: '600', 
                    color: '#374151',
                    marginBottom: '0.25rem'
                  }}>
                    🥘 Ingredients
                  </h3>
                  <p style={{ 
                    color: '#6b7280', 
                    fontSize: '0.75rem',
                    lineHeight: '1.4'
                  }}>
                    {meal.ingredients}
                  </p>
                </div>
              )}

              {/* Quantity Selector */}
              {meal.is_available !== false && (
                <>
                  <div style={{ marginBottom: '0.75rem' }}>
                    <h3 style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: '600', 
                      color: '#374151',
                      marginBottom: '0.4rem'
                    }}>
                      Quantity
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        style={{
                          width: '2.25rem',
                          height: '2.25rem',
                          backgroundColor: quantity <= 1 ? '#f3f4f6' : '#fee2e2',
                          color: quantity <= 1 ? '#9ca3af' : '#dc2626',
                          border: 'none',
                          borderRadius: '0.375rem',
                          fontSize: '1.125rem',
                          fontWeight: '700',
                          cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        −
                      </button>
                      
                      <div style={{
                        flex: 1,
                        textAlign: 'center',
                        fontSize: '1.125rem',
                        fontWeight: '700',
                        color: '#111827'
                      }}>
                        {quantity}
                      </div>
                      
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        style={{
                          width: '2.25rem',
                          height: '2.25rem',
                          backgroundColor: '#d1fae5',
                          color: '#065f46',
                          border: 'none',
                          borderRadius: '0.375rem',
                          fontSize: '1.125rem',
                          fontWeight: '700',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#a7f3d0';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#d1fae5';
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div style={{
                    backgroundColor: '#fef3c7',
                    padding: '0.625rem',
                    borderRadius: '0.5rem',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ 
                      fontSize: '0.9rem', 
                      fontWeight: '600', 
                      color: '#78350f'
                    }}>
                      Total Price
                    </span>
                    <span style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '700', 
                      color: '#dc2626'
                    }}>
                      KSh {totalPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  {isAuthenticated ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <button
                        onClick={handleOrderNow}
                        style={{
                          width: '100%',
                          backgroundColor: '#dc2626',
                          color: 'white',
                          padding: '0.625rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: '700',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.375rem'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#b91c1c';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 10px 20px rgba(220, 38, 38, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#dc2626';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <span style={{ fontSize: '1rem' }}>🛒</span>
                        Order Now
                      </button>

                      <button
                        onClick={handleAddToCart}
                        style={{
                          width: '100%',
                          backgroundColor: 'white',
                          color: '#dc2626',
                          padding: '0.625rem',
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          fontWeight: '700',
                          border: '2px solid #dc2626',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '0.375rem'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#fee2e2';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  ) : (
                    <div style={{
                      textAlign: 'center',
                      padding: '0.875rem',
                      backgroundColor: '#fef3c7',
                      borderRadius: '0.5rem'
                    }}>
                      <p style={{ 
                        color: '#78350f', 
                        marginBottom: '0.5rem',
                        fontWeight: '600',
                        fontSize: '0.8rem'
                      }}>
                        Please login to place an order
                      </p>
                      <button
                        onClick={() => navigate('/login')}
                        style={{
                          backgroundColor: '#dc2626',
                          color: 'white',
                          padding: '0.5rem 1rem',
                          borderRadius: '0.375rem',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Login to Order
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Unavailable Message */}
              {meal.is_available === false && (
                <div style={{
                  textAlign: 'center',
                  padding: '1rem',
                  backgroundColor: '#fee2e2',
                  borderRadius: '0.5rem'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>😔</div>
                  <p style={{ 
                    color: '#991b1b', 
                    fontWeight: '600',
                    fontSize: '0.9rem'
                  }}>
                    This item is currently unavailable
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
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

        /* Responsive styles for OrderMeal page */
        @media (max-width: 768px) {
          /* Mobile & Tablet - Stack layout */
          .order-grid {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
          .order-image {
            height: 14rem !important;
          }
          .order-sticky {
            position: relative !important;
            top: 0 !important;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          /* Tablet landscape - Keep 2 columns but adjust */
          .order-grid {
            gap: 0.875rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default OrderMeal;
