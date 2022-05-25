const helpers = require('../helpers/functions');
const Models = require('../models/index');

async function getOrders(req, res) {
  let where = {};

  const queryVariables = [
    'active',
    'departmentId',
    'sizePreference',
    'type'
  ];

  for (let item of queryVariables) {
    if (item in req.query) {
      where[item] = req.query[item];
    }
  }

  try {
    let orders = await Models.Order.findAll({where: where});

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: 'No orders found',
        payload: []
      });
    }

    for (let order of orders) {
      order = order.toJSON();
      order['restaurant'] = await Models.Restaurant.findOne({
        where: {
          id: order.restaurantId
        }
      });

      if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: 'Restaurant not found',
          payload: []
        });
      }

      order['items'] = await Models.OrderItem.findAll({
        where: {
          orderId: order.id
        }
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Orders found',
      payload: orders
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'error on api',
      payload: []
    });
  }
};

async function getOrderById(req, res) {
  const orderId = req.params.id;

  try {
    let order = await Models.Order.findOne({
      where: {
        id: orderId
      }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
        payload: []
      });
    }

    order = order.toJSON();
    order['restaurant'] = await Models.Restaurant.findOne({
      where: {
        id: order.restaurantId
      }
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
        payload: []
      });
    }

    order['items'] = await Models.OrderItem.findAll({
      where: {
        orderId: orderId
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Order found',
      payload: order
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'error on api',
      payload: []
    });
  }
};

async function createOrder(req, res) { 
  const creatorUserId = req.User.id;
  const body = req.body;

  const requiredItems = [
    'items',
    'restaurantId',
  ];

  for (let item of requiredItems) {
    if(!helpers.existsAndHasValue(item, body)) {
      return res.status(422).json({
        success: false,
        message: `${item} field is required`
      });
    };
  };

  let restaurantPriceG = 0;
  let restaurantPriceM = 0;
  let restaurantPriceP = 0;
  try {
    restaurant = await Models.Restaurant.findOne({
      id: body.restaurantId
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
        payload: []
      });
    }

    restaurant = restaurant.toJSON();
    restaurantPriceG = restaurant.priceG;
    restaurantPriceM = restaurant.priceM;
    restaurantPriceP = restaurant.priceP;

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'error on api',
      payload: []
    });
  }

  const orderItems = body.items;
  let orderAmountG = 0;
  let orderAmountM = 0;
  let orderAmountP = 0;
  let orderTotalValue = 0;
  try {
    const orderItemRequiredItems = [
      'menuItemId',
      'size',
      'workerId',
    ];

    for (let orderItem of orderItems) {
      for (let item of orderItemRequiredItems) {
        if(!helpers.existsAndHasValue(item, orderItem)) {
          return res.status(422).json({
            success: false,
            message: `${item} field is required`
          });
        };
      };

      orderItem['size'] = orderItem['size'].toLowerCase();
      
      orderItem['size'] === 'p'
      ? orderAmountP++
      : orderItem['size'] === 'm'
      ? orderAmountM++
      : orderAmountG++;
    }

    orderTotalValue =
    (restaurantPriceG * orderAmountG)
    + (restaurantPriceM * orderAmountM)
    + (restaurantPriceP * orderAmountP);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'error on api',
      payload: []
    });
  }

  let order;
  try {
    order = await Models.Order.create({
      creatorUserId: creatorUserId,
      restaurantId: body.restaurantId,
      amountG: orderAmountG,
      amountM: orderAmountM,
      amountP: orderAmountP,
      totalValue: orderTotalValue
    });

    order = order.toJSON();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'error on api - could not create order',
      payload: []
    });
  }

  for (let orderItem of orderItems) {
    orderItem['orderId'] = order.id;
    await Models.OrderItem.create(orderItem);
  }

  return res.status(200).json({
    success: true,
    message: 'Order created successfully',
    payload: order
  });
};

async function deleteOrder(req, res) {
  const orderId = req.params.id;

  try {
    let order = await Models.Order.findOne({
      where: {
        id: orderId
      }
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
        payload: []
      });
    }

    await order.destroy();

    return res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
      payload: []
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'error on api',
      payload: []
    });
  }
};

module.exports = {
  getOrders,
  getOrderById,
  createOrder,
  deleteOrder
}