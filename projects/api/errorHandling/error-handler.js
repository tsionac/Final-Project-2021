const { of } = require("rxjs");
const ApiError = require("./ApiError");

function errorHandler(err, req, res, next){

  if(process.env.NODE_ENV !== 'test') {
    // this in NOT a TEST that can delibertly try to create error, so this error needs to be recorded.
    console.log(err); //TODO: replace to an error loger (check requremets doc for prefered one to use)
  }

  //return error status to the user, so the user will know something went wrong

  if(err instanceof ApiError){
    res.status(err.code).json(err.msg);

    //if(err.e !== undefined){
    //  console.log(err.e);  //TODO: replace to an error loger (check requremets doc for prefered one to use)
    //}

    return;
  }

  //somethig really bad happand, an unkwon error accured,
  // error message may contains sensetive informatiom, as it is not one wrte by us,
  // therefore, a generic mesage should be returend insted.

  //retun internul server error
  res.status(500).json('something went horribly wrong...');
}


module.exports = errorHandler;
