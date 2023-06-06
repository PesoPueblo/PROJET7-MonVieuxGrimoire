const  express = require('express');
//importation du middleware d'authentification
const auth = require('../middleware/auth')
//importation des controlleurs 
const BookCtrl = require('../controllers/book');
//importation du  middleware multer
const {upload,reziseImage}= require ('../middleware/multer-config')

const router = express.Router();

//création des différentes routes de l'API
router.post('/', auth, upload,reziseImage, BookCtrl.createNewBook);
router.put('/:id', auth, upload,reziseImage, BookCtrl.modifyOneBook);
router.delete('/:id',auth,  BookCtrl.deleteOneBook);
router.get('/bestrating', BookCtrl.findBestRating);
router.get('/:id', BookCtrl.getOneBook);
router.get('/', BookCtrl.getAllBooks);
router.post('/:id/rating' ,auth, BookCtrl.addNewRate);
module.exports= router;