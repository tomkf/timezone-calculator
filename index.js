const express = require("express");
const app = express();
const port = 3000;
const request = require("request");
const bodyParser = require("body-parser");
// docs: https://www.npmjs.com/package/request

const config = require("./config.js").tokens;

// require("./timeCal.js");

const timeModule = require("./timeCal");

// console.log(timeModule.timeCalc("2019-10-21T17:17:13", "2019-10-21T14:17:13"));

//test examples:
//2019-10-21T17:17:13
//2019-10-21T14:17:13

app.use(express.static("views"));
app.use(express.static("styles"));
app.use(bodyParser.urlencoded({ extended: true }));

let apiDatabase = [];

const requestForecast = userCity => {
  return new Promise((resolve, reject) => {
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
      resolve(responce.weather[0].description);
    });
  });
};

const requestTimeZone = userCity => {
  return new Promise((resolve, reject) => {
    let zoneApiCall = `https://dev.virtualearth.net/REST/v1/TimeZone/query=${userCity}?key=${
      config[1]
    }`;

    request(zoneApiCall, function(error, response, body) {
      let responce = JSON.parse(body);
      console.log(responce.resourceSets[0].resources[0].timeZoneAtLocation[0]);
      console.log(
        responce.resourceSets[0].resources[0].timeZoneAtLocation[0].timeZone[0]
          .convertedTime
      );
      return responce
        .resourceSets[0].resources[0].timeZoneAtLocation[0].timeZone[0].convertedTime;
    });
  });
};

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

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/display", async function(req, res) {
  forecastA = await requestForecast(req.body.cityA);

  forecastB = await requestForecast(req.body.cityB);

  timeZoneA = await requestTimeZone(req.body.cityA);

  timeZoneB = await requestTimeZone(req.body.cityB);

  let nameA = req.body.cityA;
  let nameB = req.body.cityB;
  console.log(forecastA, forecastB);
  let template = { nameA, nameB, forecastA, forecastB };
  res.render("display.ejs", template);
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});
