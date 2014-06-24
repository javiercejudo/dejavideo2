'use strict';

/**
 * Determines if a reference is defined.
 *
 * @param {*} value Reference to check.
 *
 * @returns {boolean} True if `value` is defined.
 */
var isDefined = function (value) {
  return typeof value !== 'undefined';
};

/**
 * Determines if a reference is undefined.
 *
 * @param {*} value Reference to check.
 *
 * @returns {boolean} True if `value` is undefined.
 */
var isUndefined = function (value) {
  return typeof value === 'undefined';
};


exports.isDefined = isDefined;
exports.isUndefined = isUndefined;

/**
 * Returns details about a successful
 *
 * @param {Object} res     Response
 * @param {String} content Expected content
 *
 * @return {Object} JSON response
 */
exports.okResponse = function (res, content, status) {
  if (isUndefined(status)) {
    status = 200;
  }

  return res.json(status, {
    success: true,
    content: content
  });
};

/**
 * Returns details about an error
 *
 * @param {Object} res     Response
 * @param {String} message Description for the error
 * @param {Number} status  Error code to return
 *
 * @return {Object} JSON response
 */
exports.koResponse = function (res, message, status) {
  if (isUndefined(status)) {
    status = 500;
  }

  return res.json(status, {
    success: false,
    error: message
  });
};
