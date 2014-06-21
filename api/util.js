'use strict';

/**
 * Returns details about a successful
 *
 * @param {Object} res     Response
 * @param {String} content Expected content
 *
 * @return {Object} JSON response
 */
exports.okResponse = function (res, content) {
  return res.json({
    success: true,
    content: content
  });
};

/**
 * Returns details about an error
 *
 * @param {Object} res     Response
 * @param {String} message Description for the error
 *
 * @return {Object} JSON response
 */
exports.koResponse = function (res, message) {
  return res.json({
    success: false,
    error: message
  });
};
