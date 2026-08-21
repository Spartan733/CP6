const express = require('express')
const router = express.Router()

const { protect } = require('../Middlewares/authMiddleware')


const { createTeamMember, joinTeam, addMember, removeMember, deleteTeam, teamDetails } = require('../Controllers/teamController')

router.post('/', protect, createTeamMember)

router.post('/:id/join', protect, joinTeam)

router.delete('/:id', protect, deleteTeam)

router.get('/:id',protect, teamDetails)

router.post('/:id/members', protect, addMember)

router.delete('/:id/members/:userId', protect, removeMember)

module.exports = router