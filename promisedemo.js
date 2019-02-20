exports.print = function(username) {
return new Promise(function(resolve, reject){
if (username === 'khushboo') {
    resolve();
} else {
    reject();
}
})
}