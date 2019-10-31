//users model
const mongoose = require('../bin/mongodb');
const bcrypt = require('bcrypt'); 

var UsersSchemna = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    lastname:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    user:{
        type: String,
        required: true
        },
    password:{
        type: String,
        trim: true,
        required: true
        }
})
UsersSchemna.pre('signup', function(next){
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports  =  mongoose.model('users', UsersSchemna)


