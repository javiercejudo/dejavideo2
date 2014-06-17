'use strict';

/**
 * Returns details about an error
 *
 * @param {Object} res     Response
 * @param {String} message Description for the error
 *
 * @return {Object} JSON response
 */
exports.errorResponse = function (res, message) {
  return res.json({
    success: false,
    error: message
  });
};
