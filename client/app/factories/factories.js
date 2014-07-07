angular.module('time-log.factories', [])

.factory('Logs', function ($http) {
  // Your code here
  var _logs = {};

  var logInstance = {};
  // logInstance.create = function(log) {
  //   return $http({
  //     method: 'POST',
  //     url: '/api/logs',
  //     data: log
  //   });
  // };
  // logInstance.get = function() {
  //   return $http({
  //     method: 'GET',
  //     url: '/api/logs'
  //   });
  // };
  logInstance.find = function(id){
    return $http({
      method: 'GET',
      url: '/api/logs/' + id
    });
  };

  logInstance.count = function(id){
    return this.find(id)
      .then(function(result) {
        var logs = result.data.log[0].entry;
        console.log(logs.length);
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

  logInstance.printTime = function(number) {
    var ampm = number < 12 ? 'am' : 'pm'
    var hour = number % 12 === 0 ? 12 : number % 12;
    return (hour + ":00 " + ampm);
  }

  return logInstance;
})
