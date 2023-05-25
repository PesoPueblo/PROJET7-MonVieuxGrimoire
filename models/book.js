const mongoose = require('mongoose');
//création du schéma d'un livre 
const bookSchema = mongoose.Schema({
    title: {type: String, required: true},
    author:{type: String, required: true},
    imageUrl:{type: String, required: true},
    year:{type: Number, required: true},
    genre:{type: String, required: true},
    ratings: [
        {userId : {type: String, required: false},
        grade: {type: Number, required: false}},
    ],
    averageRating: {type: Number, required: false},
    });
//exportation du schema
module.exports=mongoose.model('Book',bookSchema);
