var express = require('express');
var router = express.Router();
var login = require('../controllers/login');

router.post('/', login.loginController);

module.exports = router;