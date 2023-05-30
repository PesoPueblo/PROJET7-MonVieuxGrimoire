const mongoose= require('mongoose');
//création du modèle de note
const ratings = mongoose.Schema({
    userId : {type: String, required: true},
    grade: {type: Number, required: true},
});

//exportation du modèle
module.exports=mongoose.model('ratings', ratings)