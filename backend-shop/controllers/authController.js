const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  Register: async function (username, email, password) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('Email đã tồn tại');

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, role: 'user' });
    await user.save();

    return { message: 'Đăng ký thành công' };
  },

  Login: async function (email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Email không tồn tại');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Sai mật khẩu');

    const token = jwt.sign(
      { 
        userId: user._id, 
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return {
      token,
      user: { id: user._id, username: user.username, role: user.role }
    };
  }
};
