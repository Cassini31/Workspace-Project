
const express = require('express');
const app = express();
const PORT = 4000;

// Enable JSON request body parsing
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running with Express 🚀');
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});