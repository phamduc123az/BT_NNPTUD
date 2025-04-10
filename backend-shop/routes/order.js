const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');


// CRUD
router.get('/', orderController.getAllOrders);
router.post('/', orderController.createOrder);
router.put('/:id/status', orderController.updateOrderStatus);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
