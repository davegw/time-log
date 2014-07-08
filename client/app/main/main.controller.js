'use strict';

angular.module('timeLogApp')
  .controller('MainCtrl', function ($scope, $http, Logs, LogService, $stateParams, $location) {
    $scope.user = {};
    $scope.log = {};
    $scope.groupSelect = 'N/A';
    $scope.logDate = {};

    // Run everytime main controller is called.
    $scope.runController = function() {
      $scope.loadActivity();
      console.log('params ',$stateParams);
    }

    $scope.loadActivity = function() {
      $http.get('/api/logs/' + $stateParams.log_id)
        .success(function(data) {
          $scope.log = data;
          console.log($scope.log);
          $http.get('/api/users/' + $scope.log._user)
            .success(function(userData) {
              $scope.user = userData;
              $scope.getChartData();
            });
          $scope.logDate.prev = moment($scope.log.date).subtract('days', 1).toISOString();
          $scope.logDate.next = moment($scope.log.date).add('days', 1).toISOString();
        });
    };

    $scope.updateAllActivity = function() {
      for (var i = 0; i < $scope.log.entry.length; i++) {
        if ($scope.log.entry[i].groupChange === true) {
          $scope.log.entry[i].activity = $scope.groupSelect;
          delete $scope.log.entry[i].groupChange;
          console.log($scope.log.entry[i]);
        }
      }
      $http.put('/api/logs/' + $scope.log._id, {data: $scope.log.entry})
        .success(function() {
          $scope.loadActivity();
        });
    };

    $scope.createNewEntry = function(date) {
      console.log(date)
      Logs.createBlankEntry($scope.user._id, date).then(function(response) {
        console.log(response);
        $location.path('/' + $scope.user.name + '/log/' + response.data._id)
      });
    }

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.timeConverter = function(number) {
      return LogService.printTime(number);
    }


    /*****************************************
     ***************** CHART *****************
     *****************************************/
    $scope.chart = {};
    $scope.chart.data = {};
    $scope.chart.type = 'pie';
    $scope.chart.typeOptions = [
      {name: 'Pie Chart', value: 'pie'},
      {name: 'Bar Graph', value: 'bar'},
      {name: 'Line Graph', value: 'line'}
    ];
    $scope.chart.config = {
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

    $scope.getChartData = function() {
      Logs.count($scope.log._id)
        .then(function(response) {
          $scope.chart.data.data = [];
          $scope.chart.data.series = ['Time'];
          for (var activity in response) {
            if (activity === "N/A") {
              continue;
            }
            $scope.chart.data.data.push({
              x: activity, 
              y: [response[activity]], 
              tooltip: (activity + ': ' + response[activity] + 'hr')
            });
          }
        });
    };

    // Run everytime main controller is called.
    $scope.runController();

  });
