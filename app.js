const express = require('express')
const app = express()
const cors =  require('cors')
const helmet =  require('helmet')
const rateLimit =  require('express-rate-limit')
const port = 3000

require('dotenv').config()
require('./config/db')


//  IMPORT DES ROUTES
const authRoutes = require('./Routes/authRoute')
const teamRoutes = require('./Routes/teamRoutes')
const tournamentRoutes = require('./Routes/tournamentRoutes')


//Middlewares
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: { status: 429, error: 'Too many requests'}
})

app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: { policy: "cross-origin" }
    })
)

app.use(express.json())
app.use(cors())
app.use(limiter)

// Monter le routeur sur chemain de base
const BASE_ROUTE = '/api/v1'
app.use(`${BASE_ROUTE}/auth`, authRoutes)
app.use(`${BASE_ROUTE}/teams`, teamRoutes)
app.use(`${BASE_ROUTE}/tournaments`, tournamentRoutes)

//      URL
app.get('/', (req, res) => {
    res.send('CP6')
})

app.listen(port, () => {
    // Ce console log s'affiche uniquement coté SERVEUR et non coté CLIENT
    console.log(`Serveur démarré sur http://localhost:${port}`)
})

