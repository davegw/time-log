'use strict';

angular.module('time-log.factories', [])

.factory('Logs', function ($http) {

  var logInstance = {};

  // Create blank entry for the user collection. 
  // If an entry at the date exists, no new entry is created.
  logInstance.createBlankEntry = function(id, date) {
    return $http({
      method: 'POST',
      url: '/api/logs/new-entry',
      data: {
        id: id,
        date: date
      }
    });
  };

  // Finds a user's log given their ID.
  logInstance.find = function(id){
    return $http({
      method: 'GET',
      url: '/api/logs/' + id
    });
  };

  // Find an entry using the user ID and date.
  // logInstance.findByDate = function(id, date) {
  //   return $http({
  //     method: 'GET',
  //     url: '/api/logs/' + id + '/' + date
  //   });
  // }

  // Returns an object containing a key for each activity done and value for number of hours.
  logInstance.count = function(id){
    return this.find(id)
      .then(function(result) {
        var logs = result.data.entry;
        var activityCount = {};
        for (var i = 0; i < logs.length; i++) {
          if (activityCount[logs[i].activity] === undefined) {
            activityCount[logs[i].activity] = 1;
          } else {
            activityCount[logs[i].activity] = activityCount[logs[i].activity] + 1;
          }
        }
        return activityCount;
      });
  };
  return logInstance;
})

.service('LogService', function () {
  var logInstance = {};

  // Formats a number into a time.
  logInstance.printTime = function(number) {
    var ampm = number < 12 ? 'am' : 'pm';
    var hour = number % 12 === 0 ? 12 : number % 12;
    return (hour + ':00 ' + ampm);
  };

  return logInstance;
});
