'use strict';

var _ = require('lodash');
var Entry = require('./entry.model');

// Creates a new entry in the DB.
exports.create = function(req, res) {
  Entry.create(req.body, function(err, entry) {
    if(err) { return handleError(res, err); }
    return res.json(201, entry);
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
