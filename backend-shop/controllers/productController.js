const Product = require('../models/Product');

module.exports = {
  GetAllProducts: async function () {
    return await Product.find();
  },

  GetProductById: async function (id) {
    const product = await Product.findById(id);
    if (!product) throw new Error('Không tìm thấy sản phẩm');
    return product;
  },

  CreateProduct: async function (data, file) {
    const { name, description, price, category } = data;
    const image = file ? file.filename : '';
    const product = new Product({ name, description, price, image, category });
    return await product.save();
  },

  UpdateProduct: async function (id, data, file) {
    if (file) data.image = file.filename;
    if (data.price) data.price = Number(data.price);
    console.log("Update data:", data);
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) throw new Error('Không tìm thấy sản phẩm');
    console.log("Updated product:", product); // kiểm tra dữ liệu trả về
    return product;
  },

  DeleteProduct: async function (id) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new Error('Không tìm thấy sản phẩm');
    return { message: 'Xoá thành công' };
  }
};
