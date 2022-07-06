const Task = require("../models/task");
const taskService = require("../services/task-service");
class TaskController {
    createTask = async (req, res) => {
        try {
            const task = await taskService.createTask(req.body, req.user._id);
            console.log(task);
            res.status(201).send(task);
        } catch (err) {
            res.status(400).send(err.message);
        }
    };

    readTasks = async (req, res) => {
        try {
            const tasks = await taskService.readTasks(req.user._id, req.query);
            res.status(200).send(tasks);
        } catch (err) {
            res.status(500).send(err.message);
        }
    };

    readSingleTask = async (req, res) => {
        try {
            const task = await taskService.readSingleTask(
                req.params.id,
                req.user._id
            );
            res.status(200).send(task);
        } catch (err) {
            res.status(500).send(err.message);
        }
    };

    updateTask = async (req, res) => {
        try {
            const task = await taskService.updateTask(
                req.body,
                req.params.id,
                req.user._id
            );
            res.status(200).send(task);
        } catch (err) {
            res.status(400).send(err.message);
        }
    };

    removeTask = async (req, res) => {
        try {
            const task = await taskService.removeTask(
                req.params.id,
                req.user._id
            );
            res.status(200).send(task);
        } catch (err) {
            res.status(500).send(err.message);
        }
    };
}

module.exports = new TaskController();
