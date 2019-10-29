var express = require('express');
var router = express.Router();
var users = require("../controllers/users");


router.post('/register', users.save);
router.post('/login', users.login);


module.exports = router;

