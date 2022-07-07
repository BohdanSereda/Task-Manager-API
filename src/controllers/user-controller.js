const userService = require("../services/user-service");

class UserController {
    createUser = async (req, res, next) => {
        try {
            const userAndToken = await userService.createUser(req.body);
            res.status(201).send(userAndToken);
        } catch (err) {
            next(err);
        }
    };

    readProfile = async (req, res, next) => {
        try {
            const user = req.user;
            res.status(200).send(user);
        } catch (err) {
            next(err);
        }
    };

    updateUser = async (req, res, next) => {
        try {
            const user = await userService.updateUser(req.body, req.user);
            res.status(200).send(user);
        } catch (err) {
            next(err);
        }
    };

    removeUser = async (req, res, next) => {
        try {
            await req.user.remove();
            res.status(200).send(req.user);
        } catch (err) {
            next(err);
        }
    };

    logIn = async (req, res, next) => {
        try {
            const userAndToken = await userService.logIn(
                req.body.email,
                req.body.password
            );
            res.status(200).send(userAndToken);
        } catch (err) {
            next(err);
        }
    };

    logOut = async (req, res, next) => {
        try {
            await userService.logOut(req.user, req.token);
            res.status(200).send();
        } catch (err) {
            next(err);
        }
    };

    logOutAll = async (req, res, next) => {
        try {
            await userService.logOutAll(req.user);
            res.status(200).send();
        } catch (err) {
            next(err);
        }
    };
}

module.exports = new UserController();
