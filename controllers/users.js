//users controller
var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt'); 
var usersModel = require("../models/users");
const jwt = require('jsonwebtoken');

module.exports = {
  getAll: function(req, res, next) {
      usersModel.find({}, function(err, data){
      if (err) {
          next(err);
      } else {
          res.status(200).json({status: "success", message: "ok", data: data});
      }
    });
  },
  signup: async function(req, res, next){
    try{
      var data = await usersModel.create({
          name: req.body.name, 
          lastname: req.body.lastname, 
          email: req.body.email, 
          user: req.body.user, 
          password: req.body.password
      });
      res.json({status: "success", message: "User added successfully!!!", data: data});
    }catch(err){
      if (err.name === 'MongoError' && err.code === 11000 && err.keyValue.user) {
        // Duplicate username
        //return res.status(422).send({ status: 'error', message: 'User already exist!' });
        return res.json({ status: 'error', message: 'User already exist!' });
      }else if(err.name === 'MongoError' && err.code === 11000 && err.keyValue.email){
        //Duplicate user email
        //return res.status(422).send({ status: 'error', message: 'Email already exist!' });
        return res.json({ status: 'error', message: 'Email already exist!' });
    }
    console.log(err)
    next(err);
    }
  },
  login: async function(req, res, next) {
      if(req.body.userOrEmail.includes('@')){
        var user = await usersModel.findOne({ email: req.body.userOrEmail });
      }else{
        var user = await usersModel.findOne({ user: req.body.userOrEmail });
      }
    
      if (user) {
        if(bcrypt.compareSync(req.body.password, user.password)) {
          //el secretKey debe ser declarado en el app.js
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