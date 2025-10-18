import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { icon: '📊', label: 'Dashboard', path: '/admin', exact: true },
    { icon: '👥', label: 'Users', path: '/admin/users' },
    { icon: '🏪', label: 'Restaurants', path: '/admin/restaurants' },
    { icon: '🍽️', label: 'Menu Items', path: '/admin/meals' },
    { icon: '🚗', label: 'Drivers', path: '/admin/drivers' },
    { icon: '📦', label: 'Orders', path: '/admin/orders' },
    { icon: '🏙️', label: 'Cities', path: '/admin/cities' },
    { icon: '⭐', label: 'Reviews', path: '/admin/comments' }
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div style={{
      width: isCollapsed ? '85px' : '280px',
      height: '100vh',
      backgroundColor: '#1e293b',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      zIndex: 1000,
      boxShadow: '4px 0 12px rgba(0,0,0,0.15)',
      overflow: 'hidden'
    }}>
      <div style={{
        padding: isCollapsed ? '1.5rem 0.75rem' : '1.75rem 1.5rem',
        borderBottom: '1px solid #334155',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
          <span style={{ fontSize: '2rem' }}>🍴</span>
          {!isCollapsed && (
            <div>
              <h2 style={{ fontSize: '1.375rem', fontWeight: '700', margin: 0 }}>Admin Panel</h2>
              <p style={{ fontSize: '0.8rem', color: '#fecaca', margin: 0 }}>Restaurant Manager</p>
            </div>
          )}
        </div>
        
        {/* Hamburger Menu Button */}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            alignItems: 'center',
            justifyContent: 'center',
            width: '32px',
            height: '32px',
            transition: 'all 0.3s ease'
          }}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <span style={{
            width: '20px',
            height: '2px',
            backgroundColor: 'white',
            borderRadius: '2px',
            transition: 'all 0.3s ease',
            transform: isCollapsed ? 'rotate(0deg)' : 'rotate(0deg)',
            display: 'block'
          }}></span>
          <span style={{
            width: '20px',
            height: '2px',
            backgroundColor: 'white',
            borderRadius: '2px',
            transition: 'all 0.3s ease',
            opacity: isCollapsed ? '1' : '1',
            display: 'block'
          }}></span>
          <span style={{
            width: '20px',
            height: '2px',
            backgroundColor: 'white',
            borderRadius: '2px',
            transition: 'all 0.3s ease',
            transform: isCollapsed ? 'rotate(0deg)' : 'rotate(0deg)',
            display: 'block'
          }}></span>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav style={{ 
        flex: 1, 
        padding: isCollapsed ? '0.75rem 0' : '0.75rem 0', 
        overflowY: 'hidden',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
      }}>
        {menuItems.map((item) => (
          <Link key={item.path} to={item.path} style={{
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.75rem',
            padding: isCollapsed ? '0.75rem 0' : '0.75rem 1.25rem', 
            margin: isCollapsed ? '0.25rem 0.5rem' : '0.15rem 0.75rem', 
            borderRadius: '0.5rem',
            textDecoration: 'none', 
            fontSize: '0.9rem', 
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            color: isActive(item.path, item.exact) ? 'white' : '#cbd5e1',
            backgroundColor: isActive(item.path, item.exact) ? '#dc2626' : 'transparent',
            fontWeight: isActive(item.path, item.exact) ? '600' : '500',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            boxShadow: isActive(item.path, item.exact) ? '0 4px 12px rgba(220,38,38,0.3)' : 'none',
            position: 'relative'
          }} 
          title={isCollapsed ? item.label : ''}
          onMouseEnter={(e) => {
            if (!isActive(item.path, item.exact)) {
              e.currentTarget.style.backgroundColor = '#334155';
              e.currentTarget.style.color = 'white';
              if (!isCollapsed) {
                e.currentTarget.style.transform = 'translateX(4px)';
              }
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive(item.path, item.exact)) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#cbd5e1';
              e.currentTarget.style.transform = 'translateX(0)';
            }
          }}
          >
            <span style={{ 
              fontSize: isCollapsed ? '1.35rem' : '1.25rem',
              transition: 'all 0.3s ease'
            }}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <span style={{ 
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {item.label}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div style={{ 
        borderTop: '1px solid #334155', 
        padding: isCollapsed ? '0.75rem 0.5rem' : '1rem', 
        background: '#0f172a',
        flexShrink: 0
      }}>
        {!isCollapsed && (
          <Link
            to="/admin/profile"
            style={{
              padding: '0.65rem', 
              backgroundColor: '#1e293b',
              borderRadius: '0.5rem', 
              marginBottom: '0.75rem', 
              border: '1px solid #334155',
              transition: 'all 0.3s ease',
              display: 'block',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#334155';
              e.currentTarget.style.borderColor = '#475569';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#1e293b';
              e.currentTarget.style.borderColor = '#334155';
            }}
          >
            <p style={{ fontSize: '0.85rem', fontWeight: '600', margin: 0, color: '#f1f5f9' }}>
              👤 {user?.full_name || 'Admin User'}
            </p>
            <p style={{ fontSize: '0.7rem', color: '#94a3b8', margin: '0.25rem 0 0 0' }}>
              {user?.email || 'admin@restaurant.com'}
            </p>
          </Link>
        )}
        
        {isCollapsed && (
          <Link
            to="/admin/profile"
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '0.75rem',
              textDecoration: 'none'
            }}
          >
            <span 
              style={{ 
                fontSize: '1.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                backgroundColor: '#1e293b',
                borderRadius: '50%',
                border: '2px solid #334155',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#334155';
                e.currentTarget.style.borderColor = '#475569';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1e293b';
                e.currentTarget.style.borderColor = '#334155';
              }}
            >
              👤
            </span>
          </Link>
        )}
        
        <button 
          onClick={handleLogout} 
          style={{
            width: '100%', 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            gap: '0.65rem', 
            padding: isCollapsed ? '0.75rem' : '0.85rem', 
            backgroundColor: '#dc2626',
            color: 'white', 
            border: 'none', 
            borderRadius: '0.5rem',
            fontWeight: '600', 
            fontSize: '0.9rem', 
            cursor: 'pointer',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
            boxShadow: '0 4px 12px rgba(220,38,38,0.3)'
          }} 
          title={isCollapsed ? 'Logout' : ''}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#b91c1c';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#dc2626';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(220,38,38,0.3)';
          }}
        >
          <span style={{ fontSize: isCollapsed ? '1.35rem' : '1.25rem' }}>🚪</span>
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
