var printfile =require("./promisedemo");
printfile.print("khushboo").then(
    function(){
        console.log("resolved");
        console.log("pay me now")
    }, function(){
        console.log("reject");
    }
)

exports.signUp = function(req,res){
    console.log("req query" , req.query);
    var email = req.query.username+".txt";
    var text = req.query.password
    fs.exists(email,function(exist){
        if(exist){
            res.send({
             message:"User Already exists"
            })
        }
        else{
            fs.writeFile(email,text,function(err){
                if(err){
                    res.send({
                        message:"Error in signup"
                    })
                }
                else{
                    res.send({
                        message:"Signup Success"
                    })
                }
            })
        }
    })
}


