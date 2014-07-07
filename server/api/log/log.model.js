'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeSchema = new Schema({
  time: Number,
  activity: String
})

var entrySchema = new Schema({
  date: Date,
  entry: [
    timeSchema
  ]
});

var LogSchema = new Schema({
  name: String,
  log: [entrySchema]
});

entrySchema.newDay = function() {
  var newDay = [];
  for (var i = 0; i < 24; i++) {
    var newTime = new timeSchema({time: i, activity: 'none'});
    newDay.push(newTime);
  }
  return newDay;
}

LogSchema.newEntry = function() {
  LogSchema.create({
    name: 'Test Dave2',
    log: [{
      date: 'Today',
      entry: entrySchema.newDay()
    }]
  });
}

// var LogSchema = new Schema({
//   name: String,
//   email: { type: String, lowercase: true },
//   role: {
//     type: String,
//     default: 'user'
//   },

//   log: {
//     date: ,
//     activities: {
//       [time: ,
//        activity: ]
//     }
//   }
// });


module.exports = mongoose.model('Log', LogSchema);
