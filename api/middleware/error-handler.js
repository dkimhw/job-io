import { StatusCodes  } from 'http-status-codes'
// import CustomAPIError from '../errors/custom-api';

const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Something went wrong try again later'
  };

  console.log("hello");

  // if (err instanceof CustomAPIError) {
  //   return res.status(err.statusCode).json({ msg: err.message })
  // }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyvalue
    )} field, please choose another value`
    customError.statusCode = 400;
  }

  res.status(customError.statusCode).json({ msg: customError });
  return next(err);
}

export default errorHandlerMiddleware;
