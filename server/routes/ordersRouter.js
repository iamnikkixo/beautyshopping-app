const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const authenticate = require('../authenticate');

// GET all orders
router.get(
  '/',
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching orders', error: error.message });
    }
  }
);

// GET all order for a user
router.get('/:id', authenticate.verifyUser, async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.find({ user: id });

    if (!order) {
      return res
        .status(401)
        .json({ message: 'User has never placed any orders' });
    }
    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching User Order', error: error.message });
  }
});

// GET one order for that user
router.get('/:id/:orderId', authenticate.verifyUser, async (req, res) => {
  const { id, orderId } = req.params;
  try {
    const order = await Order.findOne({ _id: orderId, user: id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found for this user' });
    }
    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching User Order', error: error.message });
  }
});

// UPDATE STATUS
router.patch(
  '/update/:orderId',
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  async (req, res) => {
    try {
      const order = await Order.findById(req.params.orderId);

      if (!order) {
        return res.status(401).json({ message: 'Order does not exist' });
      }
      order.status = req.body.status;
      await order.save();
      res.status(201).json({ message: 'Order updated successfully', order });
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Cannot update order', error: error.message });
    }
  }
);

module.exports = router;
