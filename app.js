const express =require ('express');
const mongoose = require('mongoose')
const path = require ('path');
require('dotenv').config();
//importation des différents routes de l'API
const BooksRoutes = require('./routes/books');
const UsersRoutes = require('./routes/user');

//mis en connexion avec la bas de donnée MongoDB
mongoose.connect(process.env.MONGODB_PATH,
   {useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(()=>console.log('connection réussi à MongoDB!'))
    .catch(()=>console.log('échec de la connection à MongoDB!'))

const app = express();

app.use(express.json());

//gestion des CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.MONGODB_PATH);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 
      'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods',
       'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  //appel des routes de l'API
app.use('/api/books', BooksRoutes);
app.use('/api/auth', UsersRoutes);

  //lien des fichiers images
app.use('/image', express.static(path.join(__dirname, 'image')));

module.exports = app;