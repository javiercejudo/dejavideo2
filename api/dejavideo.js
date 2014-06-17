'use strict';

var
  path = require('path'),
  util = require('util'),
  djvFiles = require('./files'),
  djvUtil = require('./util'),
  // ['mp4', 'mkv', 'ogv', 'ogg', 'webm', '3gp', 'avi', 'wmv']
  acceptedExtensions = ['mp4'];

/**
 * Array of accepted file extensions
 *
 * @type {Array}
 */
exports.acceptedExtensions = acceptedExtensions;

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

  if (pathParam.indexOf('..') > -1 || pathParam.indexOf('/') === 0) {
    return djvUtil.errorResponse(res, 'Forbidden.');
  }

  dir = '.' + path.join(path.sep, pathParam);

  try {
    files = djvFiles.getFiles(dir, acceptedExtensions);
  } catch (e) {
    error = util.format('The directory %s could not be loaded.', pathParam);

    return djvUtil.errorResponse(res, error);
  }

  return res.json({ success: true, files: files });
};
