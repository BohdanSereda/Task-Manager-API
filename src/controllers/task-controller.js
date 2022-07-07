const taskService = require("../services/task-service");
class TaskController {
    createTask = async (req, res, next) => {
        try {
            const task = await taskService.createTask(req.body, req.user._id);
            res.status(201).send(task);
        } catch (err) {
            next(err);
        }
    };

    readTasks = async (req, res, next) => {
        try {
            const tasks = await taskService.readTasks(req.user._id, req.query);
            res.status(200).send(tasks);
        } catch (err) {
            next(err);
        }
    };

    readSingleTask = async (req, res, next) => {
        try {
            const task = await taskService.readSingleTask(
                req.params.id,
                req.user._id
            );
            res.status(200).send(task);
        } catch (err) {
            next(err);
        }
    };

    updateTask = async (req, res, next) => {
        try {
            const task = await taskService.updateTask(
                req.body,
                req.params.id,
                req.user._id
            );
            res.status(200).send(task);
        } catch (err) {
            next(err);
        }
    };

    removeTask = async (req, res, next) => {
        try {
            const task = await taskService.removeTask(
                req.params.id,
                req.user._id
            );
            res.status(200).send(task);
        } catch (err) {
            next(err);
        }
    };
}

module.exports = new TaskController();
