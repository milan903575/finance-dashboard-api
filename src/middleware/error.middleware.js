import { sendError } from '../utils/response.helper.js';

function errorHandler(err, req, res, next) {
  console.error(`error: ${err.message}`);
  if (err.statusCode) {
    return sendError(res, err.statusCode, err.message);
  }

  return sendError(res, 500, 'internal server error');

}

export default errorHandler;