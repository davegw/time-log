'use strict';

angular.module('timeLogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .state('mainLog', {
        url: '/:user/log/:log_id',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });