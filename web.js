'use strict';

var
  util = require('util'),
  path = require('path'),
  express = require('express'),
  djvApi = require('./api/dejavideo'),
  app = express(),
  APP_PATH = (process.env.ENV === 'dev') ? 'app' : 'dist',
  VIDEOS_PATH = 'videos',
  URL_API = 'api';

app.get(path.join('/', URL_API, 'files', ':path'), djvApi.getFiles);

app.use(path.join('/', VIDEOS_PATH), express.static(path.join(__dirname, VIDEOS_PATH)));
app.use(express.static(path.join(__dirname, APP_PATH)));

app.use('*', function(req, res) {
  res.sendfile('app/index.html');
});

app.listen(process.env.PORT || 5000);
