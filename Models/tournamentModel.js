const mongoose = require('mongoose')

// On crée le schéma d'un tournoi
const tournamentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Tournament name is required'],
            trim: true
        },
        game: {
            type: String,
            required: [true, 'Game name is required'],
            trim: true
        },
        date: {
            type: Date,
            required: [true, 'Date is required']
        },
        rules: {
            type: String,
            required: [true, 'Rules a required'],
            trim: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        registrationOpen: {
            type: Boolean,
            default: true
        },
        registeredTeams: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Team'
            }
        ]
    },
    
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Tournament', tournamentSchema)