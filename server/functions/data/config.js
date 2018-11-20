var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qweqwe',
  database: 'mysql'
});

connection.connect(function (err) {
  if (err) throw err
  console.log('You are now connected...')
  // connection.query('CREATE TABLE people(id int NOT NULL AUTO_INCREMENT, username varchar(255), name varchar(255), surname varchar(255), email varchar(255),age int,gender float, pref int,fame int, gps_lon float, gps_lat float, likes text, PRIMARY KEY (id))', function(err, result) {
  //if (err) throw err
  //     connection.query('INSERT INTO people (name, age, email, gps_lon, gps_lat) VALUES (?, ?, ?, ?, ?)', ['Susan', '28', 'California, USA','-33.707','18.417'], function(err, result) {
  //if (err) throw err
  connection.query('SELECT * FROM people', async function (err, results) {
    if (err) throw err
    // dist = getD_coff('Larry', 'Susan')
    // age = getA_coff('Larry','Susan')
    // pref = getP_coff('Larry','Susan')
    // like = getL_coff('Larry','Susan')
    match = getMatchScore('Larry','Susan')

    // dist.catch((err) => { console.error(err) })
    //   .then(dist => console.log("Distance match: "+dist))
    
    // age.catch((err) => { console.error(err) })
    //   .then(age => console.log("Age match: "+age))

    // pref.catch((err) => { console.error(err) })
    //   .then(pref => console.log("Preferance match: "+pref))

    // like.catch((err) => { console.error(err) })
    //   .then(like => console.log("Like match: "+like))

    match.catch((err) => { console.error(err) })
      .then(match => console.log("Match score: "+match))
  })

})
//     }) 
//   })

//calculates the distance in km between 2 given gps coords
function getDistance(gps_lat1, gps_lon1, gps_lat2, gps_lon2) {

  var R = 6371; //constant to calculate distance in km
  var lat1_rads = (toRads(gps_lat1));
  var lat2_rads = (toRads(gps_lat2));
  var dLat = toRads(gps_lat2 - gps_lat1);
  var dLon = toRads(gps_lon2 - gps_lon1);

  var x = Math.pow(Math.sin(dLat / 2), 2);
  var y = Math.pow(Math.sin(dLon / 2), 2);
  var z = Math.cos(lat1_rads) * Math.cos(lat2_rads);

  var a = x + (z * y);
  var c = 2 * Math.atan(Math.sqrt(a) / Math.sqrt(1 - a));
  return (Math.round(R * c * 100) / 100);
}

function toRads(deg) {
  return (deg * Math.PI / 180);
}


//function to calculate distance coffefficient between 2 given usernames
async function getD_coff(user1, user2) {
  return new Promise((resolve, reject) => {
    connection.query("SELECT username,gps_lat,gps_lon FROM people WHERE username = ? or username = ?", [user1, user2], function (err, results) {
      if (err) { return reject(err) }
      var distance = getDistance(results[0].gps_lat, results[0].gps_lon, results[1].gps_lat, results[1].gps_lon)
      //sigmoidal function
      var dis_coff = (1 / (1.05+Math.exp(0.3*(0.125*distance - 10))))+0.1
      resolve(dis_coff)
    })
  })
}

//Calculates age coffificient between 2 given usernames
async function getA_coff(user1, user2){
  return new Promise((resolve, reject) => {
    connection.query("SELECT username,age FROM people WHERE username = ? or username = ?", [user1, user2], function (err, results) {
      if (err) { return reject(err) }
      var ageDiff = Math.abs(results[0].age - results[1].age)
      //linear drop in coff
      var age_coff = 1 - (ageDiff/100)
      resolve(age_coff)
    })
  })
}

//Calculates preference coefficient between 2 given usernames
async function getP_coff(user1, user2){
  return new Promise((resolve, reject) => {
    connection.query("SELECT username,gender,pref FROM people WHERE username = ? or username = ?", [user1, user2], function (err, results) {
      if (err) { return reject(err) }
      var pref_coff = 1 - (Math.sqrt(Math.pow((results[0].gender - results[1].pref),2)+Math.pow((results[0].pref - results[1].gender),2)))/Math.sqrt(2)
      resolve(pref_coff)
    })
  })
}

//Calculates shared interests coefficient between 2 given usernames
async function getL_coff(user1, user2){
  return new Promise((resolve, reject) => {
    connection.query("SELECT username, surname FROM people WHERE username = ? or username = ?", [user1, user2], function (err, results) {
      if (err) { return reject(err) }
      var like_coff1 = results[0].surname.replace(/\s/g,'').split("#")
      var like_coff2 = results[1].surname.replace(/\s/g,'').split("#")
      var count = 0;
      var match = 0;
      for (var val of like_coff1){
        if (val != ''){
          count++;
          if(like_coff2.includes(val)){
            match++;
        }}
      }
      like_coff = match/count
      resolve(like_coff)
    })
  })
}

//Calculates match coefficient between 2 given usernames
function getMatchScore(user1, user2){
  return new Promise(async (resolve, reject) => {
  try{    
  dist = getD_coff(user1, user2)
  age = getA_coff(user1, user2)
  pref = getP_coff(user1, user2)
  like = getL_coff(user1, user2)
  // match = dist * age * pref * like

  // dist.catch((err) => { console.error(err) })
  //   .then(dist => console.log("Distance match: "+dist))
  
  // age.catch((err) => { console.error(err) })
  //   .then(age => console.log("Age match: "+age))

  // pref.catch((err) => { console.error(err) })
  //   .then(pref => console.log("Preferance match: "+pref))

  // like.catch((err) => { console.error(err) })
  //   .then(like => console.log("Like match: "+like))

  var match = await dist * await age * await pref + await like
  } catch (err) {
    reject(err)
  }
  resolve (match) 
  })
}