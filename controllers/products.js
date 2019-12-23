//products controller
var crypto = require('crypto');
var productModel = require("../models/products");

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



module.exports = {
    getAll: function(req, res, next) {
            //console.log(req.query)
            productModel.find({}, function(err, data){
            if (err) {
                next(err);
                //return err;
            } else {
                res.status(200).json({status: "success", message: "ok", data: data});
                //return data;
            }
        });
    },
    getById: function(req, res, next) {
       var id = req.params.productId;
       productModel.findById(id, function(err, data){
           if (err) {
               next(err);
           } else {
               res.status(200).json({status: "success", message: "ok", data: data});
           }
       });
    },
    /* add: async function(req, res, next) {
        try{
            
            var data = await productModel.create({ 
                title: req.body.title, 
                sku: req.body.sku, 
                price: req.body.price,
                description: req.body.description,
                image: req.body.image
            });
            res.status(200).json({status: "success", message: "Product added successfully!!!", data: data });
        }catch(err){
            res.status(200).json({status: "error", message: "Error to add product!!!", data: err });
        }
           
   } */
   add:  async function(req, res, next) {
        try{
            var data = await productModel.create({        
                title:       req.body.title, 
                sku:         req.body.sku, 
                price:       req.body.price,
                description: req.body.description,
                image:       req.body.image,
            });    
            res.status(200).json({status: "success", message: "Product added successfully!!!", data: data });
        }catch(err){
            res.status(500).json({status: "error", message: "Error to add product!!!", data: err });
        }
   }
    

}

