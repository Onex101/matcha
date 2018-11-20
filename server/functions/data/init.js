var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qweqwe',
  database: 'mysql'
});

connection.connect(function (err) {
    if (err) throw err
    console.log('Initiating tables...')
    connection.query('DROP TABLE IF EXISTS people')
    connection.query('CREATE TABLE people(id int NOT NULL AUTO_INCREMENT, username varchar(255), name varchar(255), surname varchar(255), email varchar(255),age int,gender float, pref int,fame int, gps_lon float, gps_lat float, likes text, PRIMARY KEY (id))')
    console.log('Creating fake profiles...')
    connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lat, gps_lon, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['susun1992','Susan','van Niekerk','susan92@hmail.com', '28', '0.1','1','-33.707','18.417','#horses#running#active']);
    connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lat, gps_lon, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['larman','Larry','Gabriels','larman@hmail.com', '33', '1','0','-33.907','18.417','#running#cooking']);
    connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lat, gps_lon, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['nikki','Nicola','Surname','nikkinik@hmail.com', '18', '0','1','-33.957','18.517','#netflix#chill#serious']);
    connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lat, gps_lon, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lat, gps_lon, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['alec','Alec','Dreyer','alecdreyer@hmail.com', '21', '0.85','1','-33.907','18.417','#coding#faphand#thinking']);
    // connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO people (username, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    console.log('Sucess!')
    console.log('Exiting...')
    connection.end()
})