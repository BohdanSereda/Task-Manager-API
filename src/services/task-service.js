const Task = require("../models/task");
const User = require("../models/user");
const taskHelper = require("../helpers/task-helper");

class TaskService {
    createTask = async (task, userId) => {
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
            throw new Error("Error cannot find task");
        }
        return task;
    };

    updateTask = async (updates, taskId, userId) => {
        const updatesProperties = Object.keys(updates);
        const allowedUpdates = ["description", "completed"];
        const isValidUpdates = updatesProperties.every((updatesProperty) =>
            allowedUpdates.includes(updatesProperty)
        );
        if (!isValidUpdates) {
            throw new Error("Error invalid updates");
        }
        const task = await Task.findOne({ _id: taskId, user_id: userId });
        if (!task) {
            throw new Error("Error cannot find task");
        }
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
            throw new Error("Error cannot find task");
        }
        return task;
    };
}
module.exports = new TaskService();
