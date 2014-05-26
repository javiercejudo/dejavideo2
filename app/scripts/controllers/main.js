'use strict';

angular.module('dejavideo2App')

  .controller('MainCtrl', function ($scope, $http) {

    $scope.files = [];


    $scope.loadFiles = function () {
      var randomQuote = $scope.randomQuote;

      $http({method: 'GET', url: '/api/files'})
        .success(function(data, status, headers, config) {
          if (data.success) {
            $scope.files = data.files;
          }
        })
        .error(function(data, status, headers, config) {

        });
    };

    $scope.loadFiles();
  });
