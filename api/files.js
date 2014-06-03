var
  fs = require('fs'),
  path = require('path'),
  acceptedExtensions = ['mp4', 'mkv', 'ogv', 'ogg', 'webm', '3gp', 'avi', 'wmv'],
  privateAPI = {};

/**
 * Returns wanted files from a given directory
 *
 * @param {String} dir Directory to retrieve files from
 *
 * @return {Array} Array of wanted files
 */
exports.getFiles = function (dir) {
  var files = fs.readdirSync(dir);

  files = privateAPI.getFilesData(dir, files);
  files = privateAPI.filterUnwantedFiles(dir, files);

  return files;
}

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
 * @param {String} dir   Directory of the given arrays
 * @param {Array}  files Files to run filtering on
 *
 * @return {Array} Wanted files
 */
privateAPI.filterUnwantedFiles = function (dir, files) {
  var isEmptyDir, isAcceptedFile;

  return files.filter(function (file) {
    isEmptyDir = true;
    isAcceptedFile = false;

    if (!file.isDir) {
      isAcceptedFile = (acceptedExtensions.indexOf(file.name.split('.').pop()) > -1);
    } else if (file.name.charAt(0) !== '.') {
      subfiles = fs.readdirSync(path.join(dir, file.name));
      isEmptyDir = (subfiles.length === 0);
    }

    return (isAcceptedFile || !isEmptyDir);
  });
};
