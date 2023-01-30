//Importation des packages
const User = require('../models/user')
const emailValidator = require('email-validator')
const passwordValidator = require('password-validator')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')

//Schema d'écriture d'un mot de passe complexe
let schema = new passwordValidator()
schema
    .is().min(8)
    .is().max(20)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)

//logique signup pour l'enregistrement de nouveaux Users
exports.signup = (req, res, next) => {
    //Restrictions d'enregistrement avec un email unique, des restrictions du mot de passe
    if (!req.body.email || !req.body.password) {
        res.status(500).json({ message: "Email ou mot de passe vide." })
        return
    }
    if (!emailValidator.validate(req.body.email)) {
        res.status(400).json({ message: "Email incorrect." })
        return
    }
    if (!schema.validate(req.body.password)) {
        res.status(400).json({ message: "Le mot de passe doit contenir entre 8 et 20 caractères.Il doit avoir au moins une minuscule, une majuscule et 2 chiffre." })
        return
    }
    //le package bcrypt protège le mot de passe en le hachant
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}

//fonction login pour la connection d'Users existants
exports.login = (req, res, next) => {
    //vérifie si l'utilisateur est enregistré en base de donnée 
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' })
                //vérifie le mot de passe transmis par le client
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Paire Identifiant / Mot de passe incorrecte' })
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jsonwebtoken.sign(
                            { userId: user._id },
                            process.env.TOKEN_SECRET,
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
}