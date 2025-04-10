const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const { CreateSuccessRes } = require('../utils/responseHandler.js');

router.get('/', async (req, res, next) => {
  try {
    const users = await userController.GetAllUsers();
    CreateSuccessRes(res, users, 200);
    console.log('User route loaded')
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await userController.GetUserById(req.params.id);
    CreateSuccessRes(res, user, 200);
  } catch (error) {
    next(error);
  }
});

router.put('/:id/role', async (req, res, next) => {
  try {
    const updatedUser = await userController.UpdateUserRole(
      req.params.id, 
      req.body.role);
    CreateSuccessRes(res, { message: 'Cập nhật role thành công', user: updatedUser }, 200);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    await userController.DeleteUser(req.params.id);
    CreateSuccessRes(res, { message: 'Xoá người dùng thành công' }, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
