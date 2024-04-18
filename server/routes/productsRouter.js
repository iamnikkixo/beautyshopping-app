const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const authenticate = require('../authenticate');

// GET ALL product
router.get('/', async (req, res) => {
  // Get all products from DB
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching products', error: error.message });
  }
});

// GET PRODUCT BY ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error });
  }
});

// POST
router.post('/', authenticate.verifyAdmin, async (req, res) => {
  const { name, price, img, about, category, reviews, rating, volume } =
    req.body;
  try {
    const product = new Product({
      name,
      price,
      img,
      about,
      category,
      reviews,
      rating,
      volume,
    });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Invalid data provided', error: error.message });
  }
});

// UPATE A PRODUCT
router.patch('/:id', authenticate.verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const allowedUpdates = [
      'name',
      'price',
      'img',
      'about',
      'category',
      'reviews',
      'rating',
      'volume',
    ];

    allowedUpdates.forEach((field) => {
      if (req.body[field]) {
        product[field] = req.body[field];
      }
    });

    await product.save();

    res.status(200).json({ message: 'Product updated!', product });
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Failed to update product', error: error.message });
  }
});

// DELETE PRODUCT
router.delete('/:id', authenticate.verifyAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res
      .status(200)
      .json({ message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
});

module.exports = router;
