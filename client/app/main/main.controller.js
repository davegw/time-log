'use strict';

angular.module('timeLogApp')
  .controller('MainCtrl', function ($scope, $http, Logs, LogService) {
    $scope.data = {};
    $scope.chart = {};
    $scope.chart.data = {};
    $scope.chart.typeOptions = [
      {name: 'Pie Chart', value: 'pie'},
      {name: 'Bar Graph', value: 'bar'},
      {name: 'Line Graph', value: 'line'}
    ];
    $scope.chart.type = 'pie';
    $scope.chart.config = {
      title: 'Time Log',
      tooltips: true,
      labels: false,
      mouseover: function() {},
      mouseout: function() {},
      click: function() {},
      legend: {
        display: true,
        position: 'right'
      }
    };

    $scope.loadActivity = function() {
      $http.get('/api/logs').success(function(data) {
        $scope.data = data[0];
        console.log(($scope.data.log[0]));
        $scope.getChartData();
      });
    };

    $scope.updateActivity = function() {
      console.log($scope.data.log[0].entry);
      this.showInput = false;
      $http.put('/api/logs/' + $scope.data._id, {data: $scope.data.log[0].entry})
    };

    $scope.updateAllActivity = function() {
      console.log($scope.data.log[0].entry);
      $http.put('/api/logs/' + $scope.data._id, {data: $scope.data.log[0].entry})
        .success(function() {
          $scope.loadActivity();
        });
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.getChartData = function() {
      Logs.count($scope.data._id)
        .then(function(response) {
          $scope.chart.data.data = [];
          $scope.chart.data.series = ['Time'];
          for (var activity in response) {
            $scope.chart.data.data.push({
              x: activity, 
              y: [response[activity]], 
              tooltip: (activity + ': ' + response[activity] + ' hr')
            });
          }
        });
    };

    $scope.timeConverter = function(number) {
      return LogService.printTime(number);
    }

    $scope.loadActivity();
  });