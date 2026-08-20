const Team = require('../Models/teamModel')
const User = require('../Models/userModel')
const mongoose =  require('mongoose')

//US5
const createTeamMember = async (req, res) => {
    try {
        const { name } = req.body

        if(!name){
            return res.status(400).json({message: 'Team name is required'})
        }

        const existingTeam = await Team.findOne({ name })
        if(existingTeam) {
            return res.status(400).json({message: 'This team already exists'})
        }

        const team = await Team.create({
            name,
            captain: req.user._id,
            members: [req.user._id]
        })

        res.status(201).json({message: 'Team cerate with success'})

    } catch (err) {
        res.status(500).json({message: "Erreur lors de la création de l'équipe", error: err.message})
    }
}

//US6
const joinTeam = async (req, res) =>{
    try{
        const teamId = req.params.id

        const team = await Team.findById(teamId)

    } catch (err) {
        res.status(500).json({message: "Error durinf team registration"})
    }
}
module.exports = { createTeam }