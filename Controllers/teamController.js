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

        res.status(201).json({message: 'Team create with success'})

    } catch (err) {
        res.status(500).json({message: "Error during creation of the team", error: err.message})
    }
}

//US6
const joinTeam = async (req, res) =>{
    try{
        const teamId = req.params.id

        const team = await Team.findById(teamId)
        if(!team){
            return res.status(404).json({message: 'Team not found'})
        }

        const alreadyMember = team.members.some( member => member.toString() === req.user._id.toString())
        if(alreadyMember){
            return res.status(400).json({message: 'You are already member of this team'})
        }

        team.members.push(req.user._id)

        await team.save()

        res.status(200).json({message: 'You have rejoin the team'})

    } catch (err) {
        res.status(500).json({message: "Error during team registration"})
    }
}

//US7
const addMember = async (req, res) => {
    try {
        const teamId = req.params.id

    const { userId } = req.body

    const team = await Team.findById(teamId)

    if(!team){
        return res.status(404).json({message: 'Team not found'})
    }

    if(team.capitaine.toString() !== req.user._id.toString()){
        return res.status(403).json({message: 'Only capitaine can manage'})
    }
    const user = await User.findById(userId)

    if(!user){
        return res.status(404).json({message: 'Player not found'})
    }

    const alreadyMember = team.members.some( member => member.toString() === userId)
    if(alreadyMember){
        return res.status(400).json({message: 'This player is already in the team'})
    }

    team.members.push(userId)

    await team.save()

    res.status(200).json({message: 'Player add in the team'})

    } catch (err) {
        res.status(500).json({message: "Error when addition of the player", error: err.message})
    } 
}


const removeMember = async (req, res) => {
    try {
        const teamId = req.params.id

        const userId  = req.params.userId

        const team = await Team.findById(teamId)
        if(!team){
            return res.status(404).json({message: 'Team not found'})
        }

        if(team.capitaine.toString() !== req.user._id.toString()){
            return res.status(403).json({message: 'Only captain can remove a player'})
        }

        if(userId === req.user._id.toString()){
            return res.status(403).json({message: 'The captain cannot remove himself.'})
        }

        team.members = team.members.filter(member => member.toString() !== userId)

        await team.save()

        res.status(200).json({message: 'Player removed from the team'})

    } catch (err) {
        res.status(500).json({message: 'Error during the removal of the player'})
    }
}

//US14
const deleteTeam = async (req, res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(403).json({message: 'Only administrator can delete a team'})
        }

        const teamId = req.params.id

        const team = await Team.findById(teamId)

        if(!team){
            return res.status(404).json({message: 'Team not found'})
        }

        await Team.findByIdAndDelete(teamId)

        res.status(200).json({message: 'Team delete with success'})

    } catch (err) {
        res.status(500).json({message: 'Error during deleted team', error: err.message})
    }
}

module.exports = { createTeam, joinTeam, addMember, removeMember}