const Team = require('../Models/teamModel')
const User = require('../Models/userModel')
const mongoose =  require('mongoose')

const isTeamMember = (team, userId) => {
    if(!team || !userId) return false
    const userIdStr = 
}