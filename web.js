var
  fs = require('fs'),
  util = require('util'),
  path = require('path'),
  express = require('express'),
  app = express(),
  APP_PATH = 'app',
  URL_API = 'api';

app.use(express.static(path.join(__dirname, APP_PATH)));

app.get(path.join(path.sep, URL_API, 'files', ':path'), function(req, res) {
  var
    pathParam = req.params.path,
    files = [],
    dir;

  if (pathParam.indexOf('..') > -1) {
    return res.json({
      success: false,
      error: '.. is not allowed'
    });
  }

  dir = '.' + path.join(path.sep, APP_PATH, pathParam);

  try {
    files = fs.readdirSync(dir)
      .map(function(fileName) {
        var stats = fs.statSync(path.join(dir, fileName));

        return {
          name : fileName,
          isDir: stats.isDirectory(),
          size : stats.size,
          mtime: stats.mtime
        };
      })
      .filter(function (file) {
        var
          acceptedExtensions = ['mp4', 'mkv', 'ogv', 'ogg', 'webm', '3gp', 'avi', 'wmv'],
          isEmptyDir = true,
          isAcceptedFile = false;

        if (!file.isDir) {
          isAcceptedFile = (acceptedExtensions.indexOf(file.name.split('.').pop()) > -1);
        } else if (file.name.charAt(0) !== '.') {
          subfiles = fs.readdirSync(path.join(dir, file.name));
          isEmptyDir = (subfiles.length === 0);
        }

        return (isAcceptedFile || !isEmptyDir);
      });
  } catch (e) {
    console.log(e);

    return res.json({
      success: false,
      error: util.format('The directory %s could not be loaded.', pathParam)
    });
  }

  res.json({ success: true, files: files });
});

app.listen(process.env.PORT || 5000);
