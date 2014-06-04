'use strict';

var
  util = require('util'),
  path = require('path'),
  express = require('express'),
  djvFiles = require('./api/files'),
  djvUtil = require('./api/util'),
  app = express(),
  APP_PATH = (process.env.ENV === 'dev') ? 'app' : 'dist',
  VIDEOS_PATH = 'videos',
  URL_API = 'api';

app.get(path.join(path.sep, URL_API, 'files', ':path'), function(req, res) {
  var
    pathParam = req.params.path,
    files,
    error,
    dir;

  if (pathParam.indexOf('..') > -1) {
    return djvUtil.errorResponse(res, '.. is not allowed.');
  }

  dir = '.' + path.join(path.sep, pathParam);

  try {
    files = djvFiles.getFiles(dir);
  } catch (e) {
    error = util.format('The directory %s could not be loaded.', pathParam);

    return djvUtil.errorResponse(res, error);
  }

  res.json({ success: true, files: files });
});

app.use(path.join(path.sep, VIDEOS_PATH), express.static(path.join(__dirname, VIDEOS_PATH)));
app.use(express.static(path.join(__dirname, APP_PATH)));

app.listen(process.env.PORT || 5000);
