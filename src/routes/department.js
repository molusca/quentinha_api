var express = require('express');
var router = express.Router();
var department = require('../controllers/department');

router.get('/', department.getDepartments);
router.post('/', department.createDepartment);
router.put('/:id', department.updateDepartment);
router.get('/:id', department.getDepartmentById);
router.delete('/:id', department.deleteDepartment);

module.exports = router;