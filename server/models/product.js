const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  img: { type: String, required: true },
  about: { type: String, required: true },
  category: { type: [String], required: true },
  reviews: { type: Number, required: true },
  rating: { type: Number, required: true },
  volume: { type: Number, required: false },
  stock: { type: Number, require: true },
  new: { type: Boolean },
});

module.exports = mongoose.model('Product', ProductSchema);
