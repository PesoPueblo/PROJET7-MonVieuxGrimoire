//importation du model d'un livre
const Book = require('../models/book');


//créationet exportation d'un controlleur pour récupérer tous les livres
exports.getAllBooks= (req,res,next)=>{
    Book.find()
    .then((books)=> res.status(200).json(books))
    .catch(error=> res.status(400).json({error}));
};

//créationet exportation d'un controlleur pour un nouveau livre
exports.createNewBook= (req,res,next)=>{
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userID;
    
    const book= new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    book.save()
    .then(()=> res.status(201).json({message:'livre enregistré'}))
    .catch(error=> res.status(400).json({error}));
};

//créationet exportation d'un controlleur pour récupérer un livre
exports.getOneBook= (req,res,next)=>{
    Book.findOne({_id: req.params.id})
    .then((book)=> res.status(200).json(book))
    .catch(error=> res.status(400).json({error}));
};

//créationet exportation d'un controlleur pour modifier un livre
exports.modifyOneBook= (req,res,next)=>{
    Book.updateOne({_id: req.params.id}, {...req.body , _id: req.params.id})
    .then(()=> res.status(200).json({message:'livre modifié'}))
    .catch(error=> res.status(400).json({error}));
};

//créationet exportation d'un controlleur pour supprimé un livre
exports.deleteOneBook= (req,res,next)=>{
    Book.deleteOne({_id: req.params.id})
    .then(()=> res.status(200).json({message:'livre supprimé'}))
    .catch(error=> res.status(400).json({error}));
};


