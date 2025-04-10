const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' },
      quantity: { 
        type: Number,
        default: 1 }
    }
  ],
  totalAmount: { type: Number },
  // enum giới hạn giá trị statustus ko truyền thì là pending
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
