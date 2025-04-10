const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');
const { CreateSuccessRes } = require('../utils/responseHandler');

router.get('/', async (req, res, next) => {
  try {
    const products = await productController.GetAllProducts();
    CreateSuccessRes(res, products, 200);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await productController.GetProductById(req.params.id);
    CreateSuccessRes(res, product, 200);
  } catch (error) {
    next(error);
  }
});

router.post('/',upload.single('image'), async (req, res, next) => {
  try {
    const newProduct = await productController.CreateProduct(req.body, req.file);
    CreateSuccessRes(res, newProduct, 201);
  } catch (error) {
    next(error);
  }
});

router.put('/:id',upload.single('image'), async (req, res, next) => {
  try {
    const updatedProduct = await productController.UpdateProduct(req.params.id, req.body, req.file);
    CreateSuccessRes(res, updatedProduct, 200);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const result = await productController.DeleteProduct(req.params.id);
    CreateSuccessRes(res, result, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
