const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  addedAt: { type: Date, default: Date.now },
});

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [CartItemSchema],
  totalCost: { type: Number, default: 0 },
  totalQty: { type: Number, default: 0 },
});

CartSchema.methods.calculateTotals = async function () {
  // Populate each item's product information to access the price
  await this.populate('items.product');

  this.totalCost = 0;
  this.totalQty = 0;

  this.items.forEach((item) => {
    this.totalCost += item.quantity * item.product.price;
    this.totalQty += item.quantity;
  });

  // Format the totalCost to two decimal places
  this.totalCost = +this.totalCost.toFixed(2);
};

module.exports = mongoose.model('Cart', CartSchema);
