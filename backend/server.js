const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;
app.use(cors());
app.use(express.json());
// In-memory user store (for demo purposes only)
const users = [];

// Signup route
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: 'Username already exists.' });
  }
  users.push({ username, password });
  res.status(201).json({ message: 'User created successfully.' });
});

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid username or password.' });
  }
  res.status(200).json({ message: 'Login successful.' });
});


app.get('/', (req, res) => {
  res.send('Backend is running with Express 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});