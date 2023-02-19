const express = require('express');
const { check } = require('express-validator');
const groupController = require('../controllers/group');

const router = express.Router();

router.get('/', groupController.getAllGroup);

router.post('/', [
    check('groupName')
        .not()
        .isEmpty()],
        groupController.createGroup);

router.post('/addUser', groupController.addUsersToGroup);

module.exports = router;
