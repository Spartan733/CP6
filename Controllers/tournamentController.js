const Tournament = require('../Models/tournamentModel')

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

module.exports = { tournament, updateTournament }