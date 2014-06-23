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
 * @return {Array} Wanted files
 */
exports.getFiles = function (dir, acceptedExtensions) {
  var files = fs.readdirSync(dir);

  files = privateAPI.getFilesData(dir, files);
  files = privateAPI.filterFiles(dir, files, acceptedExtensions);

  return files;
};

/**
 * Returns recent files from a given directory
 *
 * @param {String} dir                Directory to retrieve files from
 * @param {Array}  acceptedExtensions List of accepted file extensions
 * @param {Number} maxCount           Maximum number of files to return
 *
 * @return {Array} Recent files
 */
exports.getRecentFiles = function (dir, acceptedExtensions, maxCount) {
  var
    recentFiles = [],
    files = [];

  files = privateAPI.getDirFilesOnly(dir, true);
  files = privateAPI.filterFiles(dir, files, acceptedExtensions);

  files.sort(function (fileA, fileB) {
    if (fileA.mtime > fileB.mtime) {
      return -1;
    }

    if (fileA.mtime < fileB.mtime) {
      return 1;
    }

    return 0;
  });

  return files.slice(0, maxCount);
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
      mtime: stats.mtime,
      path : dir
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
  }

  if (file.name.charAt(0) !== '.') {
    return privateAPI.containsRelevantFiles(path.join(dir, file.name), acceptedExtensions);
  }

  return false;
};

/**
 * Returns files only (not dirs) from a given folder
 *
 * @param {String}   dir       Directory of the given arrays
 * @param {Boolean}  recursive Whether dirs should be recursively scanned
 *
 * @return {Array} Files under dir
 */
privateAPI.getDirFilesOnly = function (dir, recursive) {
  var
    files = [],
    subfiles = [],
    subdirs = [],
    stats;

  files = fs.readdirSync(dir);
  files = privateAPI.getFilesData(dir, files);

  files = files.filter(function (file) {
    if (file.isDir && file.name.charAt(0) !== '.') {
      subdirs.push(file);
    }

    return !file.isDir;
  });

  if (!recursive) {
    return files;
  }

  subdirs.forEach(function (subdir) {
    subfiles = privateAPI.getDirFilesOnly(path.join(dir, subdir.name), true);

    files = files.concat(subfiles);
  });

  return files;
};
