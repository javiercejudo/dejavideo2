'use strict';

angular.module('dejavideo2App')

  .controller('PlayerCtrl', function ($scope, $filter, $routeParams) {
    $scope.player = {
      video: {
        src: '',
        type: 'video/mp4'
      },
      config: {
        width: 854,
        height: 480,
        autoHide: true,
        autoHideTime: 1000,
        autohideCursor: {
          enabled: true,
          time: 1000
        },
        autoPlay: true,
        stretch: 'fit', // none, fit, fill
        responsive: false,
        theme: {
          url: 'bower_components/videogular-themes-default/videogular.css',
          playIcon: '&#xe000;',
          pauseIcon: '&#xe001;',
          volumeLevel3Icon: '&#xe002;',
          volumeLevel2Icon: '&#xe003;',
          volumeLevel1Icon: '&#xe004;',
          volumeLevel0Icon: '&#xe005;',
          muteIcon: '&#xe006;',
          enterFullScreenIcon: '&#xe007;',
          exitFullScreenIcon: '&#xe008;'
        }
      }
    };

    var player = $scope.player;

    if ($routeParams.video) {
      player.video.src = $filter('depathify')($routeParams.video);
    }
  });
