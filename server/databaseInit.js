const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'matcha_db'
});

connection.connect(function (err) {
    if (err) throw err
    console.log('Initiating tables...')
    connection.query('DROP TABLE IF EXISTS people')
    connection.query('DROP TABLE IF EXISTS users')
    connection.query('DROP TABLE IF EXISTS pictures')
    connection.query('DROP TABLE IF EXISTS history')
    connection.query('DROP TABLE IF EXISTS likes')
    connection.query('DROP TABLE IF EXISTS notifications')
    connection.query("CREATE TABLE `people` (
      `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
      `username` varchar(100) NOT NULL,
      `password` varchar(255) NOT NULL,
      `name` varchar(100) NOT NULL,
      `surname` varchar(100) NOT NULL,
      `email` varchar(100) NOT NULL,
      `age` int(9) unsigned NOT NULL,
      `gender` decimal(3,2) unsigned NOT NULL,
      `pref` decimal(3,2) unsigned NOT NULL,
      `gps_lon` decimal(5,3) NOT NULL,
      `gps_lat` decimal(5,3) NOT NULL,
      `likes` tinytext NOT NULL,
      PRIMARY KEY (`id`),
      KEY `username` (`username`),
      KEY `email` (`email`)
    ) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;");
    
    connection.query('CREATE TABLE pictures(id int NOT NULL AUTO_INCREMENT,pic longtext, user_name varchar(255),PRIMARY KEY (id))')
    connection.query('CREATE TABLE history(viewer_id int NOT NULL, viewed_id int NOT NULL)')
    connection.query('CREATE TABLE likes(user1_id int NOT NULL, user2_id int NOT NULL, link int)')
    connection.query('CREATE TABLE notifications(user_id int NOT NULL, noti varchar(255), viewed_status int)')
    console.log('Creating fake profiles...')
    connection.query('INSERT INTO users (user_name, first_name, last_name, email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['susun1992','Susan','van Niekerk','susan92@hmail.com', '28', '0.1','1','-33.707','18.417','#horses#running#active']);
    connection.query('INSERT INTO users (user_name, first_name, last_name, email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['larman','Larry','Gabriels','larman@hmail.com', '33', '1','0','-33.907','18.417','#running#cooking']);
    connection.query('INSERT INTO users (user_name, first_name, last_name, email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['nikki','Nicola','Surname','nikkinik@hmail.com', '18', '0','1','-33.957','18.517','#netflix#chill#serious']);
    connection.query('INSERT INTO users (user_name, first_name, last_name, email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    connection.query('INSERT INTO users (user_name, first_name, last_name, email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['alec','Alec','Dreyer','alecdreyer@hmail.com', '21', '0.85','1','-33.907','18.417','#coding#faphand#thinking']);
    connection.query('INSERT INTO users (user_name, first_name, last_name, email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['nics','Nico','Potato','potatofarmer@hmail.com', '23', '0.9','1','-37.977','19.617','#hiking#nature#dogs']);
    connection.query('INSERT INTO users (user_name, first_name, last_name, email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon2','Brandon','Feifer','bran12356@hmail.com', '75', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    connection.query('INSERT INTO users (user_name, first_name, last_name, email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['fill_lip','Phillip','Stubbs','pstubbs@hmail.com', '24', '1','0','-20.957','20.517','#coding#laundry#siege']);
    connection.query('INSERT INTO users (user_name, first_name, last_name, email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['else','Someone','Else','someone@hmail.com', '80', '0.5','0.1','-27.757','10.517','#whiskey#sleep#potato#anime#pokemon']);
    connection.query('INSERT INTO users (user_name, first_name, last_name, email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['pinki','Xena','Damn','warriorprincess@hmail.com', '19', '0','1','-17.957','19.517','#cooking#running#photography']);
    connection.query('INSERT INTO users (user_name, first_name, last_name, email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['caroline','Caroline','Mulligan','cmull@hmail.com', '21', '0','0.9','-33.907','18.417','#cooking#running#photography']);
    connection.query('INSERT INTO users (user_name, first_name, last_name, email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon3','Brandon','Feifer','bran122456@hmail.com', '38', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    connection.query('INSERT INTO users (user_name, first_name, last_name, email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['cloe','Cloe','Peeper','clover6@hmail.com', '19', '0','0.5','-27.957','19.417','#anime#nature#potatos']);
    // connection.query('INSERT INTO users (user_name, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO users (user_name, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO users (user_name, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO users (user_name, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO users (user_name, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO users (user_name, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO users (user_name, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    // connection.query('INSERT INTO users (user_name, name, surname,email, age, gender, pref, gps_lon, gps_lat, likes) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)', ['brandon','Brandon','Feifer','bran123456@hmail.com', '26', '0.7','1','-37.957','19.517','#picnic#nature#photography']);
    console.log('Sucess!')
    console.log('Exiting...')
    connection.end()
})