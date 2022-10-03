require('dotenv').config({ path: './config/.env' });
require('./config/db');

const express = require('express');

const userRoutes = require('./routes/user.routes');

const app = express();

// Erreurs CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(express.json());

app.use('/api/user', userRoutes);

module.exports = app;