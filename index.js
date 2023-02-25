const {
  fetchMyIp,
  fetchCoordsByIp,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation,
} = require("./iss");

const dayjs = require("dayjs");

// fetchMyIp((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:");
//   console.log(ip);
// });

// fetchCoordsByIp("76.65.95.176", (error, data) => {
//   if (error) {
//     console.log("There is an error: " + error);
//     return;
//   } else {
//     console.log("It worked! Here are the coordinates: ");
//     console.log(data);
//   }
// });

// fetchISSFlyOverTimes(
//   { latitude: "49.27670", longitude: "-123.13000" },
//   (error, data) => {
//     if (error) {
//       console.log("This is the error: " + error);
//       return;
//     }
//     console.log("Please see here for the response property: ");
//     console.log(data);
//   }
// );

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (const time of passTimes) {
    const timeConvert = time.risetime;
    var date = new Date(timeConvert * 1000);
    console.log(
      "Next pass at " +
        dayjs(timeConvert).format(`ddd-MMM-DD-YYYY ZZ`) +
        " for " +
        time.duration +
        " seconds!"
    );
  }
});
