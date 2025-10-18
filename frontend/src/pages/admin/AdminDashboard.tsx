import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI, restaurantAPI, userAPI, mealAPI } from '../../services/api';
import Card from '../../components/Card';
import Loading from '../../components/Loading';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRestaurants: 0,
    totalUsers: 0,
    totalMeals: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [orders, restaurants, users, meals] = await Promise.all([
        orderAPI.getAll(),
        restaurantAPI.getAll(),
        userAPI.getAll(),
        mealAPI.getAll(),
      ]);

      setStats({
        totalOrders: orders.data.length,
        totalRestaurants: restaurants.data.length,
        totalUsers: users.data.length,
        totalMeals: meals.data.length,
      });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb', 
      padding: '1rem' 
    }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '0.75rem', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)', 
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h1 style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
            fontWeight: 'bold', 
            color: '#111827' 
          }}>
            📊 Admin Dashboard
          </h1>
          <p style={{ color: '#6b7280', marginTop: '0.5rem', fontSize: '0.875rem' }}>
            Welcome to your restaurant management system
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
            fontWeight: 'bold', 
            color: '#111827', 
            marginBottom: '1rem' 
          }}>
            📈 Statistics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="text-3xl sm:text-4xl mr-3 sm:mr-4">📦</div>
              <div>
                <p className="text-gray-600 text-xs sm:text-sm">Total Orders</p>
                <p className="text-2xl sm:text-3xl font-bold text-primary-600">{stats.totalOrders}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="text-3xl sm:text-4xl mr-3 sm:mr-4">🏪</div>
              <div>
                <p className="text-gray-600 text-xs sm:text-sm">Restaurants</p>
                <p className="text-2xl sm:text-3xl font-bold text-green-600">{stats.totalRestaurants}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="text-3xl sm:text-4xl mr-3 sm:mr-4">👥</div>
              <div>
                <p className="text-gray-600 text-xs sm:text-sm">Total Users</p>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="text-3xl sm:text-4xl mr-3 sm:mr-4">🍽️</div>
              <div>
                <p className="text-gray-600 text-xs sm:text-sm">Menu Items</p>
                <p className="text-2xl sm:text-3xl font-bold text-orange-600">{stats.totalMeals}</p>
              </div>
            </div>
          </Card>
        </div>
        </div>

        {/* Management Links */}
        <h2 style={{ 
          fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
          fontWeight: 'bold', 
          color: '#111827', 
          marginBottom: '1rem' 
        }}>
          🎯 Management
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Link to="/admin/orders">
            <Card hover className="p-6 text-center cursor-pointer">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-semibold mb-2">Manage Orders</h3>
              <p className="text-gray-600">View and update order statuses</p>
            </Card>
          </Link>

          <Link to="/admin/restaurants">
            <Card hover className="p-6 text-center cursor-pointer">
              <div className="text-5xl mb-4">🏪</div>
              <h3 className="text-xl font-semibold mb-2">Manage Restaurants</h3>
              <p className="text-gray-600">Add, edit, or remove restaurants</p>
            </Card>
          </Link>

          <Link to="/admin/meals">
            <Card hover className="p-6 text-center cursor-pointer">
              <div className="text-5xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold mb-2">Manage Menu</h3>
              <p className="text-gray-600">Update menu items and prices</p>
            </Card>
          </Link>

          <Link to="/admin/users">
            <Card hover className="p-6 text-center cursor-pointer">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-xl font-semibold mb-2">Manage Users</h3>
              <p className="text-gray-600">View and manage user accounts</p>
            </Card>
          </Link>

          <Link to="/admin/drivers">
            <Card hover className="p-6 text-center cursor-pointer">
              <div className="text-5xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold mb-2">Manage Drivers</h3>
              <p className="text-gray-600">Manage delivery drivers</p>
            </Card>
          </Link>

          <Link to="/admin/cities">
            <Card hover className="p-6 text-center cursor-pointer">
              <div className="text-5xl mb-4">🏙️</div>
              <h3 className="text-xl font-semibold mb-2">Manage Cities</h3>
              <p className="text-gray-600">Add and manage service cities</p>
            </Card>
          </Link>

          <Link to="/admin/comments">
            <Card hover className="p-6 text-center cursor-pointer">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">Manage Reviews</h3>
              <p className="text-gray-600">Moderate customer reviews</p>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
