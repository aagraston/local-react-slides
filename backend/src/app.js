// Import required modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // For environment variables

// Initialize the app
const app = express();

// Middleware
app.use(cors({origin: 'http://localhost:5173'})); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Express API!');
});

// Example API route
app.get('/api/example', (req, res) => {
    res.json({ message: 'This is an example API route!' });
});

// Environment variables and server setup
const PORT = process.env.PORT || 5000; // Use the port from .env or default to 5000
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});