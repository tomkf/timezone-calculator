function findDiffInMinutes(date1, date2) {
  let timediff = 0;
  if (date1 > date2) {
    timediff = date1 - date2;
  } else {
    timediff = date2 - date1;
  }
  //convert to total minutes
  let diffInMins = timediff / (1000 * 60);
  return diffInMins;
}

function calcHours(totMins) {
  //calculate difference in hrs
  let hrsdiff = Math.floor(totMins / 60);
  return hrsdiff;
}

function calcMins(totMins) {
  //calculate difference in mins
  let minutesdiff = Math.round(totMins % 60);
  return minutesdiff;
}

function isAhead(date1, date2) {
  let timediff = 0;
  if (date1 > date2) {
    return "Ahead";
  } else {
    return "Behind";
  }
}

function returnTimeDiff(cityA, cityB) {
  //citydate1, citydate2 = timeZone -> convertedTime -> localTime
  //let citydate1 =
  //let citydate2 =
  let citydate1 = new Date(cityA);
  let citydate2 = new Date(cityB);
  let totminutes = findDiffInMinutes(citydate1, citydate2);
  let findhrs = calcHours(totminutes);
  let findmins = calcMins(totminutes);
  if (findmins === 60) {
    findhrs += 1;
    findmins = 0;
  }
  let aheadOrBehind = isAhead(citydate1, citydate2);
  if (findmins === 0) {
    return `Your city is ${findhrs} hours ${aheadOrBehind} of your destination.`;
  } else {
    return `Your city is  ${findhrs} hours ${findmins} minutes ${aheadOrBehind}  of your destination.`;
  }
}

module.exports = { timeCalc: returnTimeDiff };
