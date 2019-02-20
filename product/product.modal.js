var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema(
    {
        productId: {type: Number, required: true, unique: true},
        productName: {type: String},
        productImage: {type: String},
        date: {type:Date, default: new Date()}
    }
);

module.exports = mongoose.model('product', productSchema);

// product is collection name of data base 

