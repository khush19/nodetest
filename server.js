var express = require('express');
var server = express();
var fs = require('fs');
var demo1 = require('./demo1.js')
// body parser is required to read body to  from the payload 
var bodyparser = require('body-parser');
//use is used in case we want to parse for all routes
server.use(bodyparser.json());
server.get('/', function(req,res,next){
    //Next is middle ware function is used when we have to process function before routes
    console.log("In middle");
    next();
},function(req, res) {
    res.send('Hello');
});


server.get('/download', function(req, res) {
    res.download('file.txt');
});

server.get('/download/:filename', function(req, res) {
    // http://localhost:5000/download/file.txt
    var filename = req.params.filename;
    fs.exists(filename, function(exist) {
        if(exist) {
            res.download(filename);
        } else {
            res.send('No such file exist');
        }
    });
});

server.get('/download1', function(req, res) {
    // http://localhost:5000/download/file.txt
    var filename = req.query.filename;
    console.log(req.query);
    fs.exists(filename, function(exist) {
        if(exist) {
            res.download(filename);
        } else {
            res.send('No such file exist');
        }
    });
});

server.get('/youtube-download', function(req, res) {
    res.download('myvideo.mp4');
});

server.get('/wallet-balance', function(req, res) {
    fs.readFile('file.json', function(err, data) {
        var response = JSON.parse(data)
        res.send(response['walletbalance']);
    });
});

server.get('/signup',demo1.signUp);

server.get('/signin',function(req,res){
    console.log("req query" , req.query);
    var email = req.query.username+".txt";
    var text = req.query.password
    fs.exists(email,function(exist){
        if(exist){
            fs.readFile(email, function(err, data){
                if(data.toString() === text){
                    res.send({
                     message:"Login successfully"
                    });
                } else {
                    res.send({
                        message:"Incorrect password"
                    });
                }
            });
        } else{
            res.send({
                message:"User does not exist."
            })
        }
    })
});

server.post('/signup', bodyparser.json(), function(req,res){
    console.log("req query" , req.body);
    var email = req.body.username+".txt";
    var text = req.body.password
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
});

server.listen(5000, function() {
    console.log('Server is running at port 5000');
});
