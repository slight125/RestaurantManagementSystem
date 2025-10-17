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
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '2rem' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#111827', marginBottom: '2rem' }}>
          📊 Admin Dashboard
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="text-4xl mr-4">📦</div>
              <div>
                <p className="text-gray-600 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-primary-600">{stats.totalOrders}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="text-4xl mr-4">🏪</div>
              <div>
                <p className="text-gray-600 text-sm">Restaurants</p>
                <p className="text-3xl font-bold text-green-600">{stats.totalRestaurants}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="text-4xl mr-4">👥</div>
              <div>
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="text-4xl mr-4">🍽️</div>
              <div>
                <p className="text-gray-600 text-sm">Menu Items</p>
                <p className="text-3xl font-bold text-orange-600">{stats.totalMeals}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Management Links */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Management</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
