import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contact_phone: '',
    user_type: 'customer',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await authAPI.register(registerData);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to register');
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
      padding: '1.5rem 1rem'
    }}>
      <div style={{
        maxWidth: '480px',
        width: '100%'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🍽️</div>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#2d3748',
            marginBottom: '0.25rem'
          }}>
            Create your account
          </h2>
          <p style={{ color: '#718096', fontSize: '0.875rem' }}>
            Join TamuEats today
          </p>
        </div>
        
        {/* Neumorphic Card */}
        <form 
          onSubmit={handleSubmit}
          style={{
            background: '#e0e5ec',
            borderRadius: '20px',
            padding: '1.75rem',
            boxShadow: '9px 9px 16px rgba(163, 177, 198, 0.6), -9px -9px 16px rgba(255, 255, 255, 0.5)',
          }}
        >
          {error && (
            <div style={{
              background: 'linear-gradient(145deg, #fee2e2, #fecaca)',
              color: '#991b1b',
              padding: '0.75rem',
              borderRadius: '12px',
              marginBottom: '1rem',
              fontSize: '0.875rem',
              boxShadow: 'inset 3px 3px 7px rgba(163, 177, 198, 0.4), inset -3px -3px 7px rgba(255, 255, 255, 0.3)'
            }}>
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {/* Full Name */}
            <div>
              <label 
                htmlFor="full_name" 
                style={{ 
                  display: 'block', 
                  fontSize: '0.8rem', 
                  fontWeight: '600', 
                  color: '#4a5568',
                  marginBottom: '0.35rem'
                }}
              >
                Full Name
              </label>
              <input
                id="full_name"
                name="full_name"
                type="text"
                required
                value={formData.full_name}
                onChange={handleChange}
                placeholder="John Doe"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.875rem',
                  background: '#e0e5ec',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  color: '#2d3748',
                  boxShadow: 'inset 3px 3px 7px rgba(163, 177, 198, 0.6), inset -3px -3px 7px rgba(255, 255, 255, 0.5)',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            {/* Email */}
            <div>
              <label 
                htmlFor="email" 
                style={{ 
                  display: 'block', 
                  fontSize: '0.8rem', 
                  fontWeight: '600', 
                  color: '#4a5568',
                  marginBottom: '0.35rem'
                }}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.875rem',
                  background: '#e0e5ec',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  color: '#2d3748',
                  boxShadow: 'inset 3px 3px 7px rgba(163, 177, 198, 0.6), inset -3px -3px 7px rgba(255, 255, 255, 0.5)',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            {/* Phone Number */}
            <div>
              <label 
                htmlFor="contact_phone" 
                style={{ 
                  display: 'block', 
                  fontSize: '0.8rem', 
                  fontWeight: '600', 
                  color: '#4a5568',
                  marginBottom: '0.35rem'
                }}
              >
                Phone Number
              </label>
              <input
                id="contact_phone"
                name="contact_phone"
                type="tel"
                value={formData.contact_phone}
                onChange={handleChange}
                placeholder="+254 700 000 000"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.875rem',
                  background: '#e0e5ec',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
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
                  fontSize: '0.8rem', 
                  fontWeight: '600', 
                  color: '#4a5568',
                  marginBottom: '0.35rem'
                }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.875rem',
                  background: '#e0e5ec',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  color: '#2d3748',
                  boxShadow: 'inset 3px 3px 7px rgba(163, 177, 198, 0.6), inset -3px -3px 7px rgba(255, 255, 255, 0.5)',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label 
                htmlFor="confirmPassword" 
                style={{ 
                  display: 'block', 
                  fontSize: '0.8rem', 
                  fontWeight: '600', 
                  color: '#4a5568',
                  marginBottom: '0.35rem'
                }}
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.875rem',
                  background: '#e0e5ec',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
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
              marginTop: '1.25rem',
              padding: '0.75rem',
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
            {loading ? '✨ Creating account...' : '🚀 Sign up'}
          </button>

          {/* Sign in Link */}
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <p style={{ fontSize: '0.85rem', color: '#718096' }}>
              Already have an account?{' '}
              <Link 
                to="/login" 
                style={{ 
                  color: '#dc2626', 
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
