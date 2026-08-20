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

module.exports = { tournament }