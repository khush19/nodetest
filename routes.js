var express = require('express');
var router = express.Router();
var userController = require("./user.controller");
router.use('/product', require('./product'));
router.use('/user', require('./user'));

router.get('/signin', userController.login)
router.post('/signup', userController.signUp)

router.get('/ddc3', function(req, res){

})
router.get('/ddc4', function(req, res){

})
module.exports = router;