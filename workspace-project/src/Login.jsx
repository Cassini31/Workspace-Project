import React, { useState } from 'react';

const Login = ({ onLogin, onSwitchToSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }
    try {
      const res = await fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Login failed.');
        return;
      }
      // After login, check session persistence by calling /me (or similar)
      const sessionRes = await fetch('http://localhost:4000/me', {
        credentials: 'include'
      });
      if (sessionRes.ok) {
        const userData = await sessionRes.json();
        onLogin(userData.username);
      } else {
        setError('Session could not be established.');
      }
    } catch (err) {
      setError('Network error.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="auth-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '320px' }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '220px' }}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: '100%' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%' }}
          />
          <button type="submit" style={{ width: '100%', marginTop: '8px' }}>Login</button>
        </form>
        {error && <p style={{ color: 'red', marginTop: '12px' }}>{error}</p>}
        <p style={{ marginTop: '12px' }}>
          Don't have an account?{' '}
          <button onClick={onSwitchToSignup} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', padding: 0 }}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
