var express = require('express');
var router = express.Router();
var userController = require("./user.controller");
var checktoken = require("../checkauthentication.service")

router.post('/signup', userController.signUp)
router.post('/login', userController.login)
router.post('/listalluser', checktoken.checkauthentication ,userController.listalluser)
module.exports = router;