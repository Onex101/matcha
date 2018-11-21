const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'matcha_db',

})

// connection.get = function () {
//     return this;
// }
// connection.update = function(data) { 
//     this.returnData = data; 
//     return this;
// }
// connection.run = function(callback) {
//     callback(null, this.returnData || {})
// }

connection.connect(function(err) {
    if (err) throw err
    // console.log('You are now connected...')
})

connection.runQuery = function (query,data,callback){
    connection.query(
        query,
        data,
        function(err, results){
            debugger;
            if (err) throw err;
            callback(results);
        }
    );
}

module.exports = connection;