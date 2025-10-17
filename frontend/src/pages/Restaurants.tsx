import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { restaurantAPI } from '../services/api';
import type { Restaurant } from '../types';
import Loading from '../components/Loading';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await restaurantAPI.getAll();
      setRestaurants(response.data);
    } catch (err) {
      setError('Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f9fafb'
      }}>
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
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom, #fef2f2 0%, #f9fafb 100%)',
      paddingTop: '2rem',
      paddingBottom: '3rem'
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        {/* Header Section with Animation */}
        <div style={{ 
          marginBottom: '2rem',
          textAlign: 'center',
          animation: 'fadeInDown 0.6s ease-out'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: '600',
            marginBottom: '1rem',
            boxShadow: '0 2px 8px rgba(220, 38, 38, 0.15)'
          }}>
            <span style={{ fontSize: '1.25rem' }}>🏪</span>
            <span>Featured Restaurants</span>
          </div>
          
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '800', 
            color: '#111827',
            marginBottom: '0.75rem',
            background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f97316 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Discover Amazing Restaurants
          </h1>
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#6b7280',
            maxWidth: '42rem',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Choose from our curated selection of top-rated restaurants offering delicious cuisines. 
            <span style={{ color: '#dc2626', fontWeight: '600' }}> Order now</span> and enjoy!
          </p>
          
          {/* Stats Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            marginTop: '1.5rem',
            flexWrap: 'wrap'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
            }}>
              <span style={{ fontSize: '1.5rem' }}>🍽️</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#dc2626' }}>
                  {restaurants.length}+
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>
                  Restaurants
                </div>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
            }}>
              <span style={{ fontSize: '1.5rem' }}>⭐</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#dc2626' }}>
                  4.5+
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>
                  Avg Rating
                </div>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.25rem',
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
            }}>
              <span style={{ fontSize: '1.5rem' }}>🚀</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#dc2626' }}>
                  Fast
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>
                  Delivery
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Restaurants Grid */}
        <div className="restaurant-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {restaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className="restaurant-card"
              style={{
                backgroundColor: 'white',
                borderRadius: '1.25rem',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                overflow: 'hidden',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                border: '2px solid transparent',
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(220, 38, 38, 0.2)';
                e.currentTarget.style.borderColor = '#dc2626';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              {/* Floating Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                zIndex: 10,
                display: 'flex',
                gap: '0.5rem'
              }}>
                <div style={{
                  backgroundColor: 'white',
                  padding: '0.375rem 0.75rem',
                  borderRadius: '9999px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <span style={{ fontSize: '0.875rem' }}>⭐</span>
                  <span style={{ 
                    color: '#dc2626', 
                    fontWeight: '700',
                    fontSize: '0.875rem'
                  }}>
                    {restaurant.rating ? Number(restaurant.rating).toFixed(1) : 'New'}
                  </span>
                </div>
              </div>

              {/* Restaurant Header with Enhanced Gradient */}
              <div style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 50%, #f97316 100%)',
                padding: '2rem 1.25rem 1.25rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Decorative Pattern */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                  pointerEvents: 'none'
                }} />
                
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '800', 
                    color: 'white',
                    margin: '0 0 0.75rem 0',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }}>
                    {restaurant.name}
                  </h3>
                  
                  {/* Cuisine Badge */}
                  {restaurant.cuisine && (
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.25)',
                      color: 'white',
                      padding: '0.375rem 0.875rem',
                      borderRadius: '9999px',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)'
                    }}>
                      <span>🍽️</span>
                      <span>{restaurant.cuisine}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Restaurant Details */}
              <div style={{ padding: '1.25rem' }}>
                {/* Location */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  marginBottom: '0.875rem',
                  padding: '0.75rem',
                  backgroundColor: '#fef2f2',
                  borderRadius: '0.75rem',
                  border: '1px solid #fee2e2'
                }}>
                  <div style={{
                    backgroundColor: '#dc2626',
                    color: 'white',
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '0.625rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.125rem',
                    flexShrink: 0,
                    boxShadow: '0 4px 8px rgba(220, 38, 38, 0.25)'
                  }}>
                    📍
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      fontSize: '0.6875rem', 
                      color: '#9ca3af',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '0.125rem'
                    }}>
                      Location
                    </div>
                    <div style={{ 
                      fontSize: '0.9375rem', 
                      color: '#111827',
                      fontWeight: '600',
                      lineHeight: '1.3'
                    }}>
                      {restaurant.location}
                    </div>
                  </div>
                </div>
                
                {/* Contact Information Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: restaurant.email ? 'repeat(2, 1fr)' : '1fr',
                  gap: '0.75rem',
                  marginBottom: '1rem'
                }}>
                  {/* Contact Phone */}
                  {restaurant.contact_phone && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      padding: '0.625rem',
                      backgroundColor: '#eff6ff',
                      borderRadius: '0.625rem',
                      border: '1px solid #dbeafe'
                    }}>
                      <div style={{
                        backgroundColor: '#2563eb',
                        color: 'white',
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.875rem',
                        flexShrink: 0
                      }}>
                        📱
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ 
                          fontSize: '0.625rem', 
                          color: '#6b7280',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '0.125rem'
                        }}>
                          Phone
                        </div>
                        <div style={{ 
                          fontSize: '0.75rem', 
                          color: '#111827',
                          fontWeight: '600',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {restaurant.contact_phone}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Email */}
                  {restaurant.email && (
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.5rem',
                      padding: '0.625rem',
                      backgroundColor: '#fef9c3',
                      borderRadius: '0.625rem',
                      border: '1px solid #fef08a'
                    }}>
                      <div style={{
                        backgroundColor: '#f59e0b',
                        color: 'white',
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.875rem',
                        flexShrink: 0
                      }}>
                        ✉️
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ 
                          fontSize: '0.625rem', 
                          color: '#6b7280',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '0.125rem'
                        }}>
                          Email
                        </div>
                        <div style={{ 
                          fontSize: '0.75rem', 
                          color: '#111827',
                          fontWeight: '600',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}>
                          {restaurant.email}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Status Badge and Action Buttons */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginTop: '1.25rem'
                }}>
                  {/* Status Badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                    padding: '0.5rem 0.875rem',
                    backgroundColor: '#d1fae5',
                    color: '#065f46',
                    borderRadius: '9999px',
                    fontSize: '0.8125rem',
                    fontWeight: '700',
                    border: '2px solid #10b981',
                    flex: '0 0 auto'
                  }}>
                    <span style={{
                      width: '0.5rem',
                      height: '0.5rem',
                      borderRadius: '9999px',
                      backgroundColor: '#10b981',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }} />
                    Open Now
                  </div>

                  {/* View Menu Button */}
                  <Link
                    to={`/restaurants/${restaurant.id}/menu`}
                    style={{
                      flex: 1,
                      textDecoration: 'none'
                    }}
                  >
                    <button
                      style={{
                        width: '100%',
                        padding: '0.75rem 1.25rem',
                        backgroundColor: '#dc2626',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.75rem',
                        fontSize: '0.9375rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(220, 38, 38, 0.25)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#b91c1c';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(220, 38, 38, 0.35)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#dc2626';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.25)';
                      }}
                    >
                      <span>View Menu</span>
                      <span style={{ fontSize: '1.125rem' }}>→</span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {restaurants.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 1.5rem',
            backgroundColor: 'white',
            borderRadius: '1.25rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
            border: '2px dashed #e5e7eb',
            maxWidth: '28rem',
            margin: '3rem auto'
          }}>
            <div style={{ 
              fontSize: '4rem', 
              marginBottom: '1rem',
              animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
            }}>
              🏪
            </div>
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              color: '#111827',
              marginBottom: '0.75rem'
            }}>
              No Restaurants Available
            </h3>
            <p style={{ 
              color: '#6b7280', 
              fontSize: '1rem',
              lineHeight: '1.6',
              marginBottom: '1.5rem'
            }}>
              We're working hard to bring amazing restaurants to your area. Check back soon!
            </p>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: '#fef2f2',
              color: '#dc2626',
              padding: '0.75rem 1.5rem',
              borderRadius: '9999px',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}>
              <span>🔔</span>
              <span>Coming Soon</span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        /* Animations */
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        /* Responsive Styles */
        @media (max-width: 640px) {
          .restaurant-grid {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .restaurant-card {
            animation: fadeInUp 0.5s ease-out backwards !important;
          }
        }
        
        @media (min-width: 641px) and (max-width: 768px) {
          .restaurant-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.25rem !important;
          }
        }
        
        @media (min-width: 769px) and (max-width: 1024px) {
          .restaurant-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
        }
        
        @media (min-width: 1025px) and (max-width: 1400px) {
          .restaurant-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Restaurants;
