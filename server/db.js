var resources = require('./resources');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: resources.HOST,
    user: resources.USER,
    password: resources.PASSWORD,
    database: 'matcha_db',
})

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