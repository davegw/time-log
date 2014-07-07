'use strict';

angular.module('timeLogApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.loadActivity = function() {
      $http.get('/api/logs').success(function(data) {
        $scope.data = data[0];
        console.log(($scope.data.log[0]));
      });
    };

    $scope.addActivity = function() {
      // if($scope.newThing === '') {
      //   return;
      // }
      // $http.post('/api/things', { name: $scope.newThing });
      // $scope.newThing = '';
      console.log($scope.data.log[0].entry);
      this.showInput = false;
      $http.put('/api/logs/' + $scope.data._id, {data: $scope.data.log[0].entry})
    };

    $scope.updateAllActivity = function() {
      // if($scope.newThing === '') {
      //   return;
      // }
      // $http.post('/api/things', { name: $scope.newThing });
      // $scope.newThing = '';
      console.log($scope.data.log[0].entry);
      $http.put('/api/logs/' + $scope.data._id, {data: $scope.data.log[0].entry})
        .success(function() {
          $scope.loadActivity();
        });
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.loadActivity();
  });