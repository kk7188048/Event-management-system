const connectDB = require('./config/db');
const express = require('express');
const dotenv = require('dotenv');
const activityRoutes = require('./routes/activityRoutes');  // Add activity routes
const cors = require('cors');

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/events', require('./routes/eventRoutes'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api', activityRoutes);  // Use the new activity routes



const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));