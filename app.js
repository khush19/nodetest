var express = require('express');
var server = express();
var routes = require("./routes");
var mongoose = require("mongoose");
var mongourl = "mongodb://localhost:27017/testdatabase";
var productionMongoUrl = "mongodb://test:test12345@ds145573.mlab.com:45573/testdatabase"
var productService = require("./product/product.service");
var bodyparser = require('body-parser');
server.use(bodyparser.json());
mongoose.connect(productionMongoUrl, function (err, client) {
    if (err) {
        console.log("error in connection");
    } else {
        console.log("connected to database");
    }
})
var app = express()
app.use(bodyparser.json());
app.use(routes);
app.get('/testroute', function(req,res){
    res.send("Application Deployed")
})
app.listen(process.env.PORT|| 4000, function () {
    console.log("listening on port 4000");
})