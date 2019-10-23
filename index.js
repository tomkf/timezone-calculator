const express = require("express");
const app = express();
const port = 3000;
const request = require("request");
const bodyParser = require("body-parser");
// docs: https://www.npmjs.com/package/request

const config = require("./config.js").tokens;

const timeModule = require("./timeCal");

let apiDatabase = [];

app.use(express.static("views"));
app.use(express.static("styles"));
app.use(bodyParser.urlencoded({ extended: true }));

const requestForecast = userCity => {
  return new Promise((resolve, reject) => {
    let mapApiCall = `http://api.openweathermap.org/data/2.5/weather?q=${userCity}&APPID=${
      config[0]
    }`;

    request(mapApiCall, function(error, response, body) {
      let responce = JSON.parse(body);
      console.log(responce);
      if (responce.cod == "404" || responce.cod == "400") {
        resolve("error");
      } else {
        resolve(responce.weather[0].description);
      }
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

      resolve(
        apiDatabase.push({
          name:
            responce.resourceSets[0].resources[0].timeZoneAtLocation[0]
              .placeName,
          timeVal:
            responce.resourceSets[0].resources[0].timeZoneAtLocation[0]
              .timeZone[0].convertedTime.localTime,
          zoneName:
            responce.resourceSets[0].resources[0].timeZoneAtLocation[0]
              .timeZone[0].genericName,
          zoneAbv:
            responce.resourceSets[0].resources[0].timeZoneAtLocation[0]
              .timeZone[0].abbreviation
        })
      );
    });
  });
};

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/display", async function(req, res) {
  let forecastA = await requestForecast(req.body.cityA);
  let forecastB = await requestForecast(req.body.cityB);

  if (forecastA === "error" || forecastB === "error") {
    res.render("error.ejs");
  } else {
    await requestTimeZone(req.body.cityA);
    await requestTimeZone(req.body.cityB);

    let objA = apiDatabase[0];
    let objB = apiDatabase[1];

    let timeCall = timeModule.timeCalc(
      apiDatabase[0].timeVal,
      apiDatabase[1].timeVal
    );

    let formatedDateA = timeModule.formatDate(apiDatabase[0].timeVal);
    let formatedDateB = timeModule.formatDate(apiDatabase[1].timeVal);

    let template = {
      forecastA,
      forecastB,
      objA,
      objB,
      timeCall,
      formatedDateA,
      formatedDateB
    };
    res.render("display.ejs", template);
  }
});

app.get("/", (req, res) => {
  apiDatabase = [];
  res.render("index.ejs");
});
