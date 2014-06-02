'use strict';

describe('Controller: TreeCtrl', function () {

  // load the controller's module
  beforeEach(module('dejavideo2App'));

  var MainCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('TreeCtrl', {
      $scope: scope
    });
  }));

  it('trivial test', function () {
    expect(true).toBe(true);
  });
});
