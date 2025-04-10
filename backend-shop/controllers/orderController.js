const Order = require('../models/Order');
const Product = require('../models/Product');

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }) // auth middleware gán user.id
      .populate('items.productId') 
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Lỗi khi lấy đơn hàng người dùng' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('items.productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { user, items, totalAmount } = req.body;
    const order = new Order({ user, items, totalAmount });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.createOrder = async (req, res) => {
  try {
    // const userId = req.user._id || req.body.user; 
    const userId = req.body.user;
    const { items } = req.body;

    let totalAmount = 0;
    const detailedItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId); // lấy thông tin sản phẩm
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
    const populatedOrder = await Order.findById(savedOrder._id)
      .populate('items.productId');

    res.status(201).json(populatedOrder);
  } catch (err) {
    console.error('Lỗi tạo đơn hàng:', err);
    res.status(500).json({ error: err.message });
  }
};



exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Xoá đơn hàng thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

