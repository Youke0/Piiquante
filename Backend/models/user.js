const mongoose = require('mongoose')

//Permet d'avoir un email unique pour chaque utilisateur
const uniqueValidator = require('mongoose-unique-validator')

//Schéma de création d'utilisateur avec une adresse mail unique
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)