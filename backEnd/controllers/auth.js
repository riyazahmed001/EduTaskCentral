const { validationResult } = require('express-validator');
const HttpError = require('../models/HttpError');
const User = require('../models/User');

const authorizeUser = async (req, res, next) => {
    // validation Result has the result for the express validation done on the router
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs passed, please check your data.', 422)
        );
    }
    try {
        // find the user with specified username
        const user = await User.find({ username: req.body.username });

        // check if the user is available else send error response
        if(user == null) {
            return next(
                new HttpError('Username is invalid or not found', 400)
            );
        }
        // check if the password is valid else send Invalid password response
        if(user[0].password == req.body.password) {
            let session=req.session;
            // set the session with _id of the user
            session._id=user[0]._id;
            console.log(`Authenticated the user ${user[0].username}`);

            // result object to be sent back to the user
            const result = {
                isAuthenticated: true,
                message: "Authentication Success"
            };

            // send the result back as authenticated
            res.send(result);
        }
        else {
            return next(
            new HttpError('Invalid Password',401)
            );
        }
    } catch (err) {
        console.log(err)
        return next(
            new HttpError('Something went wrong, could not Authenticate',500)
        );
    }
};

const logoutUser = async (req, res, next) => {
    // destory the session to logut
    req.session.destroy();

    const result = {
        isLogoutSuccessful: true,
        message: "Logout Success"
    };
    
    // send the result back
    res.send(result);
};

exports.authorizeUser = authorizeUser;
exports.logoutUser = logoutUser;