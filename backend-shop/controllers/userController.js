const User = require('../models/User');

module.exports = {
  GetAllUsers: async function () {
    return await User.find().select('-password');
  },

  GetUserById: async function (id) {
    const user = await User.findById(id).select('-password');
    if (!user) throw new Error('Không tìm thấy người dùng');
    return user;
  },

  UpdateUserRole: async function (id, role) {
    return await User.findByIdAndUpdate(id, { role }, { new: true });
  },

  DeleteUser: async function (id) {
    return await User.findByIdAndDelete(id);
  }
};

