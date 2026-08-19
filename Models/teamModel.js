const mongoose = require('mongoose')

const teamShema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Team name is required'],
            trim: true
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