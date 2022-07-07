const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const ApiError = require("../helpers/error-helper");
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });

        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        return next(ApiError.unauthorizedError());
    }
};

module.exports = auth;
