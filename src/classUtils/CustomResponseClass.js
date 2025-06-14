/* eslint-disable prettier/prettier */

class SuccessResponse {
  constructor(code, success, message, data) {
    this.code = code;
    this.success = success;
    this.message = message;
    this.data = data;
  }

  sendResponse(res) {
    return res.status(this.code).json({
      message: this.message,
      success: true,
      data: this.data
    });
  }
}


module.exports = SuccessResponse