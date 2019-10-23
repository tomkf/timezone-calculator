const findDiffInMinutes = (date1, date2) => {
  let timeDiff = 0;
  if (date1 > date2) {
    timeDiff = date1 - date2;
  } else {
    timeDiff = date2 - date1;
  }
  //convert to total minutes
  let diffInMins = timeDiff / (1000 * 60);
  return diffInMins;
};

const calcHours = totMins => {
  //calculate difference in hrs
  let hrsDiff = Math.floor(totMins / 60);
  return hrsDiff;
};

const calcMins = totMins => {
  //calculate difference in mins
  let minutesDiff = Math.round(totMins % 60);
  return minutesDiff;
};

const returnTimeDiff = (cityA, cityB) => {
  let citydate1 = new Date(cityA);
  let citydate2 = new Date(cityB);
  let totMinutes = findDiffInMinutes(citydate1, citydate2);
  let findHrs = calcHours(totMinutes);
  let findMins = calcMins(totMinutes);
  if (findMins === 60) {
    findHrs += 1;
    findMins = 0;
  }

  let aheadOrBehind = citydate1 > citydate2 ? "ahead" : "behind";

  if (findMins === 0 && findHrs !== 0) {
    return `Your city is ${findHrs} hours ${aheadOrBehind} of your destination.`;
  } else if (findHrs === 0 && findMins == 0) {
    return "Your cities are located in the same timezone";
  } else {
    return `Your city is ${findHrs} hours ${findMins} minutes ${aheadOrBehind}  of your destination.`;
  }
};

const formatDate = dateStr => {
  let hr = parseInt(dateStr.slice(-8, -6));
  let min = dateStr.slice(-5, -3);
  let time = "am";
  if (hr === 24) {
    hr -= 12;
  } else if (hr != 24 && hr > 12) {
    hr -= 12;
    time = "pm";
  } else if (hr === 12) {
    time = "pm";
  }

  return `${hr}:${min} ${time}`;
};

module.exports = { timeCalc: returnTimeDiff, formatDate: formatDate };
