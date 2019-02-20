var express = require('express');
var router = express.Router();
var userController = require("./user.controller");
var checktoken = require("../checkauthentication.service")

router.post('/signup', userController.signUp)
router.post('/login', userController.login)
router.post('/listalluser', checktoken.checkauthentication ,userController.listalluser)
router.post('/verify-user',userController.verifyuser)
module.exports = router;