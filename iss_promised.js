const request = require("request-promise-native");

const fetchMyIp = () => {
  return request("https://api.ipify.org?format=json");
};

const fetchCoordsByIp = (body) => {
  const ip = JSON.parse(body).ip;
  return request("http://ipwho.is/" + ip);
};

const fetchISSFlyOverTimes = (body) => {
  const parsedBody = JSON.parse(body);
  const latitude = parsedBody.latitude;
  const longitude = parsedBody.longitude;
  return request(`https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`);
}

const nextISSTimesForMyLocation = () => {
  return fetchMyIp()
    .then(fetchCoordsByIp)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data)
      return response;
    })
}

module.exports = { nextISSTimesForMyLocation };
