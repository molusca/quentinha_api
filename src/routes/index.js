var express = require('express');
var router = express.Router();
const loginRouter = require('./login');
const userRouter = require('./user');
const departmentRouter = require('./department');
const restaurantRouter = require('./restaurant');

router.get('/', function (req, res) {
  res.json({success: true, message: 'Hello World!'});
});

router.use('/login', loginRouter);
router.use('/user', userRouter);
router.use('/department', departmentRouter);
router.use('/restaurant', restaurantRouter);

module.exports = router;