require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const { startCartCleanupTask } = require('./cartCleanupTask');

// loading product data once
const Product = require('./models/product');
const productData = require('./db.json');

// making the admin account
const User = require('./models/user');

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', async () => {
  console.log('Connected to Database');

  // Check if products collection is empty
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    // Insert the data from db.json
    Product.insertMany(productData)
      .then(() => console.log('Products inserted'))
      .catch((error) => console.error('Failed to insert products:', error));
  }

  // Check if an admin user exists
  const adminCount = await User.countDocuments({ admin: true });
  if (adminCount === 0) {
    // Create an admin user if none exists
    const adminUser = new User({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      admin: true,
    });
    User.register(adminUser, 'password', (error, user) => {
      if (error) {
        console.error('Failed to create admin user:', error);
      } else {
        console.log('Admin user created:', user);
      }
    });
  }
  startCartCleanupTask();
});

// to serve static files
app.use('/api/images/', express.static('public/images/'));

// allow cors
app.use(cors());

// accept json
app.use(express.json());

// passport configuration
app.use(passport.initialize());

//import routes
const usersRouter = require('./routes/usersRouter');
const productsRouter = require('./routes/productsRouter');
const cartRouter = require('./routes/cartRouter');
const checkoutRouter = require('./routes/checkoutRouter');
const ordersRouter = require('./routes/ordersRouter');

// use routes
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/cart', cartRouter);
app.use('/api/checkout', checkoutRouter);
app.use('/api/orders', ordersRouter);

app.listen(3000, () => console.log('Server Started: Running on port 3000'));
