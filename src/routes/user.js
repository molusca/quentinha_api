var express = require('express');
var router = express.Router();
var user = require('../controllers/user');

router.post('/', user.createUser);

module.exports = router;