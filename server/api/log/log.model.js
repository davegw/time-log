'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeSchema = new Schema({
  time: Number,
  activity: {
    type: String,
    default: 'N/A'
  }
})

var entrySchema = new Schema({
  date: Date,
  entry: {
    type: [timeSchema],
    default: [
      {time: 0}, {time: 1}, {time: 2}, {time: 3}, {time: 4}, {time: 5},
      {time: 6}, {time: 7}, {time: 8}, {time: 9}, {time: 10}, {time: 11},
      {time: 12}, {time: 13}, {time: 14}, {time: 15}, {time: 16}, {time: 17},
      {time: 18}, {time: 19}, {time: 20}, {time: 21}, {time: 22}, {time: 23}
    ]
  }
});

var LogSchema = new Schema({
  name: String,
  log: [entrySchema],
  categories: {
    type: [String],
    default: ['Sleep', 'Reading', 'Work', 'Exercise', 'N/A']
  }
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

module.exports = mongoose.model('Log', LogSchema);
module.exports.TimeModel = mongoose.model('Time', timeSchema);
module.exports.EntryModel = mongoose.model('Entry', entrySchema);
