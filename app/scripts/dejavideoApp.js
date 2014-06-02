'use strict';

angular
  .module('dejavideo2App', [
    'ngSanitize',
    'ngRoute',
    'dejavideo.filters.path'
  ])

  .constant('TREE_DEPTH', 2)
  .constant('URL_API', 'api')
  .constant('URL_VIDEOS', 'videos')
  .constant('HASH_PREFIX', '!')

  .config(function ($routeProvider, URL_VIDEOS) {
    $routeProvider
      .when('/', {
        redirectTo: '/path'
      })
      .when('/path', {
        redirectTo: '/path/' + URL_VIDEOS
      })
      .when('/path/:path', {
        templateUrl: '/views/tree.html',
        controller: 'TreeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })

  .config(function ($locationProvider, HASH_PREFIX) {
    $locationProvider.html5Mode(false).hashPrefix(HASH_PREFIX);
  })

  .run(function ($rootScope, HASH_PREFIX) {
    $rootScope.constants = {
      HASH_PREFIX: HASH_PREFIX
    };
  });
