import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userId', data.userId);
        navigate('/meals');
      } else {
        Swal.fire('Login Failed', data.message || 'Invalid credentials', 'error');
      }
    } catch (err) {
      console.error('Login error:', err);
      Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-4 py-8 text-white">
      <div className="w-full max-w-md bg-[#181818] border border-[#2c2c2c] rounded-2xl shadow-2xl p-8">
        <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-center mb-10">
          🔐 Login to Allan’s Restaurant
        </h2>

        <div className="form-control mb-5">
          <label className="label text-sm text-gray-400">Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 bg-[#101010] text-white border border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 shadow-md transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div className="form-control mb-6">
          <label className="label text-sm text-gray-400">Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 bg-[#101010] text-white border border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 shadow-md transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </div>

        <button
          onClick={handleLogin}
          className="btn w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-black font-bold py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-[1.02] transition"
        >
          🚀 Login
        </button>

        <p className="text-center text-sm text-gray-400 mt-6">
          No account?{' '}
          <a
            href="/register"
            className="text-emerald-400 hover:text-emerald-300 underline transition"
          >
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
