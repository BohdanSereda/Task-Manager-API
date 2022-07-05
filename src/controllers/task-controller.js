const Task = require('../DataBase/models/task')

class TaskController {
    createTask = async (req, res)=>{
        const task = new Task({
            ...req.body,
            user_id: req.user._id
        })
        try{
            await task.save()
            res.status(201).send(task)
        }catch(err){
            res.status(400).send(err)
        }
    }

    readTasks = async (req, res)=>{
        try{
            const tasks = await Task.find()
            res.status(200).send(tasks)
        }catch(err){
            res.status(500).send(err)
        }
    }

    readSingleTask = async (req, res)=>{
        const _id = req.params.id
        try{
            const task = await  Task.findById(_id)
            if(!task) {
                return res.status(404).send()
            }
            res.status(200).send(task)
        }catch(err){
            res.status(500).send(err)
        }
    }

    updateTask = async(req, res)=>{
        const updates = req.body
        const _id = req.params.id
        const updatesProperties = Object.keys(updates)
        const allowedUpdates = ['description', 'completed']
        const isValidUpdates = updatesProperties.every((updatesProperty)=>allowedUpdates.includes(updatesProperty))
        if(!isValidUpdates){
            return res.status(400).send({error: 'Invalid updates'})
        }
        try{
            const task = await Task.findById(_id)
            if(!task){
                return res.status(404).send()
            }
            updatesProperties.forEach((update)=> task[update] = req.body[update])
            await task.save()
            res.status(200).send(task)
        }catch(err){
            res.status(400).send(err)
        }
    }
    
    removeTask = async (req, res)=>{
        const _id = req.params.id
        try{
            const task = await Task.findByIdAndDelete(_id)
            if(!task){
                return res.status(404).send()
            }
            res.status(200).send(task)
        }catch(err){
            res.status(500).send(err)
        }
    }
}

module.exports = new TaskController()