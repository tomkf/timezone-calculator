const express = require("express");
const app = express();
const port = 3000;
const request = require("request");
const bodyParser = require("body-parser");
// docs: https://www.npmjs.com/package/request

const config = require("./config.js").tokens;

const mapApiCall = `http://api.openweathermap.org/data/2.5/weather?id=6173331&APPID=${
  config[0]
}`;

let apiDatabase = { reqA: null, reqB: null };

const requestCalls = requestObj => {
  //requestObj will be an array built  from the event listenrs in the front-end...

  request(mapApiCall, function(error, response, body) {
    //console.log("error:", error); // Print the error if one occurred
    let responce = JSON.parse(body);
    // console.log(responce.coord.lon);
    // console.log(responce.coord.lat);

    //   let zoneApiCall = `http://api.timezonedb.com/v2.1/get-time-zone?key=${
    //     config[1]
    //   }&format=json&by=position&lat=${responce.coord.lat}&lng=${
    //     responce.coord.lon
    //   }
    // `;

    //   request(zoneApiCall, function(error, response, body) {
    //     let responceB = JSON.parse(body);
    //     console.log(responceB);
    //   });

    let bingAPiCall = `https://dev.virtualearth.net/REST/v1/TimeZone/query=${
      responce.name
    }?key=${config[1]}`;

    request(bingAPiCall, function(error, response, body) {
      let responceB = JSON.parse(body);
      console.log(responceB.resourceSets[0].resources[0].timeZoneAtLocation[0]);
      console.log(
        responceB.resourceSets[0].resources[0].timeZoneAtLocation[0].timeZone[0]
          .convertedTime
      );
    });

    let results = responce.weather[0];
    console.log(response.coord);
  });
};

requestCalls(1);

app.use(express.static("views"));
app.use(express.static("styles"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => console.log(`Listening on port ${port}`));

app.post("/display", function(req, res) {
  let cityA = req.body.cityA;
  let cityB = req.body.cityB;
  console.log(cityA, cityB);
  let template = { cityA, cityB };
  res.render("display.ejs", template);
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});
