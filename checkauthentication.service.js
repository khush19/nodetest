var jwttoken = require('jsonwebtoken');
var crypto  = require('crypto')
const algo="aes-256-ctr";
const secretkey="mysecret"
exports.checkauthentication = function(req,res,next){
var authtoken = req.get('authToken');
if (authtoken){
    jwttoken.verify(authtoken, secretkey, function(err, token){
        if(err) {
            res.send({message: 'unauthorized token'});
        } else {
            next();
        }
    })
} else {
    res.send({message: 'No token available'});
}

}