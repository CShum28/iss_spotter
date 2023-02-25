const request = require("request");
const dayjs = require("dayjs");

const fetchMyIp = function (callback) {
  request("https://api.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    fetchCoordsByIp(JSON.parse(body).ip, callback);
    // callback(null, JSON.parse(body).ip);
    return;
  });
};

const fetchCoordsByIp = function (ip, callback) {
  request("http://ipwho.is/" + ip, (error, response, body) => {
    // request("https://ipwho.is/42", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    const parsedBody = JSON.parse(body);
    if (!parsedBody.success) {
      const message = `Success status was ${parsedBody.success}. Server message says: ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      // console.log(message);
      callback(Error(message), null);
      return;
    }

    const latitude = parsedBody.latitude;
    const longitude = parsedBody.longitude;
    const output = { latitude, longitude };
    // callback(null, output);
    fetchISSFlyOverTimes(output, callback);
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  const lat = coords.latitude;
  const lon = coords.longitude;
  request(
    `https://iss-flyover.herokuapp.com/json/?lat=${lat}&lon=${lon}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching ISS pass times: ${body}`;
        callback(Error(msg), null);
        return;
      }
      const ISSResponse = JSON.parse(body).response;

      callback(null, ISSResponse);
    }
  );
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIp(callback);
};

module.exports = {
  fetchMyIp,
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
};
