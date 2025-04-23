class ApiResponse {
    static success(res, message = "Success", data = {}, statusCode = 200) {
      return res.status(statusCode).json({
        status: true,
        message,
        data,
      });
    }
  
    static fail(res, message = "Fail", statusCode = 400) {
      return res.status(statusCode).json({
        status: false,
        message
      });
    }
  
    static error(res, message = "Internal Server Error", statusCode = 500) {
      return res.status(statusCode).json({
        status: false,
        message,
      });
    }
  
    static unauthorized(res, message = "Unauthorized", statusCode = 401) {
      return res.status(statusCode).json({
        status: false,
        message,
      });
    }
  
    static forbidden(res, message = "Forbidden", statusCode = 403) {
      return res.status(statusCode).json({
        status: false,
        message,
      });
    }
  
    static notFound(res, message = "Not Found", statusCode = 404) {
      return res.status(statusCode).json({
        status: false,
        message,
      });
    }
  }
  
  module.exports = ApiResponse;
  