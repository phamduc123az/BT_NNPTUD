const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  price:       { type: Number, required: true },
  image:       { type: String }, // Đường dẫn ảnh
  category:    { type: String }, // sau này có thể liên kết category model
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
