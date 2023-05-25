const express = require ('express');
const router= express.Router();

//importation des controlleurs
const userCtrl = require('../controllers/user')

//création des routes de l'API
router.post('/signup' , userCtrl.signup);
router.post('/login' , userCtrl.login);

module.exports= router;