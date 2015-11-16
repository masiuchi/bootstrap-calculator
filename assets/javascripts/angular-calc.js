var myApp = angular.module('myApp', []);

myApp.controller('CalcCtrl', ['$scope', function($scope) {
  $scope.screen = '';
  $scope.result = 0;
  $scope.histories = [];

  $scope.put = function(value, $event) {
    $scope.screen += value;
    $event.preventDefault();
  };

  $scope.reset = function() {
    $scope.screen = '';
    $scope.result = 0;
    $scope.histories = [];
  };
}]);

