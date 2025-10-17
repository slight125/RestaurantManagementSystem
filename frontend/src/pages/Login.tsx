import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    console.log('🔐 Attempting login with:', { email, password: '***' });

    try {
      await login(email, password);
      console.log('✅ Login successful!');
      navigate('/');
    } catch (err: any) {
      console.error('❌ Login error:', err);
      console.error('Error response:', err.response?.data);
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0e5ec 0%, #f5f7fa 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{ maxWidth: '440px', width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🍽️</div>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '0.5rem'
          }}>
            Welcome to TamuEats
          </h2>
          <p style={{ color: '#718096', fontSize: '0.95rem' }}>
            Sign in to your account
          </p>
        </div>
        
        {/* Neumorphic Card */}
        <form 
          onSubmit={handleSubmit}
          style={{
            background: '#e0e5ec',
            borderRadius: '20px',
            padding: '2.5rem',
            boxShadow: '9px 9px 16px rgba(163, 177, 198, 0.6), -9px -9px 16px rgba(255, 255, 255, 0.5)',
          }}
        >
          {error && (
            <div style={{
              background: 'linear-gradient(145deg, #fee2e2, #fecaca)',
              color: '#991b1b',
              padding: '1rem',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              boxShadow: 'inset 3px 3px 7px rgba(163, 177, 198, 0.4), inset -3px -3px 7px rgba(255, 255, 255, 0.3)'
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Email */}
            <div>
              <label 
                htmlFor="email" 
                style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: '600', 
                  color: '#4a5568',
                  marginBottom: '0.5rem'
                }}
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: '#e0e5ec',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  color: '#2d3748',
                  boxShadow: 'inset 3px 3px 7px rgba(163, 177, 198, 0.6), inset -3px -3px 7px rgba(255, 255, 255, 0.5)',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label 
                htmlFor="password" 
                style={{ 
                  display: 'block', 
                  fontSize: '0.875rem', 
                  fontWeight: '600', 
                  color: '#4a5568',
                  marginBottom: '0.5rem'
                }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '1rem',
                  background: '#e0e5ec',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '0.95rem',
                  color: '#2d3748',
                  boxShadow: 'inset 3px 3px 7px rgba(163, 177, 198, 0.6), inset -3px -3px 7px rgba(255, 255, 255, 0.5)',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              marginTop: '2rem',
              padding: '1rem',
              background: 'linear-gradient(145deg, #dc2626, #b91c1c)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '6px 6px 12px rgba(163, 177, 198, 0.6), -6px -6px 12px rgba(255, 255, 255, 0.5)',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '8px 8px 16px rgba(163, 177, 198, 0.6), -8px -8px 16px rgba(255, 255, 255, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '6px 6px 12px rgba(163, 177, 198, 0.6), -6px -6px 12px rgba(255, 255, 255, 0.5)';
            }}
          >
            {loading ? '🔐 Signing in...' : '🚀 Sign in'}
          </button>

          {/* Sign up Link */}
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#718096' }}>
              Don't have an account?{' '}
              <Link 
                to="/register" 
                style={{ 
                  color: '#dc2626', 
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
