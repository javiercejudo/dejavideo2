/*global angular:true, browser:true, window:true, localStorage:true */

/**
 * Browser module
 *
 * Defines a znBrowser service for feature detection
 *
 * @copyright Copyright (c) 2011 Zanui (http://www.zanui.com.au)
 */

'use strict';

angular.module('dejavideo.services.browser', []).factory('djvBrowser', function () {
  var publicAPI = {};

  publicAPI.isVideoSupported = function (filename) {
    var ext = filename.split('.').pop();

    return (
      ext === 'mp4'  && Modernizr.video.h264 !== '' ||
      ext === 'webm' && Modernizr.video.webm !== '' ||
      ext === 'ogg'  && Modernizr.video.ogg  !== ''
    );
  };

    return publicAPI;
});
