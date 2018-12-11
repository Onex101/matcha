var db = require("../db.js");
var schemas = require("../schemas.js");
var mysql = require('mysql');

var Msg = function (data) {
    this.data = this.clean(data);
}

Msg.prototype.data = {}

Msg.prototype.getByUserIds = function (id1, id2, callback) {
    db.query(`SELECT msg FROM msgs WHERE (user1_id = ${id1} AND user2_id = ${id2}) OR (user1_id = ${id2} AND user2_id = ${id1})`, function (err, result){
        if (err){callback(null, err);}
        else{
            if (typeof callback === "function"){
                callback(null, result);
            }
        }
    })
    
}

Msg.prototype.save = function (id1, id2, msg, callback) {
    db.query(`INSERT INTO msgs VALUES (${id1}, ${id2}),${msg})`, function (err, result){
        if (err){callback(null, err);}
        else{
            if (typeof callback === "function"){
                callback(null, result);
            }
        }
    })
    
}