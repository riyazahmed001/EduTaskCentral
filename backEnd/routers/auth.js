// importing external dependency
const express = require('express');
const { check } = require('express-validator');

// importing internal module
const authController = require('../controllers/auth');

// initializing router
const router = express.Router();

// accept post request for the uri /login
router.post('/login',[
    check('username')
        .not()
        .isEmpty(),
    check('password')
        .not()
        .isEmpty(),
    ], authController.authorizeUser);

// accept get request for the uri /logout
router.get('/logout', authController.logoutUser);

// exporting router to use it else where within the same project
module.exports = router;