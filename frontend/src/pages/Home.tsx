import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff' }}>
      {/* Hero Section - Full Screen with Modern Design */}
      <div className="hero-container" style={{ 
        position: 'relative',
        minHeight: '75vh',
        background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 50%, rgba(15, 52, 96, 0.95) 100%), url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'2\' fill=\'%23dc2626\' opacity=\'0.1\'/%3E%3Ccircle cx=\'50\' cy=\'30\' r=\'3\' fill=\'%23fb923c\' opacity=\'0.1\'/%3E%3Ccircle cx=\'80\' cy=\'60\' r=\'2\' fill=\'%23dc2626\' opacity=\'0.1\'/%3E%3Ccircle cx=\'30\' cy=\'80\' r=\'2.5\' fill=\'%23fb923c\' opacity=\'0.1\'/%3E%3C/g%3E%3C/svg%3E")',
        backgroundSize: 'cover, 100px 100px',
        overflow: 'hidden'
      }}>
        {/* Animated Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 6s ease-in-out infinite'
        }}></div>
        
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(251, 146, 60, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
          animation: 'float 8s ease-in-out infinite reverse'
        }}></div>

        {/* Food Illustrations - Floating Elements */}
        <div style={{
          position: 'absolute',
          top: '15%',
          left: '8%',
          fontSize: '4rem',
          opacity: '0.15',
          animation: 'float 7s ease-in-out infinite',
          transform: 'rotate(-15deg)'
        }}>🍕</div>
        
        <div style={{
          position: 'absolute',
          top: '25%',
          right: '12%',
          fontSize: '3.5rem',
          opacity: '0.15',
          animation: 'float 9s ease-in-out infinite reverse',
          transform: 'rotate(20deg)'
        }}>🍔</div>
        
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '8%',
          fontSize: '3rem',
          opacity: '0.15',
          animation: 'float 8s ease-in-out infinite',
          transform: 'rotate(-10deg)'
        }}>🍜</div>
        
        <div style={{
          position: 'absolute',
          bottom: '30%',
          left: '10%',
          fontSize: '3.5rem',
          opacity: '0.15',
          animation: 'float 10s ease-in-out infinite reverse',
          transform: 'rotate(15deg)'
        }}>🍱</div>

        <div style={{
          position: 'absolute',
          top: '50%',
          left: '5%',
          fontSize: '2.5rem',
          opacity: '0.12',
          animation: 'float 6s ease-in-out infinite',
          transform: 'rotate(-25deg)'
        }}>🍰</div>

        <div style={{
          position: 'absolute',
          top: '40%',
          right: '6%',
          fontSize: '3rem',
          opacity: '0.12',
          animation: 'float 11s ease-in-out infinite reverse',
          transform: 'rotate(25deg)'
        }}>🍣</div>

        <div style={{ 
          position: 'relative',
          zIndex: 10,
          maxWidth: '80rem', 
          margin: '0 auto',
          padding: '4rem 2rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          {/* Main Heading */}
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1.5rem',
            background: 'rgba(220, 38, 38, 0.1)',
            borderRadius: '50px',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            marginBottom: '2rem'
          }}>
            <p style={{ 
              fontSize: '0.9rem',
              fontWeight: '600',
              color: '#fb923c',
              margin: 0,
              letterSpacing: '1px'
            }}>
              🍽️ FAST & FRESH DELIVERY
            </p>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: '900', 
            marginBottom: '1rem',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.02em'
          }}>
            Delicious Food<br/>
            <span style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #fb923c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Delivered Fast
            </span>
          </h1>
          
          <p style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            marginBottom: '2rem',
            color: '#cbd5e1',
            maxWidth: '650px',
            lineHeight: '1.5'
          }}>
            Experience the finest cuisine from top restaurants in your city. 
            Order now and enjoy restaurant-quality meals at home.
          </p>

          {/* CTA Buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem', 
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}>
            {!isAuthenticated ? (
              <>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                  <button style={{
                    padding: '0.9rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '700',
                    borderRadius: '50px',
                    border: 'none',
                    cursor: 'pointer',
                    background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                    color: 'white',
                    boxShadow: '0 20px 40px rgba(220, 38, 38, 0.3)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 25px 50px rgba(220, 38, 38, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(220, 38, 38, 0.3)';
                  }}>
                    Get Started Free →
                  </button>
                </Link>
                <Link to="/restaurants" style={{ textDecoration: 'none' }}>
                  <button style={{
                    padding: '0.9rem 2rem',
                    fontSize: '1rem',
                    fontWeight: '700',
                    borderRadius: '50px',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    cursor: 'pointer',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}>
                    Browse Restaurants
                  </button>
                </Link>
              </>
            ) : (
              <Link to="/menu" style={{ textDecoration: 'none' }}>
                <button style={{
                  padding: '0.9rem 2rem',
                  fontSize: '1rem',
                  fontWeight: '700',
                  borderRadius: '50px',
                  border: 'none',
                  cursor: 'pointer',
                  background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                  color: 'white',
                  boxShadow: '0 20px 40px rgba(220, 38, 38, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(220, 38, 38, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(220, 38, 38, 0.3)';
                }}>
                  Order Now 🍽️
                </button>
              </Link>
            )}
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '2rem',
            maxWidth: '600px',
            width: '100%',
            padding: '1.5rem',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#fb923c', margin: '0 0 0.25rem 0' }}>500+</h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>Restaurants</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#fb923c', margin: '0 0 0.25rem 0' }}>1000+</h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>Menu Items</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', fontWeight: '800', color: '#fb923c', margin: '0 0 0.25rem 0' }}>50K+</h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>Happy Customers</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Modern Cards */}
      <div style={{ 
        padding: '4rem 2rem',
        background: 'linear-gradient(180deg, #ffffff 0%, #fafafa 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative food icons in background */}
        <div style={{
          position: 'absolute',
          top: '5%',
          right: '5%',
          fontSize: '8rem',
          opacity: '0.03',
          transform: 'rotate(15deg)'
        }}>🍕</div>
        <div style={{
          position: 'absolute',
          bottom: '5%',
          left: '5%',
          fontSize: '8rem',
          opacity: '0.03',
          transform: 'rotate(-15deg)'
        }}>🍔</div>

        <div style={{ maxWidth: '80rem', margin: '0 auto', position: 'relative', zIndex: 10 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ 
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: '800', 
              marginBottom: '0.75rem',
              color: '#1a1a2e',
              letterSpacing: '-0.02em'
            }}>
              Why Choose <span style={{ color: '#dc2626' }}>TamuEats</span>?
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
              Experience hassle-free food delivery with premium features
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {/* Feature 1 */}
            <div style={{ 
              background: 'linear-gradient(135deg, #fff5f5 0%, #ffffff 100%)',
              borderRadius: '20px',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              border: '1px solid #fee2e2',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px)';
              e.currentTarget.style.boxShadow = '0 30px 60px rgba(220, 38, 38, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ 
                width: '65px',
                height: '65px',
                background: 'linear-gradient(135deg, #dc2626 0%, #fb923c 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 1.25rem',
                boxShadow: '0 10px 30px rgba(220, 38, 38, 0.3)'
              }}>
                🍕
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.75rem', color: '#1a1a2e' }}>
                Wide Selection
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Access hundreds of restaurants and thousands of delicious dishes at your fingertips
              </p>
            </div>

            {/* Feature 2 */}
            <div style={{ 
              background: 'linear-gradient(135deg, #fffbeb 0%, #ffffff 100%)',
              borderRadius: '20px',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              border: '1px solid #fef3c7',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px)';
              e.currentTarget.style.boxShadow = '0 30px 60px rgba(251, 146, 60, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ 
                width: '65px',
                height: '65px',
                background: 'linear-gradient(135deg, #fb923c 0%, #f59e0b 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 1.25rem',
                boxShadow: '0 10px 30px rgba(251, 146, 60, 0.3)'
              }}>
                ⚡
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.75rem', color: '#1a1a2e' }}>
                Lightning Fast
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Hot, fresh food delivered to your door in 30 minutes or less guaranteed
              </p>
            </div>

            {/* Feature 3 */}
            <div style={{ 
              background: 'linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)',
              borderRadius: '20px',
              padding: '2rem 1.5rem',
              textAlign: 'center',
              border: '1px solid #d1fae5',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px)';
              e.currentTarget.style.boxShadow = '0 30px 60px rgba(16, 185, 129, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{ 
                width: '65px',
                height: '65px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                margin: '0 auto 1.25rem',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
              }}>
                🎯
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '0.75rem', color: '#1a1a2e' }}>
                Easy Ordering
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem' }}>
                Seamless ordering experience with intuitive interface and secure payments
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Modern Gradient */}
      <div style={{ 
        position: 'relative',
        padding: '4rem 2rem',
        background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(22, 33, 62, 0.95) 100%), url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 10 L40 30 L30 50 L20 30 Z\' fill=\'%23dc2626\' opacity=\'0.05\'/%3E%3C/svg%3E")',
        backgroundSize: 'cover, 60px 60px',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)'
        }}></div>

        {/* Decorative food elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          fontSize: '4rem',
          opacity: '0.1',
          animation: 'float 8s ease-in-out infinite'
        }}>🍝</div>
        
        <div style={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          fontSize: '4rem',
          opacity: '0.1',
          animation: 'float 9s ease-in-out infinite reverse'
        }}>🥗</div>

        <div style={{ 
          position: 'relative',
          zIndex: 10,
          maxWidth: '80rem', 
          margin: '0 auto', 
          textAlign: 'center' 
        }}>
          <h2 style={{ 
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: '800', 
            marginBottom: '1rem', 
            color: '#ffffff',
            letterSpacing: '-0.02em'
          }}>
            Ready to <span style={{ 
              background: 'linear-gradient(135deg, #dc2626 0%, #fb923c 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Order</span>?
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: '#cbd5e1', 
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Join thousands of satisfied customers enjoying delicious food today
          </p>
          <Link to="/menu" style={{ textDecoration: 'none' }}>
            <button style={{
              padding: '1rem 2.5rem',
              fontSize: '1.05rem',
              fontWeight: '700',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              color: 'white',
              boxShadow: '0 25px 50px rgba(220, 38, 38, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 30px 60px rgba(220, 38, 38, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 25px 50px rgba(220, 38, 38, 0.4)';
            }}>
              View Full Menu →
            </button>
          </Link>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-20px) rotate(5deg); 
          }
        }
        
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 1; 
          }
          50% { 
            transform: scale(1.05); 
            opacity: 0.9; 
          }
        }

        /* Responsive styles for Home page */
        @media (max-width: 640px) {
          /* Mobile - Extra small screens */
          .hero-container {
            min-height: 60vh !important;
            padding: 2rem 1rem !important;
          }
          .hero-title {
            font-size: 2rem !important;
            line-height: 1.2 !important;
          }
          .hero-subtitle {
            font-size: 1rem !important;
            line-height: 1.5 !important;
          }
          .hero-buttons {
            flex-direction: column !important;
            gap: 0.75rem !important;
            width: 100% !important;
          }
          .hero-button {
            width: 100% !important;
            justify-content: center !important;
          }
          .feature-card {
            padding: 1.5rem !important;
          }
          .feature-icon {
            font-size: 2rem !important;
          }
          .feature-title {
            font-size: 1rem !important;
          }
          .feature-desc {
            font-size: 0.825rem !important;
          }
          .floating-food {
            display: none !important;
          }
          .section-title {
            font-size: 1.75rem !important;
          }
          .section-subtitle {
            font-size: 0.9rem !important;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          /* Tablet - Medium screens */
          .hero-container {
            min-height: 65vh !important;
          }
          .hero-title {
            font-size: 2.75rem !important;
          }
          .hero-subtitle {
            font-size: 1.1rem !important;
          }
          .floating-food {
            font-size: 2.5rem !important;
          }
        }

        @media (min-width: 1025px) {
          /* Desktop - Large screens */
          .hero-container {
            min-height: 75vh !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
