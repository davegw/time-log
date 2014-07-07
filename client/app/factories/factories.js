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
  }

  return logInstance;
});
