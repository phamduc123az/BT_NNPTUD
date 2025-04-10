const Category = require('../models/Category');

module.exports = {
  GetAllCategories: async function () {
    return await Category.find();
  },

  GetCategoryById: async function (id) {
    const category = await Category.findById(id);
    if (!category) throw new Error('Không tìm thấy danh mục');
    return category;
  },

  CreateCategory: async function (data) {
    const category = new Category(data);
    return await category.save();
  },

  UpdateCategory: async function (id, data) {
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    if (!category) throw new Error('Không tìm thấy danh mục');
    return category;
  },

  DeleteCategory: async function (id) {
    const category = await Category.findByIdAndDelete(id);
    if (!category) throw new Error('Không tìm thấy danh mục');
    return { message: 'Xoá danh mục thành công' };
  }
};
