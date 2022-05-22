var express = require('express');
var router = express.Router();
var order = require('../controllers/order');


router.get('/', order.getOrders);
router.get('/:id', order.getOrderById);
router.post('/', order.createOrder);
router.delete('/:id', order.deleteOrder);

module.exports = router;