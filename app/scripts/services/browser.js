/*global Modernizr */

'use strict';

angular.module('dejavideo.services.browser', []).factory('djvBrowser', function () {
  var publicAPI = {};

  publicAPI.isVideoSupported = function (filename) {
    var ext = filename.split('.').pop();

    return (
      ext === 'mp4'  && Modernizr.video.h264 !== '' ||
      ext === 'webm' && Modernizr.video.webm !== '' ||
      ext === 'ogg'  && Modernizr.video.ogg  !== '' ||
      ext === 'ogv'  && Modernizr.video.ogg  !== ''
    );
  };

  return publicAPI;
});
