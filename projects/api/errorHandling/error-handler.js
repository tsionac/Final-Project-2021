const ApiError = require("./ApiError");

function errorHandler(err, req, res, next){
  //TODO: replace to an error loger (check requremets doc for prefered one to use)
  console.log(err);

  //return error status to the user, so the user will know something went wrong

  if(err instanceof ApiError){
    res.status(err.code).json(err.msg);
    return;
  }

  //somethig really bad happand, an unkwon error accured,
  // error message may contains sensetive informatiom, as it is not one wrte by us,
  // therefore, a generic mesage should be returend insted.

  //retun internul server error
  res.status(500).jason('something went horribly wrong...');
}


module.exports = errorHandler;
