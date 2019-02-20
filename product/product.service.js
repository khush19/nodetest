var productModal = require("./product.modal");
var EventEmitter = require('events');
exports.createProduct = function(data) {
    return new Promise(function(resolve, reject){
       var productdata = new productModal(data);
       productdata.save().then(function(product){
        console.log("product Inserted" + product);
        resolve(product)
       }, function(err){
           reject(err)
        console.log("error in database", err);
       })
    })
}

exports.listProduct = function() {
    return new Promise(function(resolve, reject){
      productModal.find({}).then(function(product){
        console.log("product get" + product);
        resolve({
            data: product
        })
       }, function(err){
           reject(err)
        console.log("error in database", err);
       })
    })
}

// findOne will always find only one matching data for getting more data we have to use fine 
// - Ex- find( { "name.last": "Hopper" } )
exports.findProduct = function(data) {
    console.log(data);
    return new Promise(function(resolve, reject){
      productModal.findOne({productId:data}).then(function(product){
        console.log("product get" + product);
        resolve({
            data: product
        })
       }, function(err){
           reject(err)
        console.log("error in database", err);
       })
    })
}

exports.deleteProduct = function(data) {
    var emitter = new EventEmitter();
    console.log(data);
      productModal.deleteOne(data).then(function(result){
        console.log(result);
        if(result["deletedCount"] === 0){
            emitter.emit("already deleted")
        } else {
            emitter.emit("successfully deleted")
        }    
       }, function(err){
        emitter.emit("error")
        console.log("error in database", err);

       })
       return emitter;
}