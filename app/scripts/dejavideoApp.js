'use strict';

angular
  .module('dejavideo2App', [
    'ngSanitize',
    'ngRoute',
    'angularMoment',
    'com.2fdevs.videogular',
    'com.2fdevs.videogular.plugins.controls',
    'com.2fdevs.videogular.plugins.overlayplay',
    'com.javiercejudo.videogular.plugins.autohide-cursor',
    'dejavideo.services.browser',
    'dejavideo.filters.path',
    'dejavideo.filters.numbers',
    'dejavideo.filters.aye'
  ])

  .constant('TREE_DEPTH', -2)
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
      .when('/player', {
        redirectTo: '/'
      })
      .when('/player/:video', {
        templateUrl: '/views/player.html',
        controller: 'PlayerCtrl'
      });
  })

  .config(function ($locationProvider, HASH_PREFIX) {
    $locationProvider.html5Mode(true).hashPrefix(HASH_PREFIX);
  })

  .config(function ($provide, $routeProvider) {
    $provide.factory('$routeProviderForRunPhase', function () {
      return $routeProvider;
    });
  })

  .run(function ($http, $route, $routeProviderForRunPhase) {
    var finishRouteConfig = function () {
      $routeProviderForRunPhase.otherwise({
          redirectTo: '/'
        });

      $route.reload();
    };

    $http.get('/config/redirections.json', { cache: true })
      .success(function (redirections) {
        angular.forEach(redirections, function (redirection) {
          $routeProviderForRunPhase.when(
            redirection.path,
            { redirectTo: redirection.dest }
          );
        });

        finishRouteConfig();
      })

      .error(function () {
        finishRouteConfig();
      });
  })

  .run(function ($rootScope, PATHIFY_SEPARATOR) {
    $rootScope.constants = {
      'PATHIFY_SEPARATOR': PATHIFY_SEPARATOR
    };
  })

  .run(function($rootScope, $templateCache, $location) {
    $rootScope.path = '';
    $rootScope.isPlayerOn = false;

    $rootScope.$on('$routeChangeSuccess', function() {
      $rootScope.path = $location.path();

      $rootScope.isPlayerOn = ($rootScope.path.indexOf('/player') === 0);
    });
  })

  .run(function($rootScope, djvBrowser) {
    $rootScope.djvBrowser = djvBrowser;
  });
