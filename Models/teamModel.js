const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Team name is required'],
            trim: true
        },
        role: {
            type: String,
            reqiured:[true, 'Role name is required']
            
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdBy: {
            type: String,
            ref: 'User',
            required: true
        }

    }
)

module.exports = mongoose.model('Team', teamSchema)