const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const Product = require('../models/product');
const User = require('../models/user');
const authenticate = require('../authenticate');

// GET all cart
router.get(
  '/all',
  authenticate.verifyUser,
  authenticate.verifyAdmin,
  async (req, res) => {
    try {
      const carts = await Cart.find();
      res.json(carts);
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Cannot fetch carts', error: error.message });
    }
  }
);

// GET cart from user
router.get('/', authenticate.verifyUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      return res
        .status(404)
        .json({ message: 'Cart does not exist for this user.' });
    }
    res.status(201).json({ message: 'Fetched items successfully', cart: cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching the cart', error: error.message });
  }
});

// POST - add item to cart
router.post('/add/:id', authenticate.verifyUser, async (req, res) => {
  const { id } = req.params; // product id
  const { quantity } = req.body;
  const userId = req.user._id;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: req.user,
        items: [{ product: id, quantity: quantity }],
      });
    } else {
      const productIndex = cart.items.findIndex(
        (item) => item.product._id.toString() === id
      );
      if (productIndex > -1) {
        // update quantity if product exists
        cart.items[productIndex].quantity += quantity;
      } else {
        // add new product to cart
        cart.items.push({
          product: { _id: id, name: product.name },
          quantity: quantity,
        });
      }
    }

    await cart.calculateTotals();
    await cart.save();

    product.stock -= quantity;
    await product.save();

    res
      .status(201)
      .json({ message: 'Item added to cart successfully', cart: cart });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Failed to add item', error: error.message });
  }
});

//UPDATE QUANTITY OF ITEM - increment and decrement
router.patch('/update/:id', authenticate.verifyUser, async (req, res) => {
  const { id } = req.params; // productId
  const userId = req.user._id;
  const { action } = req.body; // 'increment' or 'decrement'

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart does not exist' });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product._id.toString() === id
    );

    if (itemIndex > -1) {
      if (action === 'increment') {
        cart.items[itemIndex].quantity += 1;
      } else if (action === 'decrement') {
        cart.items[itemIndex].quantity = Math.max(
          1,
          cart.items[itemIndex].quantity - 1
        );
      }

      await cart.calculateTotals();
      await cart.save();

      const updatedItem = cart.items[itemIndex];
      res.json({
        product: updatedItem.product,
        quantity: updatedItem.quantity,
        totalCost: cart.totalCost,
      });
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Error updating cart item', error: error.message });
  }
});

// DELETE users cart
router.delete('/clear', authenticate.verifyUser, async (req, res) => {
  const userId = req.user._id;
  try {
    await Cart.deleteOne({ user: userId });
    res.json({ message: 'Deleted Entire Cart' });
  } catch {
    res
      .status(500)
      .json({ message: 'Error deleting cart', error: error.message });
  }
});

// DELETE one item in cart
router.delete('/remove/:id', authenticate.verifyUser, async (req, res) => {
  const userId = req.user._id;
  const { id } = req.params; // This is the productId

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(401).json({ message: 'Cart does not exist' });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.product._id.toString() === id
    );

    if (itemIndex > -1) {
      // Store the productId before removing the item
      const removedProductId = cart.items[itemIndex].product._id;

      cart.items.splice(itemIndex, 1);
      await cart.calculateTotals();
      await cart.save();

      return res.status(201).json({
        message: 'Item removed from cart',
        productId: removedProductId,
      });
    } else {
      return res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting item from cart', error: error.message });
  }
});

module.exports = router;
