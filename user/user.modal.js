var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userSchema = new Schema(
    {
        userName: {type: String},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        userId: {type:Number,unique:true},
        userid: {type:Number,unique:true},
        date: {type:Date, default: new Date()}
    }
);

module.exports = mongoose.model('user', userSchema);

// product is collection name of data base 

