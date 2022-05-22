const bcrypt = require('bcrypt');
const helpers = require('../helpers/functions');
const values = require('../helpers/values');
const Models = require('../models/index');
const token = require('../helpers/token');

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

module.exports = {
  createUser
}