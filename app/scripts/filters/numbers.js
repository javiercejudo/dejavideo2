'use strict';

angular.module('dejavideo.filters.numbers', [])

  .filter('filesize', function () {
    /**
     * Converts bytes into other unit multiples
     *
     * @param {Number} bytes     Amount of bytes to convert
     * @param {Number} precision (Optional) Decimal points to show
     * @param {String} unit      (Optional) Specify a specific unit to convert to
     *
     * @return {String} Result with the unit appended
     */
    return function(bytes, precision, unit) {
      if (isNaN(parseFloat(bytes)) || !isFinite(bytes)){
        return null;
      }

      var
        isNegative = bytes < 0,
        units = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB'],
        factor,
        result;

      if (isNegative) {
        bytes *= -1;
      }

      if (angular.isDefined(unit) && units.indexOf(unit) > -1) {
        factor = units.indexOf(unit);
      } else {
        factor = Math.floor(Math.log(bytes) / Math.log(1024));
      }

      if (factor > 5) {
        factor = 5;
      }

      if (!angular.isDefined(precision)) {
        precision = factor;
      }

      result = (bytes / Math.pow(1024, Math.floor(factor))).toFixed(precision);

      if (isNegative) {
        result *= -1;
      }

      return result + ' ' + units[factor];
    }
  });
