import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .mobile-menu {
          animation: slideDown 0.3s ease-out;
        }
        
        @media (min-width: 768px) {
          .hide-mobile {
            display: flex !important;
          }
          .show-mobile {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .hide-mobile {
            display: none !important;
          }
          .show-mobile {
            display: flex !important;
          }
          .mobile-menu.show-mobile {
            display: flex !important;
          }
        }
      `}</style>
      <nav style={{
        backgroundColor: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }} onClick={closeMobileMenu}>
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#dc2626' }}>
              🍽️ TamuEats
            </span>
          </Link>
            
          {/* Desktop Navigation - Hidden on mobile */}
          <div style={{ display: 'flex', gap: '1.5rem' }} className="hide-mobile">
              <Link
                to="/"
                style={{
                  color: location.pathname === '/' ? '#dc2626' : '#374151',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  backgroundColor: location.pathname === '/' ? '#fee2e2' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                Home
              </Link>
              <Link
                to="/restaurants"
                style={{
                  color: location.pathname === '/restaurants' ? '#dc2626' : '#374151',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  backgroundColor: location.pathname === '/restaurants' ? '#fee2e2' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                Restaurants
              </Link>
              <Link
                to="/menu"
                style={{
                  color: location.pathname === '/menu' ? '#dc2626' : '#374151',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  backgroundColor: location.pathname === '/menu' ? '#fee2e2' : 'transparent',
                  transition: 'all 0.2s'
                }}
              >
                Menu
              </Link>
            </div>

            {/* Desktop Right Side - Hidden on mobile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="hide-mobile">
            {/* Cart Icon - Available for all users */}
            {isAuthenticated && (
              <Link
                to="/cart"
                style={{ 
                  position: 'relative', 
                  color: location.pathname === '/cart' ? '#dc2626' : '#374151', 
                  textDecoration: 'none',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.5rem',
                  backgroundColor: location.pathname === '/cart' ? '#fee2e2' : 'transparent',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== '/cart') {
                    e.currentTarget.style.backgroundColor = '#f3f4f6';
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== '/cart') {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <svg
                  style={{ height: '1.5rem', width: '1.5rem' }}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {getItemCount() > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '0rem',
                    right: '0rem',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    borderRadius: '9999px',
                    minWidth: '1.25rem',
                    height: '1.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 0.35rem',
                    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.4)',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}>
                    {getItemCount()}
                  </span>
                )}
              </Link>
            )}

            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/admin"
                    style={{
                      color: location.pathname.startsWith('/admin') ? '#dc2626' : '#374151',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.375rem',
                      backgroundColor: location.pathname.startsWith('/admin') ? '#fee2e2' : 'transparent',
                      transition: 'all 0.2s'
                    }}
                  >
                    Admin Dashboard
                  </Link>
                )}

                <span style={{ fontSize: '0.875rem', color: '#374151' }}>
                  Welcome, <span style={{ fontWeight: '600' }}>{user?.full_name}</span>
                </span>
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: '#dc2626',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{
                    color: '#374151',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '0.375rem'
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={{
                    backgroundColor: '#dc2626',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'background-color 0.2s'
                  }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Right Side - Cart + Hamburger - Shown only on mobile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="show-mobile">
            {/* Mobile Cart */}
            {isAuthenticated && (
              <Link
                to="/cart"
                onClick={closeMobileMenu}
                style={{ 
                  position: 'relative', 
                  color: location.pathname === '/cart' ? '#dc2626' : '#374151', 
                  textDecoration: 'none',
                  padding: '0.5rem',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <svg
                  style={{ height: '1.5rem', width: '1.5rem' }}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {getItemCount() > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '0rem',
                    right: '0rem',
                    backgroundColor: '#dc2626',
                    color: 'white',
                    fontSize: '0.65rem',
                    fontWeight: '700',
                    borderRadius: '9999px',
                    minWidth: '1.125rem',
                    height: '1.125rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 0.25rem',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}>
                    {getItemCount()}
                  </span>
                )}
              </Link>
            )}

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                padding: '0.5rem',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              aria-label="Toggle menu"
            >
              <span style={{
                width: '1.5rem',
                height: '2px',
                backgroundColor: '#374151',
                display: 'block',
                transform: mobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
                transition: 'transform 0.3s ease'
              }}></span>
              <span style={{
                width: '1.5rem',
                height: '2px',
                backgroundColor: '#374151',
                display: 'block',
                opacity: mobileMenuOpen ? 0 : 1,
                transition: 'opacity 0.3s ease'
              }}></span>
              <span style={{
                width: '1.5rem',
                height: '2px',
                backgroundColor: '#374151',
                display: 'block',
                transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
                transition: 'transform 0.3s ease'
              }}></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu - Shown only when menu is open on mobile */}
        {mobileMenuOpen && (
          <div 
            className="mobile-menu show-mobile"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              paddingBottom: '1rem',
              borderTop: '1px solid #e5e7eb',
              paddingTop: '1rem'
            }}
          >
            <Link
              to="/"
              onClick={closeMobileMenu}
              style={{
                color: location.pathname === '/' ? '#dc2626' : '#374151',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: '500',
                padding: '0.75rem 1rem',
                borderRadius: '0.375rem',
                backgroundColor: location.pathname === '/' ? '#fee2e2' : 'transparent',
                display: 'block'
              }}
            >
              🏠 Home
            </Link>
            <Link
              to="/restaurants"
              onClick={closeMobileMenu}
              style={{
                color: location.pathname === '/restaurants' ? '#dc2626' : '#374151',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: '500',
                padding: '0.75rem 1rem',
                borderRadius: '0.375rem',
                backgroundColor: location.pathname === '/restaurants' ? '#fee2e2' : 'transparent',
                display: 'block'
              }}
            >
              🏪 Restaurants
            </Link>
            <Link
              to="/menu"
              onClick={closeMobileMenu}
              style={{
                color: location.pathname === '/menu' ? '#dc2626' : '#374151',
                textDecoration: 'none',
                fontSize: '0.95rem',
                fontWeight: '500',
                padding: '0.75rem 1rem',
                borderRadius: '0.375rem',
                backgroundColor: location.pathname === '/menu' ? '#fee2e2' : 'transparent',
                display: 'block'
              }}
            >
              🍽️ Menu
            </Link>

            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                onClick={closeMobileMenu}
                style={{
                  color: location.pathname.startsWith('/admin') ? '#dc2626' : '#374151',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: '500',
                  padding: '0.75rem 1rem',
                  borderRadius: '0.375rem',
                  backgroundColor: location.pathname.startsWith('/admin') ? '#fee2e2' : 'transparent',
                  display: 'block'
                }}
              >
                ⚙️ Admin Dashboard
              </Link>
            )}

            <div style={{ 
              borderTop: '1px solid #e5e7eb', 
              marginTop: '0.5rem', 
              paddingTop: '0.75rem' 
            }}>
              {isAuthenticated ? (
                <>
                  <div style={{ 
                    padding: '0.75rem 1rem', 
                    fontSize: '0.875rem', 
                    color: '#6b7280',
                    marginBottom: '0.5rem'
                  }}>
                    👤 Hi, <span style={{ fontWeight: '600', color: '#111827' }}>{user?.full_name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      backgroundColor: '#dc2626',
                      color: 'white',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    🚪 Logout
                  </button>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <Link
                    to="/login"
                    onClick={closeMobileMenu}
                    style={{
                      color: '#374151',
                      textDecoration: 'none',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.375rem',
                      backgroundColor: '#f3f4f6',
                      display: 'block',
                      textAlign: 'center'
                    }}
                  >
                    🔑 Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={closeMobileMenu}
                    style={{
                      backgroundColor: '#dc2626',
                      color: 'white',
                      padding: '0.75rem 1rem',
                      borderRadius: '0.375rem',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      textDecoration: 'none',
                      display: 'block',
                      textAlign: 'center'
                    }}
                  >
                    ✨ Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navbar;
