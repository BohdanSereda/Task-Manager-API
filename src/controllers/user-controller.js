const User = require('../models/user')

class UserController {
    createUser = async (req, res)=>{
        const user = new User(req.body)
        try{
            const token = await user.generateAuthToken()
            await user.save()
            res.status(201).send({user, token})
        }catch(err){
            res.status(400).send(err)
        }
    }

    readProfile = async (req, res) =>{
        try{
            const user = req.user
            res.status(200).send(user)
        }catch(err){
            res.status(500).send(err)
        }
    }

    updateUser = async(req, res)=>{
        const updates = req.body
        const updatesProperties = Object.keys(updates)
        const allowedUpdates = ['name', 'age', 'email', 'password']
        const isValidUpdates = updatesProperties.every((updatesProperty)=>allowedUpdates.includes(updatesProperty))
        if(!isValidUpdates){
            return res.status(400).send({error: 'Invalid updates'})
        }
        try{
            updatesProperties.forEach((update) =>req.user[update] = req.body[update])
            await req.user.save()
            res.status(200).send(req.user)
        }catch(err){
            res.status(400).send(err)
        }
    }

    removeUser =  async (req, res)=>{ 
        try{
            await req.user.remove()
            res.status(200).send(req.user)
        }catch(err){
            res.status(500).send(err)
        }
    }

    logIn = async (req, res)=>{
        const email = req.body.email
        const password = req.body.password
        try{
            const user = await User.findByCredentials(email, password)
            const token = await user.generateAuthToken()
            res.status(200).send({user, token})
        }catch(err){
            res.status(400).send(err)
        }
    } 

    logOut = async (req, res)=>{
        const user = req.user
        try{
            user.tokens = user.tokens.filter((token)=>{
                return token.token !== req.token
            })
            await user.save()
            res.status(200).send()
        }catch(err){
            res.status(500).send(err)
        }
    }

    logOutAll = async (req, res)=>{
        const user = req.user
        try{
            user.tokens = []
            await user.save()
            res.status(200).send()
        }catch(err){
            res.status(500).send(err)
        }
    }
}

module.exports = new UserController()