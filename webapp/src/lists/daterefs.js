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
    Jan: "January",
    Feb: "February",
    Mar: "March",
    Apr: "April",
    May: "May",
    Jun: "June",
    Jul: "July",
    Aug: "August",
    Sep: "September",
    Oct: "October",
    Nov: "November",
    Dec: "December"
}

const DayMap = new Map(Object.entries(Days));
const MonthMap = new Map(Object.entries(Months));

export const ParseDateString = date => {
    const attributes = date.split(" ");
    let parsedDate = "";
    let monthlyDate = attributes[2]; 
    if(monthlyDate[0] === "0") monthlyDate = monthlyDate[1];
    parsedDate += (DayMap.get(attributes[0]) + " " + 
        MonthMap.get(attributes[1]) + " " + monthlyDate + ", " + attributes[3]);
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