var
  fs = require('fs'),
  util = require('util'),
  express = require('express'),
  app = express(),
  APP_URL = '/app',
  API_URL = '/api',
  VIDEOS_URL = APP_URL + '/videos';

app.use(express.static(__dirname + APP_URL));

app.get(API_URL, function(req, res, next) {
  res.json({});
});

app.get(API_URL + '/files', function(req, res, next) {
  var files = fs.readdirSync('.' + VIDEOS_URL);

  res.json({ success: true, files: files });
});

app.get(API_URL + '/files/:path', function(req, res, next) {
  var
    path = req.params.path,
    files = [],
    dir;

  if (path.indexOf('..') > -1) {
    return res.json({ success: false, error: '../ is not allowed' });
  }

  dir = '.' + APP_URL  + '/' + req.params.path;

  try {
    files = fs.readdirSync(dir)
      .map(function(name) {
        var stats = fs.statSync(dir + '/' + name);

        return {
          name: name,
          isDir: stats.isDirectory()
        };
      })
      .filter(function (file) {
        var acceptedExtensions = ['mp4', 'ogv', 'webm', 'avi', 'wmv'];

        return (
          file.name.charAt(0) !== '.' &&
          (file.isDir || acceptedExtensions.indexOf(file.name.split('.').pop()) > -1));
      });
  } catch (e) {
    return res.json({
      success: false,
      error: util.format('The directory %s doesn\'t exist', req.params.path)
    });
  }

  res.json({ success: true, files: files });
});

app.listen(process.env.PORT || 5000);
