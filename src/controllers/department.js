const helpers = require('../helpers/functions');
const Models = require('../models/index');

async function getDepartments(req, res) {
  try {
    let departments = await Models.Department.findAll();

    if (!departments) {
      return res.status(404).json({
        success: false,
        message: 'No departments found',
        payload: []
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Departments found',
      payload: departments
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

async function getDepartmentById(req, res) {
  const departmentId = req.params.id;

  try {
    let department = await Models.Department.findOne({
      where: {
        id: departmentId
      }
    });

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found',
        payload: []
      });
    }

    department = department.toJSON();

    return res.status(200).json({
      success: true,
      message: 'Department found',
      payload: department
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

async function createDepartment(req, res) {
  const body = req.body;

  const requiredItems = ['name'];

  for (let item of requiredItems) {
    if(!helpers.existsAndHasValue(item, body)) {
      return res.status(422).json({
        success: false,
        message: `${item} field is required`
      });
    };
  };

  try {
    let department = await Models.Department.create({
      name: body.name,
    });

    department = department.toJSON();

    return res.status(200).json({
      success: true,
      message: 'Department created successfully',
      payload: department
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

async function updateDepartment(req, res) {
  const departmentId = req.params.id;
  const body = req.body;

  const requiredItems = ['name'];

  for (let item of requiredItems) {
    if(!helpers.existsAndHasValue(item, body)) {
      return res.status(422).json({
        success: false,
        message: `${item} field is required`
      });
    };
  };

  try {
    let department = await Models.Department.findOne({
      where: {
        id: departmentId,
      }
    });

    if (!department) {
      return res.status(404).json({
        success: false,
        message: 'Department not found',
        payload: []
      });
    }

    department.name = body.name;
    await department.save();

    department = department.toJSON();

    return res.status(200).json({
      success: true,
      message: 'Department updated successfully',
      payload: department
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

async function deleteDepartment(req, res) {
  const departmentId = req.params.id;

  try {
    await Models.Department.destroy({
      where: {
        id: departmentId,
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Department deleted successfully',
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
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment
}