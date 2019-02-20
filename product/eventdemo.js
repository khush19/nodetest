var EventEmitter = require('events');
var readfile = function() {
    var emitter = new EventEmitter;

    emitter.emit("not found");
    return emitter;
}
readfile().on('not found', function(){
    
})