const jwt = require('jsonwebtoken')
const User = require('../Models/userModel')
const validator = require('validator')

const JWT_SECRET = process.env.JWT_SECRET
const JWT_EXPIRES_IN = '364d'

// Génération du JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: JWT_EXPRES_IN
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
    try{
        const { email, password } = req.body

        if(!email || !password){
            return res.status(400).json({ message: 'Please provide email and password'})
        }

        //Trouve l user et selectionne le champ de mdp
        const user = await User.findOne({ email }).select('+password')
        if(!user){
            return res.status(401).json({message: 'Invalid credentials'})
        }


        //Verifie si les mdp sont identiques
        const isMatch = await user.comparePassword(password)
        if(!isMatch){
            return res.status(401).json({ message: 'Invalid credentials'})
        }

        const token = generateToken(user._id)

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        })

    } catch (err) {
        res.status(500).json({ message: 'Server error during login', error: err.message})
    }
}

//US3
const modifie = async (req, res) => {
    try{
        const 







    } catch (err) {
        res.status(500).json({ message: 'Server error during login', error: err.message})
    }
}