const jwt = require('jsonwebtoken')
const User = require('../Models/userModel')
const validator = require('validator')

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = '364d'

// Génération du JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRES_IN
    })
}

// US1
const register = async (req, res) => {
    try{
        const { name, email, password } = req.body

        if(!name || !email || !pasword){
            return res.status(400).json({message: 'Please provide name, email and password'})
        }

        //Vérifie le mot de passe
        const isPaswwordOK = validator.isStrongPassword(password, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1
        })

        if(!isPaswwordOK){
            return res.status(400).json({ message: 'Password must have 1 lower, 1 upper, 1 number and 1 symbol and must be at least 6 characters long'})
        }

        //Verifie l email
        const isEmailOK = validator.isEmail(email)

        if(!isEmail){
            return res.status(400).json({message: 'You must provide a valid email'})
        }

        //Verifie si l user existe deja
        const existingUser = await User.findOne({ email})
        if(existingUser){
            return res.status(400).json({message: 'Email already in use'})
        }

        //Crer un nouvel user
        const user = await User.create({
            name,
            email,
            password
        })

        const token = generateToken(user._id)

        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })

    } catch (err) {
        res.status(500).json({ message: 'Server error during registration', error: err.message})
    }
}


//US2
const login = async (req, res) => {
    try {

        const { email, password } = req.body

        if (!email || !password) {

            return res.status(400).json({
                message: 'Email et mot de passe obligatoires'
            })
        }

        const user = await User.findOne({ email }).select('+password')

        if (!user) {

            return res.status(401).json({
                message: 'Email ou mot de passe incorrect'
            })
        }


        const isMatch = await user.comparePassword(password)

        if (!isMatch) {

            return res.status(401).json({
                message: 'Email ou mot de passe incorrect'
            })
        }

        const token = generateToken(user._id)

        res.status(200).json({
            message: 'Connexion réussie',
            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    } catch (err) {
        res.status(500).json({ message: 'Server error during login', error: err.message})
    }
}

//US3
const updateProfile = async (req, res) => {
    try{
        const userId =  req.body

        const  { name, email } = req.body

        const user = await User.findById(userId)

        if(!User) {
            return res.status(400).json({message: 'User not found'})
        }

        if(name){
            user.name = name
        }

        if(email){
            if(!validator.isEmail(email)){
                return res.status(400).json({message: 'Invalid email'})
            }
            
            const emailIsAlreadyUsed = await User.findOne({ email, _id: { $ne: userId}})

            if(emailIsAlreadyUsed){
                return res.status(400).json({message: 'Email is already us'})
            }

            user.email = email
        }

        await user.save()

        res.status(200).json({message: 'Profil modifie with success',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }})
        
    } catch (err) {
        res.status(500).json({message: 'Erreur lors de la modification du profil', error: err.message})
    } 
}

//US16
const modifieProfile = async (req, res) => {
    try{   
        if(req.user.role !== "admin"){
            return res.status(403).json({message: 'Only an admin can modifie roles'})
        }

        const userId = req.params.id

        const { role } = req.body

        const authorizedRole = [
            "joueur",
            "capitaine",
            "organisateur",
            "admin"
        ]
        if(!authorizedRole.includes(role)) {
            return rs.status(403).json({mesage: 'Role demand is not valid'})
        }

        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({message: 'User not found'})
        }

        user.role = role

        await user.save()

        res.status(200).json({message: 'The role has been successfully modified',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            } 
        })


    } catch (err) {
        res.status(500).json({message: 'Error during the modification'})
    }
}

module.exports = { register, login, updateProfile, modifieProfile }