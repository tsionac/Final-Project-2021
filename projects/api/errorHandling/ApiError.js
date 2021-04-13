// the error handling on this priject was based on the following youtune tutoral :
// https://www.youtube.com/watch?v=DyqVqaf1KnA

class ApiError {

  static badRequestError       = 400;
  static unAuthorisedError     = 401;
  static notFoundError     = 404;
  static internalServerError   = 500; // default error

  constructor(code, msg, e){
    this.code = code; // error code (a.k.a status, like 404 = [page] not found)
    this.msg = msg;
    this.e = e;       // optional exeption parameter, will not returned to the user, but will be written to the logger.
  };

  // return an internul server error (defualt error) ApiError
  static internal(msg, e){
    return new ApiError(this.internalServerError, msg, e);
  };

  // return a bad request ApiError
  static badRequest(msg, e){
    return new ApiError(this.badRequestError, msg, e);
  };

  static unAuthorised(msg, e) {
    return new ApiError(this.unAuthorisedError, msg, e);
  };

  // return a notFound ApiError
  static notFound(msg, e){
    return new ApiError(this.notFoundError, msg, e);
  }
}


module.exports = ApiError;
