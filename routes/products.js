//products routes
var express = require('express');
var router = express.Router();
var products = require("../controllers/products")

/* GET home page. */
/* router.get('/', function(req, res, next) {
    var result = products.getAll();
    console.log(result);

    res.render('products', { title: 'Productos', data: result });
}); */

router.get('/', products.getAll);

//router.get('/pdf/:productId', products.pdf);
//router.get('/:id', products.getById);
//router.post('/', products.save);
//router.put('/:id', products.update);

module.exports = router;