const express = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getAllUser);
router.post('/', [
    check('name')
        .not()
        .isEmpty(),
    check('rollNumber')
        .not()
        .isEmpty(),
    check('username')
        .not()
        .isEmpty(),
    check('password')
        .not()
        .isEmpty(),
    check('usertype')
        .not()
        .isEmpty()],
        userController.addUser);

module.exports = router;