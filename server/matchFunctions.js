var Match = function () {

}

//calculates the distance in km between 2 given gps coords
Match.getDistance = function (gps_lat1, gps_lon1, gps_lat2, gps_lon2) {

  var R = 6371; //constant to calculate distance in km
  var lat1_rads = (this.toRads(gps_lat1));
  var lat2_rads = (this.toRads(gps_lat2));
  var dLat = this.toRads(gps_lat2 - gps_lat1);
  var dLon = this.toRads(gps_lon2 - gps_lon1);

  var x = Math.pow(Math.sin(dLat / 2), 2);
  var y = Math.pow(Math.sin(dLon / 2), 2);
  var z = Math.cos(lat1_rads) * Math.cos(lat2_rads);

  var a = x + (z * y);
  var c = 2 * Math.atan(Math.sqrt(a) / Math.sqrt(1 - a));
  return (Math.round(R * c * 100) / 100);
}

//converts degs to rads
Match.toRads = function (deg) {
  return (deg * Math.PI / 180);
}

//convert birthdate to age in years
Match.getAge = function (dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//calculates a value on how well 2 users match based on their GPS coordinates. return value is based on optimized simoidal curve
Match.getD_coff = function (gps_lat1, gps_lon1, gps_lat2, gps_lon2) {
  var distance = this.getDistance(gps_lat1, gps_lon1, gps_lat2, gps_lon2)
  //sigmoidal function
  return ((1 / (1.05+Math.exp(0.3*(0.125*distance - 10))))+0.1)
}


//gives value betweer 0 and 1 to indicate how well two users match based on age
Match.getA_coff = function (birth_date1, birth_date2){
  var age1 = this.getAge(birth_date1)
  var age2 = this.getAge(birth_date2)
  var ageDiff = Math.abs(age1 - age2)
  //linear drop in coff
  return (1 - (ageDiff/100))
}

//returns the distance between two given sets of gender + pref
//maximum distance of 1 is deducted from 1 to give higher values for better matches
Match.getP_coff = function (gender1, pref1, gender2, pref2){
  dx = Math.pow((gender1 - pref2),2)
  dy = Math.pow((pref1 - gender2),2)
  return(1 - (Math.sqrt((dx+dy)))/Math.sqrt(2))
}


//returns a value between 0 and 1 representing the % overlap in likes between the 2 users
Match.getL_coff = function (interests1, interests2){
	var count = 0;
	var match = 0;
	var user = interests1.split(",");
	var match2 = interests2.split(",");
	for (var val of user){
	if (val != ''){
		count++;
		if(match2.includes(val)){
		match++;
	}}
	}
	console.log("Div count = " + match/count)
	// return(match/count)
	return(1)

}

module.exports = Match;