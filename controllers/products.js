//products controller
var productModel = require("../models/products")

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
    add: async function(req, res, next) {
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
           
   }
}

