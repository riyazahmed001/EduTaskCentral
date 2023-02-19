const express = require('express');
const { check } = require('express-validator');
const taskTypeController = require('../controllers/taskType');

const router = express.Router();

router.get('/', taskTypeController.getAllTaskType);

router.post('/', [
    check('code')
        .not()
        .isEmpty(),
    check('name')
        .not()
        .isEmpty(),],
        taskTypeController.addTaskType);

module.exports = router;