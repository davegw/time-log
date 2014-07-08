'use strict';

angular.module('timeLogApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('userIndex', {
        url: '/:user',
        templateUrl: 'app/user/user.index.html',
        controller: 'UserCtrl'
      })
  });