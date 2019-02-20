var userService = require("./user.service");
exports.signUp = function (req, res) {
    if (req.body && req.body.email && req.body.password) {
        userService.createUser(req.body)
            .on('DUPLICATE', function (result) {
                res.send({
                    message: "User Already Exists"
                })
            })
            .on('SUCCESS', function (result) {
                res.send({
                    message: "SUCCESS"
                })
            })
            .on('ERROR', function (result) {
                res.send({
                    message: "Internal Server Error"
                })
            })
            .on('INCOMPLETE_DATA', function (result) {
                res.send({
                    message: "Insuffiecient Data"
                })
            })
            .on('INVALID_EMAIL', function (result) {
                res.send({
                    message: "Email is invalid"
                })
            })
    }
    else {
        res.send({
            message: "Insufficient details"
        })
    }
}

exports.login = function (req, res) {
    if (req.body && req.body.email && req.body.password) {
        userService.login(req.body)
            .on('SUCCESS', function (result) {
                res.set({authToken: result})
                res.send({
                    message: "SUCCESS"
                })
            })
            .on('Record Not Found', function (result) {
                res.send({
                    message: 'Record Not Found'
                })
            })
            .on('ERROR', function (result) {
                res.send({
                    message: "Internal Server Error"
                })
            })
            .on('INVALID_EMAIL', function (result) {
                res.send({
                    message: "Email is invalid"
                })
            })
            .on('INCORRECT_EMAIL_ID', function (result) {
                res.send({
                    message: "Email is incorrect"
                })
            })
            .on('INCORRECT_PASSWORD', function (result) {
                res.send({
                    message: "Password is incorrect"
                })
            })
    }
    else {
        res.send({
            message: "Insufficient details"
        })
    }
}


exports.listalluser = function (req, res) {
    userService.lisrallusers().on('USERS', function (result) {
        res.send({
            data: result
        })
    })
   .on('NO USER FOUND', function (result) {
        res.send({
           message: "NO USER FOUND"
        })
    })
    .on('err', function (result) {
        res.send({
           message: "ERROR"
        })
    })

}

exports.verifyuser = function (req, res) {
    var data = req.query;
    userService.verifyuser(data).on('success', function (result) {
        res.send({
            message: "verfied"
        })
    })
    .on('error', function (result) {
        res.send({
            message: "error"
        })
    })

}