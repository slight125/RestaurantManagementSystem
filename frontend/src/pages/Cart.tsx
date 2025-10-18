import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../services/api';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to place an order');
      navigate('/login');
      return;
    }

    if (!deliveryAddress.trim()) {
      alert('Please enter a delivery address');
      return;
    }

    setLoading(true);
    try {
      // Create order with proper type conversion
      const orderData = {
        user_id: user?.id,
        total: getTotal(),
        delivery_address: deliveryAddress,
        status: 'Pending',
        payment_method: 'Cash',
        items: cart.map((item) => {
          const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
          return {
            menu_item_id: item.id,
            quantity: item.quantity,
            price: price,
            subtotal: price * item.quantity,
          };
        }),
      };

      await orderAPI.create(orderData);
      clearCart();
      alert('Order placed successfully!');
      navigate('/');
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f9fafb', 
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}>
        <div style={{ 
          maxWidth: '80rem', 
          margin: '0 auto', 
          padding: '0 1rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '2.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>🛒</div>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              marginBottom: '0.75rem',
              color: '#111827'
            }}>
              Your cart is empty
            </h2>
            <p style={{ 
              color: '#6b7280', 
              marginBottom: '1.25rem',
              fontSize: '0.95rem'
            }}>
              Add some delicious items to get started!
            </p>
            <button
              onClick={() => navigate('/menu')}
              style={{
                backgroundColor: '#dc2626',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontSize: '0.95rem',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#b91c1c';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#dc2626';
              }}
            >
              Browse Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb', 
      paddingTop: '1.5rem',
      paddingBottom: '1.5rem'
    }}>
      <div style={{ 
        maxWidth: '80rem', 
        margin: '0 auto', 
        padding: '0 1rem'
      }}>
        <h1 style={{ 
          fontSize: '1.75rem', 
          fontWeight: '700', 
          color: '#111827', 
          marginBottom: '1.25rem' 
        }}>
          Shopping Cart
        </h1>

        <div className="cart-layout" style={{ 
          display: 'grid', 
          gridTemplateColumns: '2fr 1fr',
          gap: '1.25rem',
          alignItems: 'start'
        }}>
          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {cart.map((item) => {
              const itemPrice = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
              const itemTotal = itemPrice * item.quantity;
              
              return (
              <div
                key={item.id}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '0.75rem',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{ 
                  padding: '0.875rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.875rem' 
                }}>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '5rem',
                        height: '5rem',
                        objectFit: 'cover',
                        borderRadius: '0.5rem'
                      }}
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/96?text=No+Image';
                      }}
                    />
                  )}
                  
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '1rem', 
                      fontWeight: '600', 
                      color: '#111827',
                      marginBottom: '0.25rem'
                    }}>
                      {item.name}
                    </h3>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      KSh {itemPrice.toFixed(2)}
                    </p>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.625rem' 
                  }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '9999px',
                        backgroundColor: '#f3f4f6',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#374151',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#e5e7eb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                      }}
                    >
                      -
                    </button>
                    <span style={{ 
                      width: '2rem', 
                      textAlign: 'center', 
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      color: '#111827'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '9999px',
                        backgroundColor: '#f3f4f6',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: '#374151',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#e5e7eb';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                      }}
                    >
                      +
                    </button>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <p style={{ 
                      fontWeight: '600', 
                      fontSize: '1rem',
                      color: '#111827',
                      marginBottom: '0.375rem'
                    }}>
                      KSh {itemTotal.toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        color: '#dc2626',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#991b1b';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#dc2626';
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
            })}
          </div>

          {/* Order Summary */}
          <div className="cart-summary" style={{ position: 'sticky', top: '5rem' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '0.75rem',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{ padding: '1rem' }}>
                <h2 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: '700', 
                  marginBottom: '0.875rem',
                  color: '#111827'
                }}>
                  Order Summary
                </h2>
                
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '0.625rem', 
                  marginBottom: '0.875rem' 
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    color: '#6b7280',
                    fontSize: '0.875rem'
                  }}>
                    <span>Subtotal</span>
                    <span>KSh {getTotal().toFixed(2)}</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    color: '#6b7280',
                    fontSize: '0.875rem'
                  }}>
                    <span>Delivery Fee</span>
                    <span>KSh 0.00</span>
                  </div>
                  <div style={{ 
                    borderTop: '1px solid #e5e7eb', 
                    paddingTop: '0.625rem', 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontWeight: '700', 
                    fontSize: '1rem',
                    color: '#111827'
                  }}>
                    <span>Total</span>
                    <span style={{ color: '#dc2626' }}>
                      KSh {getTotal().toFixed(2)}
                    </span>
                  </div>
                </div>

                <div style={{ marginBottom: '0.875rem' }}>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.8rem', 
                    fontWeight: '600', 
                    color: '#374151', 
                    marginBottom: '0.375rem' 
                  }}>
                    Delivery Address
                  </label>
                  <textarea
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    rows={2}
                    style={{
                      width: '100%',
                      padding: '0.625rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      outline: 'none',
                      transition: 'border-color 0.2s',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                    placeholder="Enter your delivery address"
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#dc2626';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={loading}
                  style={{
                    width: '100%',
                    backgroundColor: loading ? '#9ca3af' : '#dc2626',
                    color: 'white',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    border: 'none',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.backgroundColor = '#b91c1c';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.backgroundColor = '#dc2626';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {loading ? 'Processing...' : 'Proceed to Checkout'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cart-layout {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .cart-summary {
            position: relative !important;
            top: 0 !important;
          }
          .cart-item {
            padding: 0.875rem !important;
          }
          .cart-item-image {
            width: 5rem !important;
            height: 5rem !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .cart-layout {
            gap: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Cart;
