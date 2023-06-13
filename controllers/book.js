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
        imageUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
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
    const bookObject= req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/image/${req.file.filename}`,
    } : {...req.body};

    delete bookObject._userId;
    Book.findOne({_id: req.params.id})
    .then((book) => {
        if (book.userId != req.auth.userId) {
            res.status(401).json({message: 'Non-autorisé'})
        } else (
            Book.updateOne({_id: req.params.id}, {...bookObject, _id: req.params.id})
            .then(()=> res.status(200).json({message:'Livre modifié !'}))
            .catch(error=> res.status(401).json({error}))
        )
    })
    .catch(error=> res.status(400).json({error}));
};

//créationet exportation d'un controlleur pour supprimé un livre
exports.deleteOneBook= (req,res,next)=>{
    Book.deleteOne({_id: req.params.id})
    .then(()=> res.status(200).json({message:'livre supprimé'}))
    .catch(error=> res.status(400).json({error}));
};

//créattion de l'ajout de note
exports.addNewRate = (req,res,next)=>{
    //selectione de l'emplacement ou on rajoute la note 
    Book.findOne({_id: req.params.id})
    .then( book => {
        //ajoute au tableau ratings du livre
        book.ratings.push({
            userId: req.auth.userId,
            grade: req.body.rating
        });
        //update de average note
        let sumRate = 0;
        for (let i = 0; i < book.ratings.length; i++) {
            let rate = book.ratings[i].grade;
            sumRate += rate;            
        }
        book.averageRating= Math.round(sumRate / book.ratings.length);
        
        //sauvregarde dus la BdD
        return book.save();  
    })
    .then(book =>res.status(201).json(book))
    .catch(error => res.status(500).json({error}))

};


//recherche de la meilleur note
exports.findBestRating = (req,res,next)=> {
    Book.find()
    .then( books => {
        const sortedBooks = books.sort((a,b)=> b.averageRating - a.averageRating);
        const bestratingBooks = sortedBooks.slice(0,3);
        res.status(200).json(bestratingBooks);
    })
    .catch(error=> res.status(400).json({error}))
};
