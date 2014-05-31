'use strict';

angular.module('dejavideo2App')

  .controller('MainCtrl', function ($scope, $http, $timeout, $routeParams, TREE_DEPTH, URL_API, URL_VIDEOS) {

    $scope.stringify = function (object) {
      return JSON.stringify(object, undefined, 2);
    };

    $scope.encode = function (uri) {
      return encodeURIComponent(uri);
    };

    $scope.decode = function (uri) {
      return decodeURIComponent(uri);
    };

    $scope.pathify = function (path) {
      return path.replace(/\%2F/g, '>');
    };

    $scope.depathify = function (path) {
      return path.replace(/>/g, '%2F');
    };

    $scope.tree = {};
    $scope.reqBase = '/' + URL_API + '/files';
    $scope.pathBase = URL_VIDEOS;
    $scope.folderName = URL_VIDEOS;
    $scope.maxDepth = TREE_DEPTH;

    if ($routeParams.path) {
      $scope.pathBase = $routeParams.path;
      $scope.folderName = $scope.pathBase.split('>').pop();
    }

    $scope.loadFiles = function (path, parent, currDepth) {
      currDepth = currDepth || 0;

      if (currDepth === $scope.maxDepth) {
        return;
      }

      path = path || $scope.pathBase;
      path = $scope.depathify(path);
      parent = parent || $scope.tree;

      $http({ cache: true, method: 'GET', url: $scope.reqBase + '/' +  path })
        .success(function (data, status, headers, config) {
          if (data.success) {
            var folderName = path.split('%2F').pop();

            if (!parent[folderName]) parent[folderName] = {};
            parent[folderName].files = [];
            parent[folderName].dirs = [];

            angular.forEach(data.files, function (file) {
              if (file.isDir) {
                file.path = path + $scope.depathify('>' + file.name);
                parent[folderName].dirs.push(file);

                $timeout(function () {
                  $scope.loadFiles(path + '%2F' + file.name, parent[folderName], currDepth + 1);
                }, 0);
              } else {
                parent[folderName].files.push(file);
              }
            });
          }
        })
        .error(function (data, status, headers, config) {

        });
    };

    $scope.loadFiles();
  });
