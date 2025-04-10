const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { CreateSuccessRes } = require('../utils/responseHandler');

router.get('/', async (req, res, next) => {
  try {
    const categories = await categoryController.GetAllCategories();
    CreateSuccessRes(res, categories, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const category = await categoryController.GetCategoryById(req.params.id);
    CreateSuccessRes(res, category, 200);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const category = await categoryController.CreateCategory(req.body);
    CreateSuccessRes(res, category, 201);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedCategory = await categoryController.UpdateCategory(req.params.id, req.body);
    CreateSuccessRes(res, updatedCategory, 200);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await categoryController.DeleteCategory(req.params.id);
    CreateSuccessRes(res, result, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
