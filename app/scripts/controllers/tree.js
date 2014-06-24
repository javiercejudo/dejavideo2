'use strict';

angular.module('dejavideo2App')

  .controller('TreeCtrl', function ($scope, $http, $timeout, $log, $filter, $routeParams, TREE_DEPTH, URL_API, URL_VIDEOS) {
    $scope.treeScope = {
      tree: {},
      pathBase: URL_VIDEOS,
      folderName: URL_VIDEOS,
      dirBase: { name: URL_VIDEOS, path: URL_VIDEOS },
      recentFiles: []
    };

    var treeScope = $scope.treeScope;

    if ($routeParams.path) {
      treeScope.pathBase = $filter('depathify')($routeParams.path);
      treeScope.folderName = treeScope.pathBase.split('/').pop();
      treeScope.dirBase = { name: treeScope.folderName, path: treeScope.pathBase };
    }

    treeScope.loadFiles = function (path, parent, currDepth) {
      path = path || treeScope.pathBase;
      parent = parent || treeScope.tree;
      currDepth = currDepth || 0;

      if (currDepth === TREE_DEPTH) {
        return;
      }

      var folderName = path.split('/').pop();

      $http.get('/' + URL_API + '/files/' +  encodeURIComponent(path), { cache: true })
        .success(function (response) {
          if (!response.success) {
            $log.log(response.error);

            return;
          }

          if (!parent[folderName]) {
            parent[folderName] = {};
          }

          parent[folderName].files = [];
          parent[folderName].dirs = [];

          angular.forEach(response.content.files, function (file) {
            if (file.isDir) {
              file.path = path + '/' + file.name;
              parent[folderName].dirs.push(file);

              treeScope.loadFiles(
                file.path,
                parent[folderName],
                currDepth + 1
              );
            } else {
              parent[folderName].files.push(file);
            }
          });
        })
        .error(function (data, status) {
          $log.log('-------------------------------');
          $log.log('The files could not be loaded:');
          $log.log('--> data', data);
          $log.log('--> status', status);
          $log.log('--> path', path);
          $log.log('--> parent', parent);
          $log.log('--> currDepth', currDepth);
        });
    };

    treeScope.loadRecentFiles = function () {
      var path = treeScope.pathBase;

      $http.get('/' + URL_API + '/new/' +  encodeURIComponent(path), { cache: true })
        .success(function (response) {
          if (!response.success) {
            $log.log(response.error);

            return;
          }

          treeScope.recentFiles = response.content.files;
        })
        .error(function (data, status) {
          $log.log('-------------------------------');
          $log.log('Recent files could not be loaded:');
          $log.log('--> data', data);
          $log.log('--> status', status);
          $log.log('--> path', path);
        });
    };

    treeScope.loadFiles();
    treeScope.loadRecentFiles();
  });
