const  express = require('express');
//importation du middleware d'authentification
const auth = require('../middleware/auth')
//importation des controlleurs 
const BookCtrl = require('../controllers/book');
//importation du  middleware multer
const multer= require ('../middleware/multer-config')

const router = express.Router();

//création des différentes routes de l'API
router.post('/', auth, multer, BookCtrl.createNewBook);
router.put('/:id', auth,  BookCtrl.modifyOneBook);
router.delete('/:id',auth,  BookCtrl.deleteOneBook);
router.get('/:id', BookCtrl.getOneBook);
router.get('/', BookCtrl.getAllBooks);


module.exports= router;