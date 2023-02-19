const express = require('express');
const accountDetailsController = require('../controllers/accountDetails');

const router = express.Router();

router.get('/', accountDetailsController.getAccountDetails);

module.exports = router;