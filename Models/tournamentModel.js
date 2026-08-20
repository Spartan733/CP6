const mongoose = require('mongoose')

const tournamentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tournament name is required'],
            ref: 'User'
        },
        game: {
            type: String,
            required: [true, 'Game name is required']
        },
        date: {
            type: Date,
            required: [true, 'Date is required']
        },
        rules: {
            type: String,
            required: [true, 'Rules is required']
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

module.exports = mongoose.model('Tournament', tournamentSchema)