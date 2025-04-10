const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { CreateSuccessRes } = require('../utils/responseHandler');

router.post('/register', async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const result = await authController.Register(username, email, password);
    CreateSuccessRes(res, result, 201);
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const result = await authController.Login(email, password);
    CreateSuccessRes(res, result, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

