var userService = require("./user.service");
exports.login = function(req, res){
    console.log(req.query.username);
    var data = {
        email:  req.query.username+".txt",
        text: req.query.password
    };
    userService.signIn(data).then(function(data){
        console.log("inside controller")
        res.send(data);
    }, function(err){
        res.send(err)
    })
}

exports.signUp = function(req, res){
    var data = {
        email:  req.body.username+".txt",
        text: req.body.password
    };

    userService.signUp(data).then(function(data){
        console.log("inside controller")
        res.send(data);
    }), function(err){
        res.send(err)
    }

}