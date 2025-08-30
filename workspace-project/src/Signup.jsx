import React, { useState } from 'react';

const Signup = ({ onSignup, onSwitchToLogin }) => {
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
      const res = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Signup failed.');
        return;
      }
      onSignup(username);
    } catch (err) {
      setError('Network error.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="auth-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '320px' }}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', width: '220px' }}>
          {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
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
          <button type="submit" style={{ width: '100%', marginTop: '8px' }}>Sign Up</button>
        </form>
        <p style={{ marginTop: '12px' }}>
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', padding: 0 }}>
            Log in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
