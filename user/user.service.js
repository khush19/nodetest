var EventEmitter = require('events')
var mailer = require('./mailer');
var UserModel = require("./user.modal");
var crypto  = require('crypto')
const algo="aes-256-ctr";
const secretkey="mysecret"


exports.createUser = function(data){
    console.log(data);
    var emitter = new EventEmitter();
    if(data && data.email && data.password){
        if(ValidateEmail(data.email)){
            var cipher = crypto.createCipher(algo,data.password)
            data.password = cipher.update(secretkey,'utf8','hex')
            data.userId = Date.now();
            console.log(data);
            var userdata = new UserModel(data);
            userdata.save().then(
               function(user){
                  emitter.emit("SUCCESS")
                  mailer.sendMail();
                   console.log("user created" , user);
               },
               function(error){
                   if(error["code"]==11000){
                        emitter.emit("DUPLICATE")
                       console.log("DUPLICATE");
                   }
                  console.log("error in creating user",error)
               }
            )
        }
        else{
            emitter.emit("INVALID_EMAIL")
        }
       
    }
    else{
        console.log("data is incomplete")
        emitter.emit('INCOMPLETE_DATA')
    }


    return emitter
}

exports.login = function(data){
    console.log(data);
    var emitter = new EventEmitter();
    if(data && data.email && data.password){
        if(ValidateEmail(data.email)){
            var cipher = crypto.createCipher(algo,data.password)
            data.password = cipher.update(secretkey,'utf8','hex')

            console.log(data);
            UserModel.find({email: data.email}).then(
               function(user){
                   console.log("Inside first call");
                   if(user.length) {
                    UserModel.find({password: data.password}).then(function(user){
                        console.log("Inside second call", user);
                        if(user.length) {
                            emitter.emit('SUCCESS')
                        } else{
                            emitter.emit("INCORRECT_PASSWORD")
                        }
                    }, function(error){
                        emitter.emit('ERROR')
                    });
                   } else {
                    emitter.emit("INCORRECT_EMAIL_ID")
                   }
                 
                 // below code will only work fom non-accenture network
                //   mailer.sendMail();
                //    console.log("user created" , user);
               },
               function(error){
                  emitter.emit('ERROR')
               }
            )
        }
        else{
            emitter.emit("INVALID_EMAIL")
        }
       
    }
    else{
        console.log("data is incomplete")
        emitter.emit('INCOMPLETE_DATA')
    }

    



    return emitter
}


function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

