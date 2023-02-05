const express = require('express')
require('dotenv').config()
let userRoutes = require('./routes/user')
let sauceRoutes = require('./routes/sauce')
const path = require('path')

const mongoose = require('mongoose')

//Logique de connection mongoDB
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'))

const app = express()

//CORS
app.use((req, res, next) => {
    //Permet d'accéder à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    //Permet l'envoi des requêtes avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use(express.json())
//route d'authentification
app.use('/api/auth', userRoutes)
app.use('/api/sauces', sauceRoutes)
app.use('/images', (_, res, next) => {
    res.set('Cross-Origin-Resource-Policy', 'cross-origin')
    next()
})
app.use('/images', express.static(path.join(__dirname, 'images')))

module.exports = app
