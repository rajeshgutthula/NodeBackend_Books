const express = require("express");
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/books');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 2000;

// Load environment variables from .env file
dotEnv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.log(error));

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your actual frontend URL if deployed
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
}));

app.use(bodyParser.json()); // To parse JSON bodies
app.use(express.json()); // Middleware for parsing application/json

// Route handling
app.use('/user', userRoutes);
app.use('/api/books', bookRoutes);

// Root route
app.use('/', (req, res) => {
    res.send("<h1>Welcome to Home Page</h1>");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server started and running at ${PORT}`);
});
