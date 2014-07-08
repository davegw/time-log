/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /logs              ->  index
 * POST    /logs              ->  create
 * GET     /logs/:id          ->  show
 * PUT     /logs/:id          ->  update
 * DELETE  /logs/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Log = require('./log.model');

// var a = new Log({name: 'Robot', log: [{date: new Date('02.02.2014')}]})
// a.save();

// Get list of logs
// exports.index = function(req, res) {
//   Log.find(function (err, logs) {
//     if(err) { return handleError(res, err); }
//     return res.json(200, logs);
//   });
// };

// Get a single log
exports.show = function(req, res) {
  Log.findById(req.params.id, function (err, log) {
    if(err) { return handleError(res, err); }
    if(!log) { return res.send(404); }
    return res.json(log);
  });
};


exports.showUserLogs = function(req, res) {
  Log.find({_user: req.params.id}, function(err, log) {
    return res.json(log);
  })
};

// exports.showDateEntry = function(req, res) {
//   Log.findById(req.params.user_id, function (err, log) {
//     if(err) { return handleError(res, err); }
//     if(!log) { return res.send(404); }
//     var updated = log;
//     var entryUpdate = _.filter(updated.log, function(value, index) {
//       if (value.date.toISOString() === req.params.date) {
//         console.log("INN");
//         return true;
//       }
//     });
//     console.log('name, ', entryUpdate);
//     return res.json(entryUpdate[0]);
//   });
// };

// Creates a new log in the DB.
// exports.create = function(req, res) {
//   Log.create(req.body, function(err, log) {
//     if(err) { return handleError(res, err); }
//     return res.json(201, log);
//   });
// };

exports.createNewEntry = function(req, res) {
  entryExist(req.body.id, req.body.date)
    .then(function(found){
      if (found.length > 0) {
        console.log('nope');
        return res.json(202, found[0]);
      }
      var log = new Log({
        _user: req.body.id, 
        date: req.body.date
      });
      log.save(function(err, log) {
        if(err) { return handleError(res, err); }
        console.log(log);
        return res.json(201, log);
      });
    });
};

// Updates an existing log in the DB.
exports.update = function(req, res) {
  Log.findById(req.params.id, function (err, updateLog) {
    if (err) { return handleError(err); }
    if(!updateLog) { return res.send(404); }
    updateLog.entry = req.body.data;
    updateLog.save(function (err, log) {
      if (err) { return handleError(err); }
      return res.json(200, log);
    });
  });
};

// Deletes a log from the DB.
exports.destroy = function(req, res) {
  Log.findById(req.params.id, function (err, log) {
    if(err) { return handleError(res, err); }
    if(!log) { return res.send(404); }
    log.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

function entryExist(id, date) {
  return Log
    .where('_user')
    .equals(id)
    .where('date')
    .equals(date)
    .exec(function (err, log) {
      if(err) { return handleError(res, err); }
      return log;
    });
}
