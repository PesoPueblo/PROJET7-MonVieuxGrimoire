const mongoose = require('mongoose');
//création du schéma d'un livre 
const bookSchema = mongoose.Schema({
    userId: {type: String, required: false},
    title: {type: String, required: true},
    author:{type: String, required: true},
    imageUrl:{type: String, required: true},
    year:{
        type: Number, 
        required: true,
        validate: { 
            validator: function (value) {
                const currentDate = new Date().getFullYear();
                return value <= currentDate && value > 1700 && value.toString().length === 4;                
            },
           message: `L'année de publication doit être inférieur à l'année en cours`
        }
    },
    genre:{type: String, required: true},
    ratings: [
        {userId : {type: String, required: false},
        grade: {type: Number, required: false}},
    ],
    averageRating: {type: Number, required: false},
    });
//exportation du schema
module.exports=mongoose.model('Book',bookSchema);
