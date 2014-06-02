'use strict';

angular.module('dejavideo.filters.path', [])

  .filter('encodeURI', function () {
    return function (uri) {
      return encodeURIComponent(uri);
    };
  })

  .filter('decodeURI', function () {
    return function (uri) {
      return decodeURIComponent(uri);
    };
  })

  .filter('pathify', function () {
    return function (uri) {
      return uri.replace(/\%2F/g, '>');
    };
  })

  .filter('depathify', function () {
    return function (uri) {
      return uri.replace(/>/g, '%2F');
    };
  });
