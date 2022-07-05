const mongoose = require('mongoose')

const Task = mongoose.model('Tasks', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId
    }
})
module.exports = Task