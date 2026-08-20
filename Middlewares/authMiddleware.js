const jwt = require("jsonwebtoken")
const User =  require('../Models/userModel')

const JWT_SECRET = process.env.JWT_SECRET

const authMiddleware =  async (req, res, next) => {
    try {
        let generateToken

        if(req.headers.authorization?.startsWith('Bearer')){
            token = req.headers.authorization.split (' ')[1]
        }
        if(!token){
            return res.status(401).json({ message: 'Not authorized, token missing'})
        }

        //Verifie le Token
        const decoded = jwt.verify(token, JWT_SECRET)

        //Recupere le user qui correspond au token
        const user = await User.findById(decoded.id)
        if(!user){
            return res.status(401).json({message: 'User no longer exists'})
        }

        req.user = user;
        next()

    } catch (err) {
        return res.status(401).json({ message: 'Not authorized, invalid token', error: err.message })
    }
}

module.exports = authMiddleware