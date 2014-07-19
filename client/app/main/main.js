'use strict';

angular.module('timeLogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.index.html',
        controller: 'IndexCtrl'
      })
      .state('mainLog', {
        url: '/:user/log/:logId',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });