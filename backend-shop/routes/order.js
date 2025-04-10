const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { CreateSuccessRes } = require('../utils/responseHandler');

// // Lấy đơn hàng người dùng (cần middleware gán req.user)
// router.get('/my', async (req, res, next) => {
//   try {
//     const orders = await orderController.GetUserOrders(req.user.id);
//     CreateSuccessRes(res, orders, 200);
//   } catch (error) {
//     next(error);
//   }
// });

// Lấy tất cả đơn hàng
router.get('/', async (req, res, next) => {
  try {
    const orders = await orderController.GetAllOrders();
    CreateSuccessRes(res, orders, 200);
  } catch (error) {
    next(error);
  }
});

// Tạo đơn hàng
router.post('/', async (req, res, next) => {
  try {
    const order = await orderController.CreateOrder(req.body.user, req.body.items);
    CreateSuccessRes(res, order, 201);
  } catch (error) {
    next(error);
  }
});

// Cập nhật trạng thái đơn hàng
router.put('/:id', async (req, res, next) => {
  try {
    const order = await orderController.UpdateOrderStatus(req.params.id, req.body.status);
    CreateSuccessRes(res, order, 200);
  } catch (error) {
    next(error);
  }
});

// Xoá đơn hàng
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await orderController.DeleteOrder(req.params.id);
    CreateSuccessRes(res, result, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
