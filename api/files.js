'use strict';

var
  fs = require('fs'),
  path = require('path'),
  privateAPI = {};

/**
 * Returns wanted files from a given directory
 *
 * @param {String} dir                Directory to retrieve files from
 * @param {Array}  acceptedExtensions List of accepted file extensions
 *
 * @return {Array} Array of wanted files
 */
exports.getFiles = function (dir, acceptedExtensions) {
  var files = fs.readdirSync(dir);

  files = privateAPI.getFilesData(dir, files);
  files = privateAPI.filterFiles(dir, files, acceptedExtensions);

  return files;
};

/**
 * Attaches file info for an array of given files in a given directory
 *
 * @param {String} dir   Directory of the given arrays
 * @param {Array}  files Files to attach information to
 *
 * @return {Array} Files with the attached information
 */
privateAPI.getFilesData = function (dir, files) {
  var stats;

  return files.map(function(fileName) {
    stats = fs.statSync(path.join(dir, fileName));

    return {
      name : fileName,
      isDir: stats.isDirectory(),
      size : stats.size,
      mtime: stats.mtime
    };
  });
};

/**
 * Filters out unwanted files from a given array of files
 *
 * @param {String} dir                Directory of the given arrays
 * @param {Array}  files              Files to run filtering on
 * @param {Array}  acceptedExtensions List of accepted file extensions
 *
 * @return {Array} Wanted files
 */
privateAPI.filterFiles = function (dir, files, acceptedExtensions) {
  return files.filter(function (file) {
    return privateAPI.isRelevantFile(dir, file, acceptedExtensions);
  });
};

/**
 * Determines whether a directory contains relevant files or not
 *
 * @param {String} dir                Directory of the given arrays
 * @param {Array}  acceptedExtensions List of accepted file extensions
 *
 * @return {Boolean}
 */
privateAPI.containsRelevantFiles = function (dir, acceptedExtensions) {
  var files = fs.readdirSync(dir);

  files = privateAPI.getFilesData(dir, files);

  return files.some(function (file) {
    return privateAPI.isRelevantFile(dir, file, acceptedExtensions);
  });
};

/**
 * Determines whether a file (dir or otherwise) is relevant or not
 *
 * @param {String} dir                Directory of the given arrays
 * @param {Array}  files              Files to run filtering on
 * @param {Array}  acceptedExtensions List of accepted file extensions
 *
 * @return {Boolean}
 */
privateAPI.isRelevantFile = function (dir, file, acceptedExtensions) {
  if (!file.isDir) {
    if (acceptedExtensions.length > 0) {
      return (acceptedExtensions.indexOf(file.name.split('.').pop()) > -1);
    }

    return true;
  } else if (file.name.charAt(0) !== '.') {
    return privateAPI.containsRelevantFiles(path.join(dir, file.name), acceptedExtensions);
  }

  return false;
};
