const express = require('express')
const router = express.Router

const { createTournament, updateTournament, deleteTournament, registrationTeam, openTournamentList, registeredTeam, tournamentStat, userInscription} = require('../Controllers/tournamentController')
const { protect } = require('../Middlewares/authMiddleware')

//US8
router.post('/', protect, createTournament)

//US9
router.put('/:id', protect, updateTournament)

//US10
router.delete('/:id', protect, deleteTournament)

//US11
router.post('/:id/register', protect, registrationTeam)

//US12
router.get('/open', protect, openTournamentList )

//US13
router.get('/:id/teams', protect, registeredTeam)

//US15
router.get('/stats', protect, tournamentStat)

//US18
router.get('/my-registration', protect, userInscription)

module.exports = router