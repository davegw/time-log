'use strict';

var express = require('express');
var controller = require('./log.controller');

var router = express.Router();

// router.get('/', controller.index);
router.get('/:id', controller.show);
// router.get('/:user_id/:date', controller.showDateEntry);
// router.post('/', controller.create);
router.post('/new-entry', controller.createNewEntry);
// router.put('/:id', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

module.exports = router;
