require('dotenv').config({ path: './config/.env' });
require('./config/db');

const express = require('express');

const userRoutes = require('./routes/user.routes');

const app = express();


app.use(express.json());

app.use('/api/user', userRoutes);

module.exports = app;