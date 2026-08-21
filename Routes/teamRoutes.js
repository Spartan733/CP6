const express = require('express')
const router = express.Router()

const { protect } = require('../Middlewares/authMiddleware')


const { createTeam, joinTeam, addMember, removeMember, deleteTeam, getTeamDetails } = require('../Controllers/teamController')

router.post('/', protect, createTeam)

router.post('/:id/join', protect, joinTeam)

router.delete('/:id', protect, deleteTeam)

router.get('/:id',protect, getTeamDetails)

router.post('/:id/members', protect, addMember)

router.delete('/:id/members/:userId', protect, removeMember)

module.exports = router