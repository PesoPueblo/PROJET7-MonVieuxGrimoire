const express =require ('express');
const mongoose = require('mongoose')
const path = require ('path')
//importation des différents routes de l'API
const BooksRoutes = require('./routes/books');
const UsersRoutes = require('./routes/user');

//mis en connexion avec la bas de donnée MongoDB
mongoose.connect('mongodb+srv://Gaetan-L:jf91CfXJwn8O897X@cluster0.idrgd4x.mongodb.net/test?retryWrites=true&w=majority',
   {useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(()=>console.log('connection réussi à MongoDB!'))
    .catch(()=>console.log('échec de la connection à MongoDB!'))

const app = express();

app.use(express.json());

//gestion des CORS
app.use((req, res, next) => {
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
app.use('/image', express.static(path.join(__dirname, 'image')));

module.exports = app;