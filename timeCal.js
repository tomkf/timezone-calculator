const findDiffInMinutes = (date1, date2) => {
  let timediff = 0;
  if (date1 > date2) {
    timediff = date1 - date2;
  } else {
    timediff = date2 - date1;
  }
  //convert to total minutes
  let diffInMins = timediff / (1000 * 60);
  return diffInMins;
};

const calcHours = totMins => {
  //calculate difference in hrs
  let hrsdiff = Math.floor(totMins / 60);
  return hrsdiff;
};

const calcMins = totMins => {
  //calculate difference in mins
  let minutesdiff = Math.round(totMins % 60);
  return minutesdiff;
};

const isAhead = (date1, date2) => {
  let timediff = 0;
  if (date1 > date2) {
    return "ahead";
  } else {
    return "behind";
  }
};

const returnTimeDiff = (cityA, cityB) => {
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
  if (findmins === 0 && findhrs !== 0) {
    return `Your city is ${findhrs} hours ${aheadOrBehind} of your destination.`;
  } else if (findhrs === 0 && findmins == 0) {
    return "Your cities are located in the same timezone";
  } else {
    return `Your city is  ${findhrs} hours ${findmins} minutes ${aheadOrBehind}  of your destination.`;
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
