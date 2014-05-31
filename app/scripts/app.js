'use strict';

angular
  .module('dejavideo2App', [
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/tree.html',
        controller: 'MainCtrl'
      })
      .when('/path/:path', {
        templateUrl: 'views/tree.html',
        controller: 'MainCtrl'
      });
  })
  .constant('TREE_DEPTH', -2)
  .constant('URL_API', 'api')
  .constant('URL_VIDEOS', 'videos');
