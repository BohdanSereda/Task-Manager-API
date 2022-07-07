const User = require("../models/user-model");
const Task = require("../models/task-model");
const validator = require("validator");
const ApiError = require("../helpers/error-helper");
class validationHelper {
    validateName(name, isUpdated) {
        if (isUpdated && !name) {
            return;
        }
        if (!name) {
            throw ApiError.badRequest(`Name is required`);
        }
    }

    validateEmail = async (email, isUpdated) => {
        if (isUpdated && !email) {
            return;
        }
        if (!email) {
            throw ApiError.badRequest(`Email is required`);
        }
        const candidate = await User.findOne({ email });
        if (candidate) {
            throw ApiError.badRequest(
                `User with this email ${email} already exists`
            );
        }
        if (!validator.isEmail(email)) {
            throw ApiError.badRequest(`Email is invalid: ${email}`);
        }
    };

    validatePassword(password, isUpdated) {
        if (isUpdated && !password) {
            return;
        }
        if (!password) {
            throw ApiError.badRequest(`Password is required`);
        }
        if (password.length < 7) {
            throw ApiError.badRequest(
                `Password needs to be at least 7 characters`
            );
        }
    }

    validateAge(age, isUpdated) {
        if (isUpdated && !age) {
            return;
        }
        if (age < 0 || age > 150) {
            throw ApiError.badRequest(`Age is invalid: ${age}`);
        }
    }

    validateUser = async (user, isUpdated) => {
        this.validateName(user.name, isUpdated);
        await this.validateEmail(user.email, isUpdated);
        this.validatePassword(user.password, isUpdated);
        this.validateAge(user.age, isUpdated);
    };

    validateUserUpdates = async (updates, isUpdated) => {
        await this.validateUser(updates, isUpdated);
        const updatesProperties = Object.keys(updates);
        const allowedUpdates = ["name", "age", "email", "password"];
        const isValidUpdates = updatesProperties.every((updatesProperty) =>
            allowedUpdates.includes(updatesProperty)
        );
        if (!isValidUpdates) {
            throw ApiError.badRequest("Error invalid updates");
        }
        return updatesProperties;
    };

    validateTask(task) {
        if (!task.description) {
            throw ApiError.badRequest(`Description is required`);
        }
    }

    validateTaskUpdates = async (updates, taskId, userId) => {
        const updatesProperties = Object.keys(updates);
        const allowedUpdates = ["description", "completed"];
        const isValidUpdates = updatesProperties.every((updatesProperty) =>
            allowedUpdates.includes(updatesProperty)
        );
        if (!isValidUpdates) {
            throw ApiError.badRequest("Error invalid updates");
        }
        const task = await Task.findOne({ _id: taskId, user_id: userId });
        if (!task) {
            throw ApiError.notFound("Error cannot find task");
        }
        return { task, updatesProperties };
    };
}
module.exports = new validationHelper();
