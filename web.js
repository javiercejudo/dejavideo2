'use strict';

var
  path = require('path'),
  express = require('express'),
  djvApi = require('./api/dejavideo'),
  app = express(),
  APP_PATH = (process.env.ENV === 'dev') ? 'app' : 'dist',
  URL_API = 'api';

app.get('/' + URL_API +'/files/:path', djvApi.getFiles);
app.get('/' + URL_API +'/new/:path', djvApi.getRecentFiles);

app.use(
  '/' + djvApi.VIDEOS_PATH,
  express.static(path.join(__dirname, djvApi.VIDEOS_PATH))
);

app.use(express.static(path.join(__dirname, APP_PATH)));

app.use(function(req, res) {
  res.sendfile(path.join(APP_PATH, 'index.html'));
});

app.listen(process.env.PORT || 5000);
