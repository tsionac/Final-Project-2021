// the error handling on this priject was based on the following youtune tutoral :
// https://www.youtube.com/watch?v=DyqVqaf1KnA

class ApiError {

  static badRequestError       = 400;
  static unAuthorisedError     = 401;
  static pageNotFoundError     = 404;
  static internalServerError   = 500; // default error

  constructor(code, msg){
    this.code = code; // error code (a.k.a status, like 404 = page not found)
    this.msg = msg;
  };

  // return an internul server error (defualt error) ApiError
  static internal(msg){
    return new ApiError(this.internalServerError, msg);
  };

  // return a bad request ApiError
  static badRequest(msg){
    return new ApiError(this.badRequestError, msg);
  };

  static unAuthorised(msg) {
    return new ApiError(this.unAuthorisedError, msg);
  };

  // return a pageNotFound ApiError
  static pageNotFound(msg){
    return new ApiError(this.pageNotFoundError, msg);
  }
}


module.exports = ApiError;
