const e = require("express");

const dateObj = new Date();
const year = dateObj.getFullYear();
let month = dateObj.getMonth() + 1;
let day = dateObj.getDate();
const nday = dateObj.getDay();
month = month < 10 ? "0" + month : month;
day = day < 10 ? "0" + day : day;

const slashymdConv = (date) => {
    let cdate = new Date(date);
    console.log(cdate);
    let cyear = cdate.getFullYear();
    let cmonth = cdate.getMonth() + 1;
    let cday = cdate.getDate();
    cmonth = cmonth < 10 ? "0" + cmonth : cmonth;
    cday = cday < 10 ? "0" + cday : cday;
    return cyear + "/" + cmonth + "/" + cday;
};

let yday = day,
    ymonth = month,
    yyear = year;

if (day == 1) {
    //Calc Day
    if (month == 4 || month == 6 || month == 9 || month == 11) yday = 30;
    else if (month == 2) yday = 28;
    else yday = 31;
    //Calc Month
    if (month == 1) {
        ymonth = 12;
        yyear = year - 1;
    } else ymonth = month - 1;
} else {
    yday = day - 1;
}

exports.day = day;
exports.nday = nday;
exports.month = month;
exports.year = year;
exports.yday = yday;
exports.ymonth = ymonth;
exports.yyear = yyear;

exports.slashymdConv = slashymdConv;

exports.dmy = day + "" + month + "" + year;
exports.ymd = year + "" + month + "" + day;
exports.dashdmy = day + "-" + month + "-" + year;
exports.slashdmy = day + "/" + month + "/" + year;
exports.slashymd = year + "/" + month + "/" + day;

exports.yestdashdmy = yday + "-" + ymonth + "-" + yyear;
exports.yestslashymd = yyear + "/" + ymonth + "/" + yday;
exports.yestymd = yyear + "" + ymonth + "" + yday;
