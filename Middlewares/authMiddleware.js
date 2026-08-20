const jwt = require('jsonwebtoken')
const User = require('../Models/userModel')


const protect = async (req, res, next) => {

    try {

        const authHeader = req.headers.authorization

        if (!authHeader) {

            return res.status(401).json({
                message: 'Vous devez être connecté'
            })
        }

        const token = authHeader.split(' ')[1]

        // Si le token n'existe pas
        if (!token) {

            return res.status(401).json({
                message: 'Token manquant'
            })
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        const user = await User.findById(decoded.id)


        if (!user) {

            return res.status(401).json({
                message: 'Utilisateur introuvable'
            })
        }

        req.user = user


        next()

    } catch (err) {

        return res.status(401).json({
            message: 'Token invalide'
        })
    }
}

module.exports = {
    protect
}