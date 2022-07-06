const userService = require("../services/user-service");

class UserController {
    createUser = async (req, res) => {
        try {
            const userAndToken = await userService.createUser(req.body);
            res.status(201).send(userAndToken);
        } catch (err) {
            res.status(400).send(err.message);
        }
    };

    readProfile = async (req, res) => {
        try {
            const user = req.user;
            res.status(200).send(user);
        } catch (err) {
            res.status(500).send(err.message);
        }
    };

    updateUser = async (req, res) => {
        try {
            const user = await userService.updateUser(req.body, req.user);
            res.status(200).send(user);
        } catch (err) {
            res.status(400).send(err.message);
        }
    };

    removeUser = async (req, res) => {
        try {
            await req.user.remove();
            res.status(200).send(req.user);
        } catch (err) {
            res.status(500).send(err.message);
        }
    };

    logIn = async (req, res) => {
        try {
            const userAndToken = await userService.logIn(
                req.body.email,
                req.body.password
            );
            res.status(200).send(userAndToken);
        } catch (err) {
            res.status(400).send(err.message);
        }
    };

    logOut = async (req, res) => {
        try {
            await userService.logOut(req.user, req.token);
            res.status(200).send();
        } catch (err) {
            res.status(500).send(err.message);
        }
    };

    logOutAll = async (req, res) => {
        try {
            await userService.logOutAll(req.user);
            res.status(200).send();
        } catch (err) {
            res.status(500).send(err.message);
        }
    };
}

module.exports = new UserController();
