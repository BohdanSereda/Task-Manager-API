const User = require("../models/user-model");
const validationHelper = require("../helpers/validation-helper");
class UserService {
    createUser = async (user) => {
        await validationHelper.validateUser(user, false);
        const createUser = new User(user);
        const token = await createUser.generateAuthToken();
        await createUser.save();
        return { createUser, token };
    };

    updateUser = async (updates, user) => {
        const updatesProperties = await validationHelper.validateUserUpdates(
            updates,
            true
        );
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
