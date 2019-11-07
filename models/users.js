//users model
const mongoose = require('../bin/mongodb');
const bcrypt = require('bcrypt'); 

var UsersSchemna = mongoose.Schema({
    name:{
        type: String,
        required: [true,"The field name is required"]
    },
    lastname:{
        type: String,
        required: [true,"The field lastname is required"]
    },
    email:{
        type: String,
        required: [true,"The field email is required"],
        unique: true
    },
    user:{
        type: String,
        required: [true,"The field user name is required"],
        unique: true
        },
    password:{
        type: String,
        trim: true,
        required: [true,"The field password is required"]
        }
})
UsersSchemna.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports  =  mongoose.model('users', UsersSchemna)


