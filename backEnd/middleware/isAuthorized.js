const HttpError = require('../models/HttpError');

const isAuthorized = (req, res, next) => {
    if(req.session._id) {
        next();
    }
    else {
        const error = new HttpError('Login is required', 403);
        throw error;
    }
};

exports.isAuthorized = isAuthorized;