const express = require("express");
const app = express();
const port = 3000;
const request = require("request");
const bodyParser = require("body-parser");
// docs: https://www.npmjs.com/package/request

const config = require("./config.js").tokens;

app.use(express.static("views"));
app.use(express.static("styles"));
app.use(bodyParser.urlencoded({ extended: true }));

let apiDatabase = [];

// const requestCalls = requestObj => {
//   //requestObj will be an array built  from the event listenrs in the front-end...

//   request(mapApiCall, function(error, response, body) {
//     //console.log("error:", error); // Print the error if one occurred
//     let responce = JSON.parse(body);
//     // console.log(responce.coord.lon);
//     // console.log(responce.coord.lat);

//     //   let zoneApiCall = `http://api.timezonedb.com/v2.1/get-time-zone?key=${
//     //     config[1]
//     //   }&format=json&by=position&lat=${responce.coord.lat}&lng=${
//     //     responce.coord.lon
//     //   }
//     // `;

//     //   request(zoneApiCall, function(error, response, body) {
//     //     let responceB = JSON.parse(body);
//     //     console.log(responceB);
//     //   });

//     let bingAPiCall = `https://dev.virtualearth.net/REST/v1/TimeZone/query=${
//       responce.name
//     }?key=${config[1]}`;

//     request(bingAPiCall, function(error, response, body) {
//       let responceB = JSON.parse(body);
//       console.log(responceB.resourceSets[0].resources[0].timeZoneAtLocation[0]);
//       console.log(
//         responceB.resourceSets[0].resources[0].timeZoneAtLocation[0].timeZone[0]
//           .convertedTime
//       );
//     });

//     let results = responce.weather[0];
//     console.log(response.coord);
//   });
// };

const requestForecast = userCity => {
  let mapApiCall = `http://api.openweathermap.org/data/2.5/weather?q=${userCity}&APPID=${
    config[0]
  }`;
  request(mapApiCall, function(error, response, body) {
    let responce = JSON.parse(body);
    // console.log(responce);
    // console.log("*********************************************");
    // console.log("*********************************************");
    console.log(responce.weather[0].description);
    apiDatabase.push(responce.weather[0].description);
    return responce.weather[0].description;
  });
};

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/display", function(req, res) {
  let parsedA = null;

  let forecastA = new Promise(function(resolve, reject) {
    requestForecast(req.body.cityA);
  });

  forecastA.then(function(value) {
    parsedA = value;
  });

  let forecastB = requestForecast(req.body.cityB);

  let nameA = req.body.cityA;
  let nameB = req.body.cityB;
  console.log(forecastA, forecastB);
  let template = { nameA, nameB, parsedA, forecastB };
  res.render("display.ejs", template);
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});
