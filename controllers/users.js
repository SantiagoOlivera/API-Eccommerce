//users controllernpminstallbcrypt
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt'); 
var usersModel = require("../models/users");
const jwt = require('jsonwebtoken');

module.exports = {
  save: async function(req, res, next) {
    var data = await usersModel.create({ name: req.body.name, user: req.body.user, password: req.body.password });
    res.json({status: "success", message: "User added successfully!!!", data: data});      
  },
  login: async function(req, res, next) {
    //se le asigna a user el valor de 
    var user = await usersModel.findOne({ user: req.body.user });
      if (user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
          const token = jwt.sign( { id: user._id } , req.app.get('secretKey'), { expiresIn: '1h' } );
          console.log(token, user)
          res.json( { status: "success" , message: "user found!!!", data: { user: user, token:token } } );
        }else{
          res.json( { status:"error", message: "Invalid user/password!!!", data: null } );
        }
     }else{
      res.json({status:"not_found", message: "user not found!!!", data: null});
     }
  }
}