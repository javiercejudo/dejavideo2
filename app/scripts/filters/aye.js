'use strict';

angular.module('dejavideo.filters.aye', [])

  .filter('aye', function () {
    /**
     * Applies a set of regular expressions to make
     * the names of files more readable.
     *
     * @param {String} string The string to aye-fy
     *
     * @return {String} Aye-fied string
     */
    return function(string) {
      return string
        .replace(/(.*)s([0-9]{2})e([0-9]{2}).*/i, '$1 S$2 E$3')
        .replace(/([^\(\[]*)[\(\[]?(18[789][0-9]|19[0-9]{2}|20[0-3][0-9]).*/, '$1 ($2)')
        .replace(/\s+/g, ' ')
        .replace(/[\._]/g, ' ');
    };
  });
