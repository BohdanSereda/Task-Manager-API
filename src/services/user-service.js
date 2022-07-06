const Task = require("../models/task");
const User = require("../models/user");
const taskHelper = require("../helpers/task-helper");

class UserService {
    createUser = async (user) => {
        const createUser = new User(user);
        const token = await createUser.generateAuthToken();
        await createUser.save();
        return { createUser, token };
    };

    updateUser = async (updates, user) => {
        const updatesProperties = Object.keys(updates);
        const allowedUpdates = ["name", "age", "email", "password"];
        const isValidUpdates = updatesProperties.every((updatesProperty) =>
            allowedUpdates.includes(updatesProperty)
        );
        if (!isValidUpdates) {
            throw new Error("Error invalid updates");
        }
        updatesProperties.forEach((update) => (user[update] = updates[update]));
        await user.save();
        return user;
    };

    logIn = async (email, password) => {
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        return { user, token };
    };

    logOut = async (user, requestToken) => {
        user.tokens = user.tokens.filter((token) => {
            return token.token !== requestToken;
        });
        await user.save();
    };

    logOutAll = async (user) => {
        user.tokens = [];
        await user.save();
    };
}
module.exports = new UserService();
