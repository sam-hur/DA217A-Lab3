const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const signale = require('signale');
const open = require('open');
const pages = require('./routes/pages');
const authRoute = require('./routes/auth');
const secureRoute = require('./routes/secure');

const PORT = process.env.PORT || 30000;
const HOST = "http://localhost";

// Activate Dotenv
dotenv.config();

// Connect to database
mongoose.connect(process.env.DB_Connect, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    signale.success('Connected to the Database!');
});

// Middleware - extends functionality of Node application
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/user', authRoute);
app.use('/api/secure', secureRoute);
app.use('/', pages);

// Event listener for localhost server
app.listen(PORT, () => {
    signale.info(`Server is running! See ${HOST}:${PORT}`);
    open(`${HOST}:${PORT}`);
}) 
