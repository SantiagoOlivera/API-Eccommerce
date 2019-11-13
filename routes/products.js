//products routes
var express = require('express');
var router = express.Router();
var products = require("../controllers/products")
var jwt = require('jsonwebtoken');

/* GET home page. */
/* router.get('/', function(req, res, next) {
    var result = products.getAll();
    console.log(result);

    res.render('products', { title: 'Productos', data: result });
}); */

router.get('/', validateUser, products.getAll);

//router.get('/pdf/:productId', products.pdf);
//router.get('/:id', products.getById);
//router.post('/', products.save);
//router.put('/:id', products.update);

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.status(401).json();
        //es al pedo definir mensaje y respuesta json cuando la respuesta es un status(401)
        //res.status(401).json({status: "Error" , message: "You have to identificate yourself" , data: null});
      }else{
        // add user id to request
        req.body.userId = decoded.id;
        next();
      }
    });
}

module.exports = router;