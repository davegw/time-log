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

// Get list of logs
exports.index = function(req, res) {
  Log.find(function (err, logs) {
    if(err) { return handleError(res, err); }
    return res.json(200, logs);
  });
};

// Get a single log
exports.show = function(req, res) {
  Log.findById(req.params.id, function (err, log) {
    if(err) { return handleError(res, err); }
    if(!log) { return res.send(404); }
    return res.json(log);
  });
};

// Creates a new log in the DB.
exports.create = function(req, res) {
  Log.create(req.body, function(err, log) {
    if(err) { return handleError(res, err); }
    return res.json(201, log);
  });
};

// Updates an existing log in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Log.findById(req.params.id, function (err, log) {
    if (err) { return handleError(err); }
    if(!log) { return res.send(404); }
    var updated = log;
    updated.log[0].entry = req.body.data;
    console.log("test: ",updated.log[0].entry);
    console.log("update: ",updated.log[0].entry);
    console.log("req: ",req.body);
    updated.save(function (err) {
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
