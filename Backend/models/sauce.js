const mongoose = require('mongoose')

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },//identifiant mongoDB unique de l'user qui a crée la sauce
    name: { type: String, required: true },//nom de la sauce
    manufacturer: { type: String, required: true },//fabriquant de la sauce
    description: { type: String, required: true },//description de la sauce
    mainPepper: { type: String, required: true },//principal ingrédient épicé de la sauce
    imageUrl: { type: String, required: true },//URL de l'image de la sauce DL par l'User
    heat: { type: Number, required: true },//Nombre en 1 et 10 décrivant la sauce
    likes: { type: Number, required: true },//Nombre d'utilisateurs qui "likent" la sauce
    dislikes: { type: Number, required: true },//Nombre d'Users qui "dislike(s) la sauce"
    usersLiked: { type: Object, required: true },//Tableau des ID des Users qui ont "like" la sauce
    usersDisliked: { type: Object, required: true },//Tableau des ID des Users qui ont "dislike" la sauce
})

module.exports = mongoose.model('Sauce', sauceSchema)