const request = require('request-promise-native');
/*
* Requests user's IP address from https://www.iplify.org/
* Input : None
* Returns : Promise of request for ip data, returned as JSON string
*/

const fetchMyIP = function () {
  return request('https://api.ipify.org?format=json');
};

const fetchCoordsByIP = function(body) {

  const ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/json/${ip}`); 
  
};

const fetchISSFlyOverTimes = function (body) {
  const latitude = JSON.parse(body).data.latitude;
  const longitude = JSON.parse(body).data.longitude;
  // const { latitude, longtitude } = JSON.parse(body).data;
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);

}

const nextISSTimesForMyLocation = function() {

  return fetchMyIP()
  .then(fetchCoordsByIP)
  .then(fetchISSFlyOverTimes)
  .then( (data) => {

    const { response } = JSON.parse(data);
    return response;
  });




};


module.exports = { nextISSTimesForMyLocation };



// module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

