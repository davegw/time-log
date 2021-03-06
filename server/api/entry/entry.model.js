'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EntrySchema = new Schema({
  time: Number,
  activity: {
    type: String,
    default: 'N/A'
  }
})

// var EntrySchema = new Schema({
//   date: Date,
//   entry: {
//     type: [timeSchema],
//     default: [
//       {time: 0}, {time: 1}, {time: 2}, {time: 3}, {time: 4}, {time: 5},
//       {time: 6}, {time: 7}, {time: 8}, {time: 9}, {time: 10}, {time: 11},
//       {time: 12}, {time: 13}, {time: 14}, {time: 15}, {time: 16}, {time: 17},
//       {time: 18}, {time: 19}, {time: 20}, {time: 21}, {time: 22}, {time: 23}
//     ]
//   }
// });

module.exports = mongoose.model('Entry', EntrySchema);
