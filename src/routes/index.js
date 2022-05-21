var express = require('express');
var router = express.Router();
const loginRouter = require('./login');

router.get('/', function (req, res) {
  res.json({success: true, message: 'Hello World!'});
});

router.use('/login', loginRouter);

module.exports = router;