import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import AdminLayout from './layouts/AdminLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Restaurants from './pages/Restaurants';
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import OrderMeal from './pages/OrderMeal';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminMeals from './pages/admin/AdminMeals';
import AdminUsers from './pages/admin/AdminUsers';
import AdminDrivers from './pages/admin/AdminDrivers';
import AdminCities from './pages/admin/AdminCities';
import AdminRestaurants from './pages/admin/AdminRestaurants';
import AdminComments from './pages/admin/AdminComments';
import AdminProfile from './pages/admin/AdminProfile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Admin Routes - No Navbar/Footer, has Sidebar */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="meals" element={<AdminMeals />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="drivers" element={<AdminDrivers />} />
              <Route path="cities" element={<AdminCities />} />
              <Route path="restaurants" element={<AdminRestaurants />} />
              <Route path="comments" element={<AdminComments />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>

            {/* Public Routes - With Navbar/Footer, no Sidebar */}
            <Route
              path="*"
              element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/restaurants" element={<Restaurants />} />
                      <Route path="/menu" element={<Menu />} />
                      <Route path="/order/:id" element={<OrderMeal />} />
                      <Route
                        path="/cart"
                        element={
                          <ProtectedRoute>
                            <Cart />
                          </ProtectedRoute>
                        }
                      />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
