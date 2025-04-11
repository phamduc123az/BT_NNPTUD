module.exports = {
    CreateErrorRes: function (res, message, statusCode) {
      if (!res.headersSent) {
        return res.status(statusCode).send({
          success: false,
          message: message,
        });
      }
    },
  
    CreateSuccessRes: function (res, data, statusCode) {
      if (!res.headersSent) {
        return res.status(statusCode).send({
          success: true,
          data: data,
        });
      }
    },
  };
  