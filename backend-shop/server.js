const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const productRoutes = require('./routes/product');
app.use('/api/products', productRoutes);
app.use('/uploads', express.static('uploads'));

const categoryRoutes = require('./routes/category');
app.use('/api/categories', categoryRoutes);

const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);

const orderRoutes = require('./routes/order');
app.use('/api/orders', orderRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect DB
mongoose.connect(process.env.MONGO_URI, {
}).then(() => console.log(' MongoDB connected'))
  .catch(err => console.error(' MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



