const mongoose = require('mongoose')

// On crée le schéma d'un tournoi
const tournamentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Le nom du tournoi est obligatoire'],
            trim: true
        },
        game: {
            type: String,
            required: [true, 'Le jeu est obligatoire'],
            trim: true
        },
        date: {
            type: Date,
            required: [true, 'La date est obligatoire']
        },
        rules: {
            type: String,
            required: [true, 'Les règles sont obligatoires'],
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
        }
    },

    {
        timestamps: true
    }
)

module.exports = mongoose.model('Tournament', tournamentSchema)