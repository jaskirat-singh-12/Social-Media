const express = require('express');
const connectDB = require('./db/db');
const authRoutes = require('./routes/auth.route');
const postRoutes = require('./routes/post.route')
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));


connectDB();

app.use('/auth', authRoutes)
app.use('/api', postRoutes);

module.exports = app;
