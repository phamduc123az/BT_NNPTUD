const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

// app.use("/api/products", require("./routes/productRoutes"));
const authRoutes = require('./routes/auth');
app.use("/api/auth", authRoutes);

module.exports = app;
