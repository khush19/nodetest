var ProductService = require("./product.service");
exports.create = function (req, res) {
    console.log("inside controller");
    var data = req.body;
    ProductService.createProduct(data).then(function (product) {
        res.send(product);
    }, function (res) {
        res.send(err);
    })
}

exports.listall = function (req, res) {
    ProductService.listProduct().then(function (product) {
        res.send(product);
    }, function (res) {
        res.send(err);
    })
}

exports.listProduct = function (req, res) {
    var productId = req.params.id;
    console.log(productId);
    ProductService.findProduct(productId).then(function (product) {
        res.send(product);
    }, function (res) {
        res.send(err);
    })
}

exports.deleteProduct = function (req, res) {
    var productId = req.body;
    console.log(productId);
    ProductService.deleteProduct(productId).on('already deleted', function(){
        res.send({
            message: "product not found"});
    })
    .on('successfully deleted', function(){
        res.send({
            message: "successfully deleted"});
        })
        .on('error', function(){
            res.send({
                message: "some error occured"});
            })
}