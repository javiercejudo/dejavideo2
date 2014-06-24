'use strict';

var privateAPI = {};

/**
 * Determines if a reference is defined.
 *
 * @param {*} value Reference to check.
 *
 * @returns {boolean} True if `value` is defined.
 */
privateAPI.isDefined = function (value) {
  return typeof value !== 'undefined';
};

/**
 * Determines if a reference is undefined.
 *
 * @param {*} value Reference to check.
 *
 * @returns {boolean} True if `value` is undefined.
 */
privateAPI.isUndefined = function (value) {
  return typeof value === 'undefined';
};

/**
 * Returns a response with a given status
 *
 * @param {Object} res     Response
 * @param {Number} status  Status code for the response
 * @param {Object} content Object to send in the response
 *
 * @return {Object} Response
 */
privateAPI.respond = function (res, status, content) {
  return res.json(status, content);
};

/**
 * Returns a value if it is defined or a given default
 *
 * @param  {*} value        Value to test
 * @param  {*} defaultValue Default in case `value` is undefined
 *
 * @return {*}
 */
privateAPI.valueOrDefault = function (value, defaultValue) {
  return (privateAPI.isDefined(value)) ? value : defaultValue;
};

/**
 * Returns details about a successful response
 *
 * @param {Object} res     Response
 * @param {String} content Expected content
 *
 * @return {Object} JSON response
 */
exports.okResponse = function (res, content, status) {
  return privateAPI.respond(
    res,
    privateAPI.valueOrDefault(status, 200),
    { success: true, content: content }
  );
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
  return privateAPI.respond(
    res,
    privateAPI.valueOrDefault(status, 500),
    { success: false, error: message }
  );
};

exports.isDefined = privateAPI.isDefined;
exports.isUndefined = privateAPI.isUndefined;
exports.valueOrDefault = privateAPI.valueOrDefault;
