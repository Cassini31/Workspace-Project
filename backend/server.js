require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.get('/me', authMiddleware, async (req, res) => {
  res.json({ username: req.user.username });
});

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Not authenticated.' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Partner schema and model
const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true , trim: true }
});
const Partner = mongoose.model('Partner', partnerSchema);

// User Credentials schema and model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// Add a new partner
app.post('/partners', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Partner name is required.' });
  }
  try {
    const existing = await Partner.findOne({ name });
    if (existing) {
      return res.status(409).json({ error: 'Partner already exists.' });
    }
    const partner = new Partner({ name });
    await partner.save();
    res.status(201).json(partner);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Fetch all partners (protected)
app.get('/partners', authMiddleware, async (req, res) => {
  try {
    const partners = await Partner.find({});
    res.json(partners);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Remove a partner
app.delete('/partners/:id', async (req, res) => {
  try {
    const result = await Partner.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Partner not found.' });
    }
    res.json({ message: 'Partner removed.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});


// Rename a partner
app.put('/partners/:id', async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'New name is required.' });
  }
  try {
    const updated = await Partner.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Partner not found.' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Task schema and model
const taskSchema = new mongoose.Schema({
  partner: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner', required: true },
  date: { type: String, required: true }, // ISO date string (yyyy-mm-dd)
  taskName: { type: String, required: true },
  hours: { type: Number, required: true },
  completed: { type: Boolean, default: false }
});
const Task = mongoose.model('Task', taskSchema);

// Task CRUD endpoints
// Create a new task (protected)
app.post('/tasks', authMiddleware, async (req, res) => {
  const { partner, date, taskName, hours, completed } = req.body;
  if (!partner || !date || !taskName || hours === undefined) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }
  try {
    const task = new Task({ partner, date, taskName, hours, completed: !!completed });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Get all tasks (protected, optionally filter by partner or date)
app.get('/tasks', authMiddleware, async (req, res) => {
  const { partner, date } = req.query;
  const filter = {};
  if (partner) filter.partner = partner;
  if (date) filter.date = date;
  try {
    const tasks = await Task.find(filter).populate('partner');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Update a task (protected)
app.put('/tasks/:id', authMiddleware, async (req, res) => {
  const { partner, date, taskName, hours, completed } = req.body;
  try {
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { partner, date, taskName, hours, completed },
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Delete a task (protected)
app.delete('/tasks/:id', authMiddleware, async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    res.json({ message: 'Task deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Signup route
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists.' });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    const allUsers = await User.find({});
  // Session check route (protected)
  app.get('/me', authMiddleware, async (req, res) => {
    res.json({ username: req.user.username });
  });
    console.log('Current users:', allUsers);
    res.status(201).json({ message: 'User created successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Login route (sets JWT cookie)
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }
  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password.' });
    }
    // Generate JWT
    const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    // Set HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.status(200).json({ message: 'Login successful.' });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Logout route (clears JWT cookie)
app.post('/logout', (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'Logged out.' });
});


app.get('/', (req, res) => {
  res.send('Backend is running with Express 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});