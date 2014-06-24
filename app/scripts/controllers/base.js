'use strict';

angular.module('dejavideo2App')

  .controller('BaseCtrl', function ($rootScope, $window, $location) {
    $rootScope.$on('$routeChangeSuccess', function() {
      $window.scrollTo(0, 0);
      $rootScope.path = $location.path();
      $rootScope.isPlayerOn = ($rootScope.path.indexOf('/player') === 0);
    });
  });
