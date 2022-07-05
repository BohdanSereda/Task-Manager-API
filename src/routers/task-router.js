const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const taskController = require('../controllers/task-controller')

router.post('/tasks', auth, taskController.createTask)
router.patch('/tasks/:id', auth, taskController.updateTask)
router.get('/tasks', auth, taskController.readTasks)
router.get('/tasks/:id', auth, taskController.readSingleTask)
router.delete('/tasks/:id', auth, taskController.removeTask)
module.exports = router