'use strict';

var
  path = require('path'),
  util = require('util'),
  djvFiles = require('./files'),
  djvUtil = require('./util'),
  ACCEPTED_EXTENSIONS = require('video-extensions'),
  VIDEOS_PATH = 'videos',
  MAX_RECENT_FILES = 10,
  privateAPI = {};

/**
 * Location of the directory containing the videos
 *
 * @type {String}
 */
exports.VIDEOS_PATH = VIDEOS_PATH;

/**
 * Array of accepted file extensions
 *
 * @type {Array}
 */
exports.ACCEPTED_EXTENSIONS = ACCEPTED_EXTENSIONS;

/**
 * Maximum number of recent files to return
 *
 * @type {Number}
 */
exports.MAX_RECENT_FILES = MAX_RECENT_FILES;

/**
 * Returns wanted files from a given path
 *
 * @param {Object} req Request
 * @param {Object} res Response
 *
 * @return {Object} JSON response
 */
exports.getFiles = function(req, res) {
  var
    pathParam = req.params.path,
    files,
    error,
    dir;

  if (privateAPI.isForbiddenPath(pathParam)) {
    return djvUtil.koResponse(res, 'Forbidden.', 403);
  }

  dir = '.' + path.join(path.sep, pathParam);

  try {
    files = djvFiles.getFiles(dir, ACCEPTED_EXTENSIONS);
  } catch (e) {
    error = util.format('The directory %s could not be loaded.', pathParam);

    return djvUtil.koResponse(res, error, 500);
  }

  return djvUtil.okResponse(res, { files: files });
};

/**
 * Returns recent files from a given path
 *
 * @param {Object} req Request
 * @param {Object} res Response
 *
 * @return {Object} JSON response
 */
exports.getRecentFiles = function(req, res) {
  var
    pathParam = req.params.path,
    files,
    error,
    dir;

  if (privateAPI.isForbiddenPath(pathParam)) {
    return djvUtil.koResponse(res, 'Forbidden.', 403);
  }

  dir = '.' + path.join(path.sep, pathParam);

  try {
    files = djvFiles.getRecentFiles(dir, ACCEPTED_EXTENSIONS, MAX_RECENT_FILES);
  } catch (e) {
    error = util.format('Recent files for directory %s could not be loaded.', pathParam);

    return djvUtil.koResponse(res, error, 500);
  }

  return djvUtil.okResponse(res, { files: files });
};

/**
 * Returns true if a path is forbidden and false otherwise
 *
 * @param {String} pathParam
 *
 * @return {Boolean}
 */
privateAPI.isForbiddenPath = function (pathParam) {
  return (
    pathParam.indexOf('..') > -1 ||
    pathParam.split(path.sep).shift() !== VIDEOS_PATH
  );
};
