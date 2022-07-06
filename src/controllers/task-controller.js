const Task = require("../models/task");
const User = require("../models/user");
class TaskController {
    createTask = async (req, res) => {
        const task = new Task({
            ...req.body,
            user_id: req.user._id,
        });
        try {
            await task.save();
            res.status(201).send(task);
        } catch (err) {
            res.status(400).send(err);
        }
    };

    readTasks = async (req, res) => {
        const match = {};
        if (req.query.completed) {
            match.completed = req.query.completed === "true";
        }
        try {
            const user = await User.findById(req.user._id)
                .populate({
                    path: "tasks",
                    match,
                })
                .exec();
            res.status(200).send(user.tasks);
        } catch (err) {
            res.status(500).send(err);
        }
    };

    readSingleTask = async (req, res) => {
        const _id = req.params.id;
        try {
            const task = await Task.findOne({ _id, user_id: req.user._id });
            if (!task) {
                return res.status(404).send();
            }
            res.status(200).send(task);
        } catch (err) {
            res.status(500).send(err);
        }
    };

    updateTask = async (req, res) => {
        const updates = req.body;
        const _id = req.params.id;
        const updatesProperties = Object.keys(updates);
        const allowedUpdates = ["description", "completed"];
        const isValidUpdates = updatesProperties.every((updatesProperty) =>
            allowedUpdates.includes(updatesProperty)
        );
        if (!isValidUpdates) {
            return res.status(400).send({ error: "Invalid updates" });
        }
        try {
            const task = await Task.findOne({ _id, user_id: req.user._id });
            if (!task) {
                return res.status(404).send();
            }
            updatesProperties.forEach(
                (update) => (task[update] = req.body[update])
            );
            await task.save();
            res.status(200).send(task);
        } catch (err) {
            res.status(400).send(err);
        }
    };

    removeTask = async (req, res) => {
        const _id = req.params.id;
        try {
            const task = await Task.findOneAndDelete({
                _id,
                user_id: req.user._id,
            });
            if (!task) {
                return res.status(404).send();
            }
            res.status(200).send(task);
        } catch (err) {
            res.status(500).send(err);
        }
    };
}

module.exports = new TaskController();
