export const Days = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday"
}

export const Months = {
    Jan: {
        name:"January",
        num:1
     },
    Feb: {
        name:"February",
           num:2 
        },
    Mar: {
        name:"March",
           num:3
        },
    Apr: {
        name:"April",
           num:4
         },
    May: {
        name:"May",
           num:5
         },
    Jun: {
        name:"June",
           num:6 },
    Jul: {name:"July",
           num:7 },
    Aug: {name:"August",
           num:8 },
    Sep: {name:"September",
           num:9 },
    Oct: {name:"October",
           num:10 },
    Nov: {name:"November",
           num:11 },
    Dec: {name:"December",
           num:12 },
}

const DayMap = new Map(Object.entries(Days));
const MonthMap = new Map(Object.entries(Months));

export const ParseDateString = date => {
    const attributes = date.split(" ");
    let parsedDate = "";
    let monthlyDate = attributes[2]; 
    if(monthlyDate[0] === "0") monthlyDate = monthlyDate[1];
    parsedDate += (DayMap.get(attributes[0]) + " " + 
        MonthMap.get(attributes[1]).name + " " + monthlyDate + ", " + attributes[3]);
    return parsedDate;
}

export const ParseTimeString = time => {
    const attributes = time.split(":");
    const hours = Number(attributes[0]);
    const minutes = Number(attributes[1]);
    let timeValue;
    if (hours > 0 && hours <= 12) {
        timeValue= "" + hours;
    } else if (hours > 12) {
        timeValue= "" + (hours - 12);
    } else if (hours == 0) {
        timeValue= "12";
    }
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;
    timeValue += (hours >= 12) ? " P.M." : " A.M";
    return timeValue;
}

export const ParseDateTimeToUTC = (date, time) => {
    const dateAttributes = date.split(" ")
    const timeAttributes = time.split(":")
    const month = MonthMap.get(dateAttributes[1]).num;
    const day = dateAttributes[2];
    const year = dateAttributes[3];
    const hour = Number(timeAttributes[0]);
    const minutes = Number(timeAttributes[1]);
    const UTCdate = new Date(year, month-1, day, hour, minutes, 0, 0).toUTCString();
    return UTCdate;
}

export const ParseUTCToBackend = (date, time) => {
    const UTCdate = ParseDateTimeToUTC(date,time);
    console.log(UTCdate);
    const dateAttributes = UTCdate.split(" ")
    const month = ("0" + MonthMap.get(dateAttributes[2]).num).slice(-2);
    const day = ("0" + dateAttributes[1]).slice(-2);
    const year = dateAttributes[3];
    const parsedTime = dateAttributes[4];
    const parsedDate = `${month}/${day}/${year} ${parsedTime}`;
    return parsedDate;
}