const express = require('express');
const { check } = require('express-validator');
const commentsController = require('../controllers/comments');

const router = express.Router();

router.get('/', commentsController.getAllComments);

router.get('/:taskId', commentsController.getCommentsByTaskId);

router.post('/', [
    check('taskId')
        .not()
        .isEmpty(),
    check('commentedBy')
        .not()
        .isEmpty(),
    check('description')
        .not()
        .isEmpty(),],
    commentsController.addComments);

module.exports = router;