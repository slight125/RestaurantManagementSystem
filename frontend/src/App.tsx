import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MealsPage from './pages/MealsPage';
import OrdersPage from './pages/OrdersPage';
import AdminAnalyticsPage from './pages/AdminAnalytics';
import AdminUsersPage from './pages/AdminUsersPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import RestaurantsPage from './pages/RestaurantsPage';
import DriversPage from './pages/DriversPage';
import CityAndStatePage from './pages/CityAndStatePage';
import CommentsPage from './pages/CommentsPage';
import Sidebar from './components/Sidebar'; // 👈 Make sure this path is correct

const Unauthorized = () => (
  <div className="flex flex-col items-center justify-center h-96">
    <h1 className="text-4xl font-bold text-error mb-4">Unauthorized</h1>
    <p className="text-lg text-base-content">You do not have permission to view this page.</p>
  </div>
);

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const role = localStorage.getItem('role');
  return role === 'admin' ? <>{children}</> : <Navigate to="/unauthorized" replace />;
};

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen bg-base-200">
        <Sidebar />
        <main
          className={`transition-all duration-300 w-full ${
            collapsed ? 'pl-16' : 'pl-64'
          } px-4 py-6`}
        >
          <Routes>
            <Route path="/meals" element={<MealsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/cities" element={<CityAndStatePage />} />
            <Route
              path="/admin/analytics"
              element={
                <RequireAdmin>
                  <AdminAnalyticsPage />
                </RequireAdmin>
              }
            />
            <Route
              path="/admin/users"
              element={
                <RequireAdmin>
                  <AdminUsersPage />
                </RequireAdmin>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/restaurants" element={<RestaurantsPage />} />
            <Route path="/drivers" element={<DriversPage />} />
            <Route path="/comments" element={<CommentsPage />} />
            <Route
              path="/"
              element={
                <>
                  <div
                    className="fixed inset-0 bg-cover bg-center bg-no-repeat z-[-1]"
                    style={{ backgroundImage: "url('/hero.jpg')" }}
                  />
                  <section className="flex flex-col justify-center items-center text-white text-center min-h-screen relative z-10">
                    <h1 className="text-8xl font-extrabold mb-4 drop-shadow-lg">
                      Welcome to Allan’s Restaurant
                    </h1>
                    <p className="text-xl mb-6 drop-shadow-md">
                      Savory meals.     Stylish vibes.      Swift delivery.
                    </p>
                    <a
                      href="/meals"
                      className="btn px-8 py-3 text-lg font-semibold rounded-full text-white bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-pink-600 hover:to-indigo-600 shadow-lg transition-transform hover:scale-105"
                    >
                      🍽️ Explore Our Menu
                    </a>
                  </section>
                </>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
