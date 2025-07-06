import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  function getTimeIcon(): React.ReactNode {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return '🌅';
    if (hour >= 12 && hour < 18) return '🌞';
    if (hour >= 18 && hour < 21) return '🌇';
    return '🌙';
  }

  return (
    <nav className="navbar flex justify-between items-center bg-base-100 shadow-md px-6 py-4 transition-colors duration-300">
      {/* Brand */}
      <div className="text-3xl font-extrabold tracking-wide drop-shadow-sm transition-all duration-300">
        <Link to="/" className="flex items-center gap-2 hover:animate-rainbow">
          <span className="text-8xl">{getTimeIcon()}</span>
          <span className="rainbow-text text-4xl md:text-5xl lg:text-6xl">
            Allan’s Restaurant
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-circle btn-sm bg-base-200 border-none text-xl hover:bg-base-300 transition-transform duration-300"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? '🌚' : '🌞'}
        </button>

        {token ? (
          <>
            {role === 'admin' && (
              <>
                <Link to="/admin/analytics" className="link link-hover text-sm text-primary">
                  Analytics
                </Link>
                <Link to="/admin/users" className="link link-hover text-sm text-primary">
                  Users
                </Link>
              </>
            )}
            <Link to="/meals" className="link link-hover text-sm text-primary">
              Meals
            </Link>
            <Link to="/orders" className="link link-hover text-sm text-primary">
              Orders
            </Link>
            <Link to="/restaurants" className="link link-hover text-sm text-primary">
              Restaurants
            </Link>
            <Link to="/drivers" className="link link-hover text-sm text-primary">
              Drivers
            </Link>
            <Link to="/cities" className="link link-hover text-sm text-primary">
              Cities & States
            </Link>
            <Link to="/profile" className="link link-hover text-sm text-primary">
              Profile
            </Link>
            <Link to="/comments" className="link link-hover text-sm text-primary">
  Comments
</Link>

            <button
              onClick={handleLogout}
              className="btn btn-sm rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all shadow"
            >
              🚪 Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-sm rounded-full bg-rose-500 text-white hover:bg-rose-600 transition-all shadow-md"
            >
              🔐 Login
            </Link>
            <Link
              to="/register"
              className="btn btn-sm rounded-full bg-yellow-400 text-gray-900 hover:bg-yellow-300 transition-all shadow-md"
            >
              🧾 Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
