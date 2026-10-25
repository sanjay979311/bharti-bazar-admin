


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useLoginMutation } from './authApiSlice';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectIsInitialized } from './authSlice';

import './Login.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [login, { isLoading, error }] = useLoginMutation();
  const user = useSelector(selectCurrentUser);
  const isInitialized = useSelector(selectIsInitialized);

  // --- ROLE-BASED REDIRECT LOGIC ---
  useEffect(() => {
    if (isInitialized && user) {
      if (user.role === 'admin' || user.role === 'superadmin') {
        navigate('/dashboard', { replace: true });
      } else {
        // If they are a standard user, don't let them stay on the login page
        // but don't send them to dashboard either.
        navigate('/unauthorized', { replace: true });
      }
    }
  }, [user, isInitialized, navigate]);

  // If session is still loading, or if user is already logged in, show nothing
  // (This prevents the form flickering before the redirect happens)
  if (!isInitialized || user) {
    return null; 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // The mutation updates Redux, which triggers the useEffect above
      await login({ email, password }).unwrap();
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Admin Portal</h1>
          <p className="login-subtitle">Secure access for administrators only</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message text-red-500 bg-red-50 p-2 rounded mb-4 text-sm">
              {error?.data?.error || error?.data?.message || 'Invalid credentials'}
            </div>
          )}

          <div className="input-group">
            <label className="input-label">Admin Email</label>
            <input
              type="email"
              placeholder="admin@system.com"
              className="login-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;