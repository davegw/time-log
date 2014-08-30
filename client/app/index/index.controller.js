'use strict';

angular.module('timeLogApp')
  .controller('IndexCtrl', function ($scope, $timeout, $location) {

    $scope.clock = moment().format('h:mm:ssa');
    var tick = function() {
      $scope.clock = moment().format('h:mm:ssa');
      $timeout(tick, 1000);
    };
    $timeout(tick, 1000);

    $scope.buttonAction = function() {
      $location.path('/sampleuser');
    };

    /************************************************
     ***************** Sample Chart *****************
     ************************************************/
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

    $scope.chart.data = {
      series: ['Time Log'],
      data: [{
        x: 'Sleep',
        y: [7]
      }, {
        x: 'Exercise',
        y: [1]
      }, {
        x: 'Coding',
        y: [8]
      }, {        
        x: 'Reading',
        y: [2]
      }, {
        x: 'TV',
        y: [1]
      }]
    };
    
  });
