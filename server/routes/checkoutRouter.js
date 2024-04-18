const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Order = require('../models/order');
const authenticate = require('../authenticate');

// POST
router.post('/', authenticate.verifyUser, async (req, res) => {
  const userId = req.user._id;
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(401).json({ message: 'Cart not found' });
    }

    // create an order record
    const order = new Order({
      user: req.user,
      items: cart.items,
      totalCost: cart.totalCost,
      totalQty: cart.totalQty,
    });

    await order.save();

    // remove cart after order
    await Cart.deleteOne({ user: userId });

    res.status(201).json({
      message: 'Checkout succesful! Order placed!',
      orderId: order._id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Internal server error', error: error.message });
  }
});

module.exports = router;
