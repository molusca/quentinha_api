const helpers = require('../helpers/functions');
const values = require('../helpers/values');
const Models = require('../models/index');

async function getRestaurants(req, res) {
  try {
    let restaurants = await Models.Restaurant.findAll();

    if (!restaurants) {
      return res.status(404).json({
        success: false,
        message: 'No restaurants found',
        payload: []
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Restaurants found',
      payload: restaurants
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

async function getRestaurantById(req, res) {
  const restaurantId = req.params.id;

  try {
    let restaurant = await Models.Restaurant.findOne({
      where: {
        id: restaurantId
      }
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
        payload: []
      });
    }

    let menuItems = await Models.MenuItem.findAll({
      where: {
        restaurantId: restaurantId
      }
    });

    restaurant = restaurant.toJSON();
    restaurant['menuItems'] = menuItems;

    return res.status(200).json({
      success: true,
      message: 'Restaurant found',
      payload: restaurant
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

async function createRestaurant(req, res) {
  const body = req.body;

  const requiredItems = [
    'cnpj',
    'name',
    'orderEmail',
    'oderPhone',
    'priceL',
    'priceM',
    'priceS',
    'responsibleEmail',
    'responsibleName',
    'responsiblePhone',
  ];

  for (let item of requiredItems) {
    if(!helpers.existsAndHasValue(item, body)) {
      return res.status(422).json({
        success: false,
        message: `${item} field is required`
      });
    };
  };

  if (!values.emailRegex.test(body.orderEmail) || !values.emailRegex.test(body.responsibleEmail)) {
    return res.status(422).json({
      success: false,
      message: 'Invalid e-mail format',
    });
  };

  try {
    const restaurantExists = await Models.Restaurant.findAll({
      where: {
        cnpj: body.cnpj,
      },
    });

    if (restaurantExists.length > 0) {
      return res.status(422).json({
        success: false,
        message: 'Restaurant already exists!',
        payload: [],
      });
    };

    let restaurant = await Models.Restaurant.create({
      cnpj: body.cnpj,
      name: body.name,
      orderEmail: body.orderEmail,
      oderPhone: body.oderPhone,
      priceL: body.priceL,
      priceM: body.priceM,
      priceS: body.priceS,
      responsibleEmail: body.responsibleEmail,
      responsibleName: body.responsibleName,
      responsiblePhone: body.responsiblePhone
    });

    restaurant = restaurant.toJSON();

    return res.status(200).json({
      success: true,
      message: 'Restaurant created successfully',
      payload: restaurant,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'error on api',
      payload: [],
    });
  }
};

async function updateRestaurant(req, res) {
  const restaurantId = req.params.id;
  const body = req.body;

  try {
    let restaurant = await Models.Restaurant.findOne({
      where: {
        id: restaurantId,
      }
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
        payload: []
      });
    }

    const updateItems = [
      'cnpj',
      'name',
      'orderEmail',
      'oderPhone',
      'priceL',
      'priceM',
      'priceS',
      'responsibleEmail',
      'responsibleName',
      'responsiblePhone',
    ];

    for (let item of updateItems) {
      if (helpers.existsAndHasValue(item, body)) {
        restaurant[item] = body[item];
      }
    }

    await restaurant.save();
    restaurant = restaurant.toJSON();

    return res.status(200).json({
      success: true,
      message: 'Restaurant updated successfully',
      payload: restaurant
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

async function deleteRestaurant(req, res) {
  const restaurantId = req.params.id;

  try {
    let restaurant = await Models.Restaurant.findOne({
      where: {
        id: restaurantId
      }
    });

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found',
        payload: []
      });
    }

    await restaurant.destroy();

    return res.status(200).json({
      success: true,
      message: 'Restaurant deleted successfully',
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
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
}