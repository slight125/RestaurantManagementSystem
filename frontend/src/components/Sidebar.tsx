import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiHome, FiUser, FiLogOut, FiSun, FiMoon, FiUsers, FiPieChart,
  FiList, FiTruck, FiMapPin, FiMessageSquare
} from 'react-icons/fi';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  const toggleCollapse = () => setCollapsed(prev => !prev);
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => (
    <Link
      to={to}
      className={`group flex items-center gap-3 p-3 rounded-lg transition-colors ${
        location.pathname === to ? 'bg-gray-700' : 'hover:bg-gray-800'
      }`}
      title={collapsed ? label : ''}
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-[#141414] text-white shadow-xl transition-all duration-300 z-40 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <button
          onClick={toggleCollapse}
          className="text-xl hover:scale-110 transition-transform"
          title="Toggle Sidebar"
        >
          ☰
        </button>
        {!collapsed && <span className="text-lg font-bold tracking-tight">Allan’s Restaurant</span>}
      </div>

      <div className="flex flex-col gap-2 px-2 mt-6 text-gray-300">
        {token && role === 'admin' && (
          <>
            <NavItem to="/admin/analytics" icon={<FiPieChart />} label="Analytics" />
            <NavItem to="/admin/users" icon={<FiUsers />} label="Users" />
          </>
        )}
        {token && (
          <>
            <NavItem to="/meals" icon={<FiList />} label="Meals" />
            <NavItem to="/orders" icon={<FiTruck />} label="Orders" />
            <NavItem to="/restaurants" icon={<FiHome />} label="Restaurants" />
            <NavItem to="/drivers" icon={<FiTruck />} label="Drivers" />
            <NavItem to="/cities" icon={<FiMapPin />} label="Cities & States" />
            <NavItem to="/comments" icon={<FiMessageSquare />} label="Comments" />
            <NavItem to="/profile" icon={<FiUser />} label="Profile" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
              title={collapsed ? 'Logout' : ''}
            >
              <FiLogOut className="text-lg" />
              {!collapsed && <span className="text-sm font-medium">Logout</span>}
            </button>
          </>
        )}
        {!token && (
          <>
            <NavItem to="/login" icon={<FiUser />} label="Login" />
            <NavItem to="/register" icon={<FiUser />} label="Register" />
          </>
        )}
      </div>

      {/* Theme Toggle at bottom */}
      <div className="absolute bottom-4 left-0 w-full flex justify-center">
        <button
          onClick={toggleTheme}
          className="bg-gray-700 p-2 rounded-full hover:scale-110 transition-transform"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <FiMoon /> : <FiSun />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
