const mongoose =require ('mongoose');
const uniqueValidator = require ('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
              return /^[a-zA-Z0-9\-\_]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(value);
            },
            message: `Ce n'est pas une adresse email valide!`
          } 
    },
    password:{
        type: String,
        required: true,
        validate:{ 
            validator:  function(value){
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$/.test(value);
            },
            message: `le mot de passe n'est pas valide, 8 caractères minimun`
        } 
    },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User',userSchema);