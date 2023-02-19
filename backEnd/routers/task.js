const express = require('express');
const { check } = require('express-validator');
const taskController = require('../controllers/task');

const router = express.Router();

router.get('/', taskController.getAllTask);

router.get('/assignedByMe', taskController.getTaskAssignedByMe);

router.get('/assignedToMe', taskController.getTaskAssignedToMe);

router.post('/update', [
    check('taskId')
        .not()
        .isEmpty(),
    ],
    taskController.updateTask);

router.post('/', [
    check('taskType')
        .not()
        .isEmpty(),
    check('numberOfEvents')
        .not()
        .isEmpty(),
    check('assignedBy')
        .not()
        .isEmpty(),
    check('assignedTo')
        .not()
        .isEmpty(),],
    taskController.addTask);

router.post('/groupId', [
    check('taskType')
        .not()
        .isEmpty(),
    check('numberOfEvents')
        .not()
        .isEmpty(),
    check('groupId')
        .not()
        .isEmpty(),],
    taskController.addTaskToGroupId);

module.exports = router;