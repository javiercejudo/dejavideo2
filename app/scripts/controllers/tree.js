'use strict';

angular.module('dejavideo2App')

  .controller('TreeCtrl', function ($scope, $http, $timeout, $log, $filter, $routeParams, TREE_DEPTH, URL_API, URL_VIDEOS, PATHIFY_SEPARATOR) {
    $scope.treeScope = {
      tree: {},
      reqBase: '/' + URL_API + '/files',
      pathBase: URL_VIDEOS,
      folderName: URL_VIDEOS,
      dirBase: { name: URL_VIDEOS, path: URL_VIDEOS }
    };

    var treeScope = $scope.treeScope;

    if ($routeParams.path) {
      treeScope.pathBase = $routeParams.path;
      treeScope.folderName = treeScope.pathBase.split(PATHIFY_SEPARATOR).pop();
      treeScope.dirBase = { name: treeScope.folderName, path: treeScope.pathBase };
    }

    treeScope.loadFiles = function (path, parent, currDepth) {
      path = path || treeScope.pathBase;
      path = $filter('depathify')(path);
      parent = parent || treeScope.tree;
      currDepth = currDepth || 0;

      if (currDepth === TREE_DEPTH) {
        return;
      }

      var folderName = path.split('/').pop();

      $http.get(treeScope.reqBase + '/' +  encodeURIComponent(path), { cache: true })
        .success(function (data) {
          if (!data.success) {
            $log.log(data.error);

            return;
          }

          if (!parent[folderName]) {
            parent[folderName] = {};
          }

          parent[folderName].files = [];
          parent[folderName].dirs = [];

          angular.forEach(data.files, function (file) {
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
          $log.log('Some files could not be loaded:');
          $log.log('--> data', data);
          $log.log('--> status', status);
          $log.log('--> path', path);
          $log.log('--> parent', parent);
          $log.log('--> currDepth', currDepth);
        });
    };

    treeScope.loadFiles();
  });
