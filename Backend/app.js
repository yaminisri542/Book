// server.js (Entry Point)
const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./Routes/bookRoutes');
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use('/books', bookRoutes);

mongoose.connect('mongodb://localhost:27017/bookstore').then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));