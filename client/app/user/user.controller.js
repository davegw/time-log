'use strict';

angular.module('timeLogApp')
  .controller('UserCtrl', function ($scope, $http, Logs, LogService, $stateParams, $location) {
    $scope.user = {};
    $scope.logs = {};

    // Run everytime main controller is called.
    $scope.runController = function() {
      $scope.loadActivity();
    };

    $scope.loadActivity = function() {
      $http.get('/api/users/name/' + $stateParams.user)
        .success(function(data) {
          $scope.user = data;
          console.log($scope.user);
          $http.get('/api/logs/user/' + $scope.user._id)
            .success(function(logData) {
              $scope.logs = logData;
            });
        });
    };

    // Opens the selected log.
    $scope.viewLog = function(obj) {
      $location.path('/' + $scope.user.name + '/log/' + obj._id);
    };

    $scope.createTodayEntry = function() {
      var today = new Date((new Date()).setHours(0,0,0,0));
      Logs.createBlankEntry($scope.user._id, today).then(function(response) {
        $location.path('/' + $scope.user.name + '/log/' + response.data._id);
      });
    };

    // Run everytime main controller is called.
    $scope.runController();

  });
