function sendSuccess(res, statusCode, data, message) {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
}

function sendError(res, statusCode, message) {
  res.status(statusCode).json({
    success: false,
    error: message
  });
}

export {
  sendSuccess,
  sendError
};