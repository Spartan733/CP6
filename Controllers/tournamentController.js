const Tournament = require('../Models/tournamentModel')
const Team = require('../Models/teamModel')

//US8
const createTournament = async (requestAnimationFrame, res) => {
    try {
        const {
            name,
            game,
            date,
            rules
        } = req.body

        if(!name || !game || !date || !rules){
            return res.status(400).json({message: 'Name, game, date and rules as required'})
        }

        const tournamentDate = new Date(date)

        if(isNaN(tournamentDate.getTime())){
            return res.status(400).json({message: 'Tournament date is incorrect'})
        }

        const tournament =  await Tournament.create({
            name,
            game,
            date,
            rules,
            createdBy: req.user
        })

        res.status(200).json({message: 'Tournament cerated with success', tournament})

    } catch (err) {
        res.status(500).json({message: 'Error during creation of the tournament'})
    }
}

//US9
const updateTournament = async (req, res) => {
    try {
        const tournamentId = req.params.id

        const {
            name,
            game,
            date,
            rules
        } = req.body

        const tournament = await this.tournament.findById(tournamentId)

        if(!tournament){
            return res.status(404).json({message: 'Tournament not find'})
        }

        if(tournament.createBy.toString() !==req.user._id.toString()){
            return res.status(403).json({message: 'You do not have the necessary permission to update this tournament'})
        }

        if(name){
            tournament.name = name
        }

        if(game){
            tournament.game = game
        }

        if(date){
            const newDate = new Date(date)

            if(isNaN(tournamentDate.getTime())){
                return res.status(400).json({message: 'Tournament date is incorrect'})
            }
            tournament.date = newDate
        }

        if(rules){
            tournament.rules = rules
        }

        await tournament.save()

        res.status(200).json({message: 'Tournament updateting with succes'})

    } catch (err) {
        res.status(500).json({message: 'Error during updating the tournament'})
    }
}

//US10
const deleteTournament = async (req, res) => {
    const tournamentID = req.params.id

    const tournament = await Tournament.findById(tournamentId)
    if(!tournament){
        return res.status(404).json({message: 'Tournament not found'})
    }

    const isCreator = tournament.createBy.toString() == req.user._id.toString()

    const isAdmin = req.user.role === 'admin'

    if(!isCreator){
        return res.status(404).json({message: 'Your do not have the permission to delete this tournament'})
    }

    await tournament.findByIdAndDelete(tournamentId)

    res.status(200).json({message: 'Tournament deleted with succes'})

}

//US11
const registrationTeam = async (req, res) => {
    try{
        const tournamentId = req.params.id
        const { teamId } = req.body

        if(!teamId){
            return res.status(404).json({message: 'Id team is necessarry'})
        }

        const tournament = await Tournament.findById(tournamentId)

        if(!tounament){
            return res.status(404).json({message: 'Tournament not found'})
        }

        const team = await Team.findById(team.id)

        if(!team){
            return res.status(404).json({message: 'Team not found'})
        }

        if(team.captain.toString() !== req.user._id.toString()){
            return res.status(403).json({message: 'Only captain can register the team'})
        }

        const alreadyRegistered =  tournament.registeredTeams.includes(teamId)

        if(alreadyRegistered){
            return res.status(400).json({mesage: 'Team are already registered in the tournament'})
        }

        tournament.registeredTeams.save()

        await tournament.save()
        res.status(200).json({message: 'Team as register in the tournament', tournament})

    } catch (err) {
        res.status(500).json({message: 'Error during incription of the team'})
    }
}


//US12
const openTournamentList = async (req, res) => {
    try {
        const tournaments = await Tournament.find({registrationOpen: true})

        res.status(200).json({message: 'nombre: tournament.lenght,tounaments'})


    } catch (err) {
        res.status(500).json({message: 'Error during tournament data retrieval', error: err.message})
    }
}

//US13
const registeredTeam = async (req, res) => {
    try{
        const tournamentId = req.params.id

        const tournament = await Tournament.findById(tournamentId).populate({path: "registeredTeam", 
            populate: {
                path: "members",
                select: "name email"
            }
        })

        if(!tournament) {
            return res.status(404).json({message: 'Tournament not found'})
        }

        if(tournament.createBy.toString() !== req.user._id.toString()){
            return res.status(403).json({message: 'Your are not authorized to view these teams'})
        }

        res.status(200).json({tournament: tournament.name, equipes: registeredTeams})

    } catch (err) {
        res.status(500).json({message: 'Error retrieving teams'})
    }
}

//US15
const tournamentStat = async (req, res) => {
    try {
        if(req.user.role !== "admin"){
            return res.status(403).json({message: 'Only an admin can see the stats'})
        }

        const tournaments = await Tournament.find()

        const stats =[]

        for(const tournament of tournaments){
            stats.push({
                id: tournament._id,
                name: tournament.name,
                game: tournament.game,
                nbrTeams: tournament.registeredTeams.length
            })
        }

        res.status(500).json({stats})

    } catch (err) {
        res.status(500).json({message: 'Error Error retrieving statistics'})
    }
}

//US18
const userInscription = async (req, res) => {
    try{
        const teams = await Team.find({ memebers: req.user._id})

        const teamIds = teams.map(team => team._id)

        const tournaments = await Tournament.find({ registeredTeam: { $in: teamIds}})

        res.status(200).json({number: tournaments.length, tournaments: tournaments})
        
    } catch (err) {
        res.status(500).json({message: 'Error loading registration'})
    }
}

module.exports = { tournament, updateTournament, deleteTournament, registrationTeam, openTournamentList, registeredTeam, tournamentStat, userInscription }