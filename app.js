var express = require('express');
var server = express();
var routes = require("./routes");
var mongoose = require("mongoose");
var mongourl = "mongodb://localhost:27017/testdatabase";
var productionMongoUrl = "mongodb://test:test12345@ds145573.mlab.com:45573/ddcnodefeb"
var productService = require("./product/product.service");
var bodyparser = require('body-parser');
server.use(bodyparser.json());
mongourl = process.env.PORT ? productionMongoUrl : mongourl
mongoose.connect(mongourl, function (err, client) {
    if (err) {
        console.log("error in connection");
    } else {
        console.log("connected to database");
    }
})
var app = express()
app.use(bodyparser.json());
app.use(routes);
app.get('/', function (req, res) {
    res.sendFile(__dirname +'/index.html')
})
app.post('/read-files', function (req, res) {
    var fs = require('fs');
    var async = require('async');
    var EventEmitter = require('events');
    var files = req.body.files;
    var count = 0;
    var allcontent = "";
    async.eachSeries(files, function (filename, cb) {
        fs.readFile("./files/" + filename, function (err, content) {
            allcontent += " " + content;
            count++;
            if (!err) {
                cb();
            } else {
                res.send({ message: 'Error in reading file' + count, detail: err });
            }
        });
    }, function () {
        res.send({ message: 'All files have been read', content: allcontent.toString().trim() });
    });
});
var applisten = app.listen(process.env.PORT || 4000, function () {
    console.log("listening on port");
})

var socketio = require('socket.io')(applisten);
socketio.on('connection', function(){
    setTimeout(function(){
        socketio.emit('datareceived', "hello")
    }, 1000)
})