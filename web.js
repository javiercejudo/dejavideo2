var
  fs = require('fs'),
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
    files = [];

  if (path.indexOf('..') > -1) {
    return res.json({ success: false, error: '../ is not allowed' });
  }

  try {
    files = fs.readdirSync('.' + VIDEOS_URL  + '/' + req.params.path);
  } catch (e) {
    return res.json({
      success: false,
      error: 'The directory ' + req.params.path + ' doesn\'t exist'
    });
  }

  res.json({
    success: true,
    files: files
  });
});

app.listen(process.env.PORT || 5000);
