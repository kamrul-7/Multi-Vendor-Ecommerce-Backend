const express = require('express');
const cors = require('cors');
const {dbConnect}= require('./utiles/db')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

// Routes
app.use('/api', require('./routes/authRoutes')); // Make sure '/admin-login' route is inside authRoutes

// Test Route
app.get('/', (req, res) => res.send('Server is Running!'));

const port = process.env.PORT;

// Connect to MongoDB
dbConnect()

app.listen(port, () => console.log(`Server is Running on port ${port}!`));
