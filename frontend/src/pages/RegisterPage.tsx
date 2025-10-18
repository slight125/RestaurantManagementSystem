import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }), // ✅ role removed
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Registered successfully!',
          background: '#1a1a1a',
          color: '#00ffcc',
          showConfirmButton: false,
          timer: 2000,
        });
        navigate('/login');
      } else {
        Swal.fire('Error', data.error || 'Registration failed', 'error');
      }
    } catch (err) {
      console.error('Registration error:', err);
      Swal.fire('Error', 'Something went wrong.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-[#181818] border border-[#2c2c2c] rounded-2xl shadow-2xl p-8">
        <h2 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-teal-400 via-pink-500 to-violet-500 bg-clip-text text-center mb-10">
          📝 Register
        </h2>

        <div className="form-control mb-4">
          <label className="label text-sm text-gray-400">Username</label>
          <input
            type="text"
            value={username}
            placeholder="e.g. Slight"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-3 bg-[#101010] text-white border border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 shadow-md transition"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label text-sm text-gray-400">Email</label>
          <input
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-[#101010] text-white border border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 shadow-md transition"
          />
        </div>

        <div className="form-control mb-6">
          <label className="label text-sm text-gray-400">Password</label>
          <input
            type="password"
            value={password}
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#101010] text-white border border-cyan-500 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-400 shadow-md transition"
          />
        </div>

        <button
          onClick={handleRegister}
          className="btn w-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white font-bold py-3 rounded-lg shadow-md hover:scale-[1.03] transition"
        >
          ✨ Register
        </button>

        <p className="text-sm text-gray-400 text-center mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-emerald-400 hover:text-emerald-300 underline transition">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
