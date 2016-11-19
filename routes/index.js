var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/items', db.getAllItems);
router.post('/api/items', db.createItem);
router.put('/api/items/:id', db.updateItem);
router.delete('/api/items/:id', db.removeItem);

module.exports = router;
