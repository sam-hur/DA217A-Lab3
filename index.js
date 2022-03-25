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
const env = process.env.DB_Connect || "mongodb+srv://samroot:sampass@sam-db.spny2.mongodb.net/DA217A-Lab3?retryWrites=true&w=majority"

// Connect to database
mongoose.connect(env, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
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
