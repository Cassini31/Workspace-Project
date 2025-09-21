/* This .jsx file will import and render different components to the HTML structure. */

import { StrictMode } from 'react' /* Warns about potential problems in the code while developing. */
import { createRoot } from 'react-dom/client' /* Pulls in the function that tells React where in the HTML to show the app. */
import './index.css' /* Loads the CSS file that contains the styles for the app. */
import CalendarTable from './calendar-table.jsx' /* Brings in CalendarTable component so it can be shown on the screen. */
import React, { useState } from 'react';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

const AppEntry = () => {
  const [user, setUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  React.useEffect(() => {
    // On mount, check if session is valid
    fetch('http://localhost:4000/me', { credentials: 'include' })
      .then(res => {
        if (!res.ok) throw new Error('Not authenticated');
        return res.json();
      })
      .then(data => {
        if (data && data.username) setUser(data.username);
      })
      .catch(() => {
        setUser(null);
        console.log('Please input user credentials to login.');
      });
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:4000/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch {}
    setUser(null);
  };

  if (!user) {
    return showSignup ? (
      <Signup
        onSignup={(username) => {
          setUser(username);
          setShowSignup(false);
        }}
        onSwitchToLogin={() => setShowSignup(false)}
      />
    ) : (
      <Login
        onLogin={(username) => setUser(username)}
        onSwitchToSignup={() => setShowSignup(true)}
      />
    );
  }
  return <CalendarTable onLogout={handleLogout} />;
};

createRoot(document.getElementById('root')).render(
  /*
  Finds the empty <div id="root"></div> in the index.html - our HTML structure.
  Tells React: “Use this space to show the Calendar.”
  */
  
  <StrictMode>
    <AppEntry />
  </StrictMode>,
  /*
  Tells React: “Start the app by rendering this component.”
  It wraps the CalendarTable component in <StrictMode> to help catch mistakes.
  */

)
