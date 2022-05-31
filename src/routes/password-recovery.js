var express = require('express');
var router = express.Router();
var passwordRecovery = require('../controllers/password-recovery');


router.post('/', passwordRecovery.generateNewPassword);

module.exports = router;