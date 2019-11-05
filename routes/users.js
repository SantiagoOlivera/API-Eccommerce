var express = require('express');
var router = express.Router();
var users = require("../controllers/users");

router.get('/', users.getAll);
router.post('/signup', users.signup);
router.post('/login', users.login);


module.exports = router;

