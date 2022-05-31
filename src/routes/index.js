var express = require('express');
var router = express.Router();
const loginRouter = require('./login');
const userRouter = require('./user');
const departmentRouter = require('./department');
const restaurantRouter = require('./restaurant');
const menuItemRouter = require('./menuItem');
const orderRouter = require('./order');
const passwordRecoveryRouter = require('./password-recovery');

router.get('/', function (req, res) {
  res.json({success: true, message: 'Hello World!'});
});

router.use('/login', loginRouter);
router.use('/user', userRouter);
router.use('/department', departmentRouter);
router.use('/restaurant', restaurantRouter);
router.use('/menu-item', menuItemRouter);
router.use('/order', orderRouter);
router.use('/password-recovery', passwordRecoveryRouter);

module.exports = router;