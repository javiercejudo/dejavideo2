exports.errorResponse = function (res, message) {
  return res.json({
    success: false,
    error: message
  });
};
