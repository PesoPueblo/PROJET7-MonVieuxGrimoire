const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken')
//importation du model d'un user
const User = require('../models/user')

//création de l'inscription
exports.signup = (req,res,next)=>{
    //on hash le mot de passe avec bcrypt
    bcrypt.hash(req.body.password, 10)
    .then(hash=> {
        //on enregistre l'utilisateur avec l'email saisi et le hash du mdp
        const user = new User({
            email: req.body.email,
            password: hash
        });
        user.save()
            .then(()=> {res.status(201).json({message:'Utilisateur créé'})})
            .catch(error=> res.status(500).json({error}))
    })
    .catch(error=> res.status(500).json({error}))
}
//gestion de la connexion 
exports.login = (req,res,next)=>{
    User.findOne({email: req.body.email})
    .then(user => {
        if(user === null){
            res.status(401).json({message: 'Paire identifiant/mot de passe incorecte!'});
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then( valide =>{
                if ( !valide){
                    res.status(401).json({message: 'Paire identifiant/mot de passe incorecte!'});
                } else { res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        {userId: user._id},
                        'bcbizolkbhrygr554bhugz54fhrszazrere858z6',
                        {expiresIn: '24h'}
                    )
                })}
            })
            .catch(error => {res.status(500).json({error})})
        }
    })
    .catch( error => {
        res.status(500).json({error})
    });
}