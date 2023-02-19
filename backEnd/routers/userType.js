const express = require('express');
const { check } = require('express-validator');

const userTypeController = require('../controllers/userType');

const router = express.Router();

router.get('/', userTypeController.getAllUserType);
router.post('/', [
    check('code')
        .not()
        .isEmpty(),
    check('name')
        .not()
        .isEmpty(),],
    userTypeController.addUserType);

module.exports = router;