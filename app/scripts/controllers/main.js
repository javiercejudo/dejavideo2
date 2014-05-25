'use strict';

angular.module('dejavideo2App')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.randomQuote = {
        enabled: false,
        author: null,
        text: null
    };

    $scope.loadRandomQuote = function () {
        var randomQuote = $scope.randomQuote;

        $http({method: 'GET', url: '/api/quote/random'})
            .success(function(data, status, headers, config) {
                randomQuote.author = data.author;
                randomQuote.text = data.text;
                randomQuote.enabled = true;
            })
            .error(function(data, status, headers, config) {
                randomQuote.enabled = false;
            });
    };

    $scope.loadRandomQuote();
  });
