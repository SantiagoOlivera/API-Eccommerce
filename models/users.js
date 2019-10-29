//users model
const mongoose = require('../bin/mongodb');
const bcrypt = require('bcrypt'); 

var UsersSchemna = mongoose.Schema({
    name:String,
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
UsersSchemna.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports  =  mongoose.model('users', UsersSchemna)


