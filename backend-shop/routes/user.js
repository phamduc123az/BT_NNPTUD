const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// CRUD basic
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id/role', userController.updateUserRole);
router.delete('/:id', userController.deleteUser);

module.exports = router;
