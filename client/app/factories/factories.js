angular.module('time-log.factories', [])

.factory('Logs', function ($http) {

  var _logs = {};

  var logInstance = {};

  // Create blank entry by finding the user's id then creating a new blank entry.
  // If next is true the entry is added to end of array, otherwise it is added to beginning.
  logInstance.createBlankEntry = function(id, date, next) {
    console.log(id,date);
    return this.find(id)
      .then(function(result) {
        console.log('safasf',result.data.log);
        return $http({
          method: 'POST',
          url: '/api/entries/',
          data: {
            date: date
          }
        })
        .then(function(response) {
          // Determine where to add the blank entry.
          next ? result.data.log.push(response.data) : result.data.log.unshift(response.data);;
        });
      });
  };

  // Finds a user's log given their ID.
  logInstance.find = function(id){
    return $http({
      method: 'GET',
      url: '/api/logs/' + id
    });
  };

  // Returns an object containing a key for each activity done and value for number of hours.
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

  // Formats a number into a time.
  logInstance.printTime = function(number) {
    var ampm = number < 12 ? 'am' : 'pm'
    var hour = number % 12 === 0 ? 12 : number % 12;
    return (hour + ':00 ' + ampm);
  }

  return logInstance;
})
