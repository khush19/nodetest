var express = require('express');
var router = express.Router();
var productController = require("./product.controller");

router.post('/create', productController.create)
router.get('/listall', productController.listall)
router.get('/product/:id', productController.listProduct)
router.post('/productDelete', productController.deleteProduct)
module.exports = router;