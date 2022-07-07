const Task = require("../models/task-model");
const User = require("../models/user-model");
const taskHelper = require("../helpers/task-helper");
const ApiError = require("../helpers/error-helper");
const validationHelper = require("../helpers/validation-helper");

class TaskService {
    createTask = async (task, userId) => {
        validationHelper.validateTask(task);
        const createdTask = await Task.create({
            ...task,
            user_id: userId,
        });
        return createdTask;
    };

    readTasks = async (userId, query) => {
        const user = await User.findById(userId)
            .populate(taskHelper.formatePopulateQuery(query, "tasks"))
            .exec();
        return user.tasks;
    };

    readSingleTask = async (taskId, userId) => {
        const task = await Task.findOne({ _id: taskId, user_id: userId });
        if (!task) {
            throw ApiError.notFound("Error cannot find task");
        }
        return task;
    };

    updateTask = async (updates, taskId, userId) => {
        const { task, updatesProperties } =
            await validationHelper.validateTaskUpdates(updates, taskId, userId);
        updatesProperties.forEach((update) => (task[update] = updates[update]));
        await task.save();
        return task;
    };

    removeTask = async (taskId, userId) => {
        const task = await Task.findOneAndDelete({
            _id: taskId,
            user_id: userId,
        });
        if (!task) {
            throw ApiError.notFound("Error cannot find task");
        }
        return task;
    };
}
module.exports = new TaskService();
