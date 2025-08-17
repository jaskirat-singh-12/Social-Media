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
  origin: [ "http://localhost:5173" , "https://social-media-6lgk.vercel.app"],
  credentials: true
}));


connectDB();

app.use('/auth', authRoutes)
app.use('/api', postRoutes);

module.exports = app;
