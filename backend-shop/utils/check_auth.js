
let jwt = require('jsonwebtoken')
let constants = require('../utils/constants')
let userController = require('../controllers/userController');

const e = require('express');
module.exports = {
    check_authentication: async function (req, res, next) {
        let token;
    
        // Lấy token từ Authorization header hoặc cookie
        if (req.headers && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
          token = req.headers.authorization.split(" ")[1];
        } else if (req.signedCookies && req.signedCookies.token) {
          token = req.signedCookies.token;
        }
    
        if (!token) {
          return next(new Error("Bạn chưa đăng nhập"));
        }
    
        try {
          const decoded = jwt.verify(token, constants.SECRET_KEY); // giải mã
    
          // Tùy theo JWT chứa gì, dùng userId hoặc id
          const user = await userController.GetUserById(decoded.userId || decoded.id);
          if (!user) return next(new Error("Người dùng không tồn tại"));
    
          req.user = user; // Gắn user vào request
          next();
        } catch (err) {
          console.error("Lỗi xác thực token:", err.message);
          next(new Error("Token không hợp lệ hoặc đã hết hạn"));
        }
    },
    check_authorization: function (roles) {
        return async function (req, res, next) {
            try {
                console.log(object);
                let roleOfUser = req.user.role.name;
                if (roles.includes(roleOfUser)) {
                    next();
                } else {
                    throw new Error("ban khong co quyen")
                }
            } catch (error) {
                next(error)
            }
        }
    }
}