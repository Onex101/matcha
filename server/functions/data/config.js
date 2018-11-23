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
  var user = 'larman'
  console.log('Match scores for '+user+':')
  match = getMatchScore(user)
  match.catch((err) => { console.error(err) })
    .then(match => console.log(match))
  })

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

function getD_coff(gps_lat1, gps_lon1, gps_lat2, gps_lon2) {
      var distance = getDistance(gps_lat1, gps_lon1, gps_lat2, gps_lon2)
      //sigmoidal function
      return ((1 / (1.05+Math.exp(0.3*(0.125*distance - 10))))+0.1)
}

function getA_coff(age1, age2){
      var ageDiff = Math.abs(age1 - age2)
      //linear drop in coff
      return (1 - (ageDiff/100))
}

function getP_coff(gender1, pref1, gender2, pref2){
      dx = Math.pow((gender1 - pref2),2)
      // console.log("dx^2= " + dx)
      dy = Math.pow((pref1 - gender2),2)
      // console.log("dy^2= " + dy)
      return(1 - (Math.sqrt((dx+dy)))/Math.sqrt(2))
}

function getL_coff(likes1, likes2){
      var like_coff1 = likes1.replace(/\s/g,'').split("#")
      var like_coff2 = likes2.replace(/\s/g,'').split("#")
      var count = 0;
      var match = 0;
      for (var val of like_coff1){
        if (val != ''){
          count++;
          if(like_coff2.includes(val)){
            match++;
        }}
      }
      return(match/count)
}

//Calculates match coefficient between given username and all other users and returns an array containing all the scores
function getMatchScore(user1){
  return new Promise(async (resolve, reject) => {
    var quser = mysql.escape(user1)
    connection.query("SELECT username, age, gender, pref, gps_lat, gps_lon, likes FROM people WHERE NOT username = ?",[quser], function (err, results) {
    if (err) { return reject(err) }
      connection.query("SELECT username, age, gender, pref, gps_lat, gps_lon, likes FROM people WHERE username = ?",[quser], function (err, user0) {
        if (err) { return reject(err) }
      var array =[];
      var i = 0;
      while(results[i]){
        dist = getD_coff(user0[0].gps_lat, results[0].gps_lon, results[i].gps_lat, results[i].gps_lon)
        age = getA_coff(user0[0].age, results[i].age)
        pref = getP_coff(user0[0].gender, user0[0].pref, results[i].gender, results[i].pref)
        like = getL_coff(user0[0].likes, results[i].likes)
        var match =  (dist) +  (age) +  (5*pref) + (like)
        var user = results[i].username
        array.push([user,match])
        i++;
      }
      resolve (array) 
      })
    })
  })
}