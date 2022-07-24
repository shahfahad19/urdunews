const express = require("express");
const axios = require("axios");
const router = express.Router();
const dateObj = require("../date");

router.get("/", function (req, res) {
    let reqcity = req.query.city || "";
    reqcity == "" &&
        res.send(
            `Please provide a city name. Available city names are:<br/>Lahore, Karachi`
        );
    let city = reqcity == "Lahore" ? "/lahore" : "";
    let monthNames = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december"
    ];
    let monthName = monthNames[parseInt(dateObj.month) - 1];
    let date = dateObj.dashdmy;
    let images = [];
    for (let i = 1; i <= 8; i++) {
        images.push(
            `https://www.dailyislam.pk/epaper/images${city}/${dateObj.year}/${monthName}/${date}/page${i}.jpg`
        );
    }
    console.log(images[0]);
    axios
        .get(images[0])
        .then(function (response) {
            res.send({
                name: "Islam",
                date: date,
                city: reqcity,
                images: images
            });
        })
        .catch(function (error) {
            date = date.yestdashdmy;
            monthName = monthNames[parseInt(dateObj.ymonth) - 1];
            date = dateObj.yestdashdmy;
            let images = [];
            for (let i = 1; i <= 8; i++) {
                images.push(
                    `https://www.dailyislam.pk/epaper/images${city}/${dateObj.yyear}/${monthName}/${date}/page${i}.jpg`
                );
            }
            res.send({
                name: "Islam",
                date: date,
                city: reqcity,
                images: images
            });
        });
});

module.exports = router;
