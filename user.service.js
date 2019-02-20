var fs = require('fs');
exports.signIn = function(reqdata) {
 return new Promise(function(resolve, reject){
    console.log(reqdata.email);
    fs.exists(reqdata.email,function(exist){
        if(exist){
            fs.readFile(reqdata.email, function(err, data){
                if(data.toString() === reqdata.text){
                    resolve({
                     message:"Login successfully"
                    });
                } else {
                    resolve({
                        message:"Incorrect password"
                    });
                }
            });
        } else{
            reject({
                message:"User does not exist."
            })
        }
    })
 })
}

exports.signUp =  function(reqdata){
    return new Promise(function(resolve, reject){
        console.log(reqdata.email);
        fs.exists(reqdata.email,function(exist){
            if(exist){
              resolve({
                 message:"User Already exists"
                })
            }
            else{
                fs.writeFile(reqdata.email,reqdata.text,function(err){
                    if(err){
                        reject({
                            message:"Error in signup"
                        })
                    }
                    else{
                        resolve({
                            message:"Signup Success"
                        })
                    }
                })
            }
        })
     })
};