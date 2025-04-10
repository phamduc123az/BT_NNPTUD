const Order = require('../models/Order');
const Product = require('../models/Product');

module.exports = {
  GetUserOrders: async function (userId) {
    return await Order.find({ user: userId })
      .populate('items.productId')
      .sort({ createdAt: -1 });
  },

  GetAllOrders: async function () {
    return await Order.find()
      .populate('user')
      .populate('items.productId');
  },

  CreateOrder: async function (userId, items) {
    let totalAmount = 0;
    const detailedItems = [];

    for (const item of items) {
      if (!item.productId) continue;// moi them
      const product = await Product.findById(item.productId);
      if (!product) continue;

      const quantity = item.quantity || 1;
      const itemTotal = product.price * quantity;
      totalAmount += itemTotal;

      detailedItems.push({
        productId: product._id,
        quantity,
      });
    }

    const order = new Order({
      user: userId,
      items: detailedItems,
      totalAmount,
    });

    const savedOrder = await order.save();
    return await Order.findById(savedOrder._id).populate('items.productId');
  },

  UpdateOrderStatus: async function (id, status) {
    return await Order.findByIdAndUpdate(id, { status }, { new: true });
  },

  DeleteOrder: async function (id) {
    await Order.findByIdAndDelete(id);
    return { message: 'Xoá đơn hàng thành công' };
  }
};

