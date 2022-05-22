const bcrypt = require('bcrypt');
const helpers = require('../helpers/functions');
const values = require('../helpers/values');
const Models = require('../models/index');
const token = require('../helpers/token');

async function getUsers(req, res) {
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
    let users = await Models.User.findAll({where: where});

    if (!users) {
      return res.status(404).json({
        success: false,
        message: 'No users found',
        payload: []
      });
    }

    return res.status(200).json({
      success: true,
      message: 'users found',
      payload: users
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

async function getUserById(req, res) {
  const userId = req.params.id;

  try {
    let user = await Models.User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        payload: []
      });
    }

    user = user.toJSON();

    return res.status(200).json({
      success: true,
      message: 'User found',
      payload: user
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

async function createUser(req, res) {
  const body = req.body;

  const requiredItems = [
    'departmentId',
    'email',
    'name',
    'type'
  ];

  for (let item of requiredItems) {
    if(!helpers.existsAndHasValue(item, body)) {
      return res.status(422).json({
        success: false,
        message: `${item} field is required`
      });
    };
  };

  if (!values.emailRegex.test(body.email)) {
    return res.status(422).json({
      success: false,
      message: 'Invalid e-mail format',
    });
  };

  const notes = body['notes'] ? body['notes'] : null;
  const sizePreference = body['sizePreference'] ? body['sizePreference'] : null;
  const password = body.type === 'admin' ? await helpers.randomString(10) : null;

  try {
    const emailExists = await Models.User.findAll({
      where: {
        email: (body.email).toLowerCase(),
      },
    });

    if (emailExists.length > 0) {
      return res.status(422).json({
        success: false,
        message: 'User already exists!',
        payload: [],
      });
    };

    const userToken = await token.create({
      date: new Date(),
    });

    let user = await Models.User.create({
      active: true,
      departmentId: body.departmentId,
      email: (body.email).toLowerCase(),
      name: body.name,
      type: body.type,
      notes: notes,
      sizePreference: sizePreference,
      password: password ? await bcrypt.hashSync(password, 10) : null,
      token: userToken,
    });

    await Models.UserDepartment.create({
      userId: user.id,
      departmentId: body.departmentId,
    });

    user = user.toJSON();

    return res.status(200).json({
      success: true,
      message: 'User created successfully',
      payload: user,
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

async function updateUser(req, res) {
  const userId = req.params.id;
  const body = req.body;

  try {
    let user = await Models.User.findOne({
      where: {
        id: userId,
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        payload: []
      });
    }

    const updateItems = [
      'active',
      'departmentId',
      'email',
      'name',
      'notes',
      'password',
      'sizePreference',
      'token',
      'type'
    ];

    for (let item of updateItems) {
      if (helpers.existsAndHasValue(item, body)) {
        user[item] = body[item];
      }
    }

    if('departmentId' in body) {
      await Models.UserDepartment.destroy({
        where: {
          userId: userId,
        }
      });

      await Models.UserDepartment.create({
        userId: userId,
        departmentId: body['departmentId'],
      });
    }

    await user.save();
    user = user.toJSON();

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      payload: user
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

async function deleteUser(req, res) {
  const userId = req.params.id;

  try {
    let user = await Models.User.findOne({
      where: {
        id: userId
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        payload: []
      });
    }

    await user.destroy();

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
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
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}