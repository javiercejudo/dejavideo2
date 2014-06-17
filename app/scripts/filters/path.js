'use strict';

angular.module('dejavideo.filters.path', [])

  .constant('PATHIFY_SEPARATOR', '>')

  .filter('pathify', function (PATHIFY_SEPARATOR) {
    /**
     * Replaces the directory separators of a string
     * so that it can be safely included in a URI
     *
     * @param {String} string String to pathify
     *
     * @return {String} Pathified string
     */
    return function (string) {
      return string
        .replace(/\//g, PATHIFY_SEPARATOR)
        .replace(/\\/g, PATHIFY_SEPARATOR);
    };
  })

  .filter('depathify', function (PATHIFY_SEPARATOR) {
    /**
     * Replaces encoded directory separators with
     * what they represent
     *
     * @param {String} string String to depathify
     *
     * @return {String} Depathified string
     */
    return function (string) {
      var regex = new RegExp(PATHIFY_SEPARATOR, 'g');

      return string.replace(regex, '/');
    };
  });
