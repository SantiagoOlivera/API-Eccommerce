var express = require('express');
const crypto = require('crypto');
var router = express.Router();

//require multer for the file uploads
var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = './public/img/product-images/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name image
/* var upload = multer(
  { dest: DIR }
  ).single('image'); */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, DIR)
    },
    filename: function (req, file, cb) {
      let id = crypto.randomBytes(18).toString('hex');
      let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
      cb(null, `${id}${ext}`);
    }
});

var upload = multer({ storage: storage }).single('image'); 

router.post('/add', function(req, res, next) {
    var path = '';
     upload(req, res, 
       function (err) {
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured")
        }  
       // No error occured.
        path = req.file.path;
        return res.send("Upload Completed for "+ path); 
  });     
  
});

module.exports = router;