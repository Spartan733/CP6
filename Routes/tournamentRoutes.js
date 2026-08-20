const express = require('express')
const router = express.Router

const {createTournament, updateTournament, deletTournament, tournament, deleteTournament} = require('../Controllers/tournamentController')
const { protect } = require('../Middlewares/authMiddleware')

//US8
router.post('/', protect, createTournament)

//US9
router.put('/:id', protect, updateTournament)

//US10
router.delete('/:id', protect, deleteTournament)

module.exports = router