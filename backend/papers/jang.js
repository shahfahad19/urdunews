const express = require("express");
const axios = require("axios");
const dateObj = require("../date");
const e = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    let year = dateObj.year;
    let month = parseInt(dateObj.month);
    let day = parseInt(dateObj.day);
    let date = month + "-" + day + "-" + year;
    const cities = ["lahore", "pindi", "karachi", "quetta", "multan", "london"];
    let city = req.query.city;
    city = city.toLowerCase();
    city = city == "rawalpindi" ? "pindi" : city;

    let images = [];
    for (let i = 1; i <= 10; i++) {
        let ext = "jpg";
        if (i > 3 && i < 10) ext = "png";
        images.push(
            `https://e.jang.com.pk/static_pages/${date}/${city}/mainpage/page${i}.${ext}`
        );
    }
    if (city == undefined || cities.indexOf(city) == -1) {
        res.send(
            "Please provide a city name. Available cities are: <br/>" + cities
        );
    } else {
        axios
            .get(images[0])
            .then(function (response) {
                axios
                    .get(
                        `https://e.jang.com.pk/static_pages/${date}/${city}/mainpage/page11.jpg`
                    )
                    .then(function (response) {
                        images.push(
                            `https://e.jang.com.pk/static_pages/${date}/${city}/mainpage/page11.jpg`
                        );
                        images.push(
                            `https://e.jang.com.pk/static_pages/${date}/${city}/mainpage/page12.jpg`
                        );
                    })
                    .then(function (response) {
                        city = req.query.city.toLowerCase();
                        res.send({
                            name: "Jang",
                            date: dateObj.dashdmy,
                            city: city.charAt(0).toUpperCase() + city.slice(1),
                            images: images
                        });
                    });
            })
            .catch(function (error) {
                year = dateObj.yyear;
                month = parseInt(dateObj.ymonth);
                day = parseInt(dateObj.yday);
                date = month + "-" + day + "-" + year;
                images = [];
                for (let i = 1; i <= 10; i++) {
                    let ext = "jpg";
                    if (i > 3 && i < 10) ext = "png";
                    images.push(
                        `https://e.jang.com.pk/static_pages/${date}/${city}/mainpage/page${i}.${ext}`
                    );
                }
                axios
                    .get(
                        `https://e.jang.com.pk/static_pages/${date}/${city}/mainpage/page11.jpg`
                    )
                    .then(function (response) {
                        images.push(
                            `https://e.jang.com.pk/static_pages/${date}/${city}/mainpage/page11.jpg`
                        );
                        images.push(
                            `https://e.jang.com.pk/static_pages/${date}/${city}/mainpage/page12.jpg`
                        );
                    })
                    .then(function (response) {
                        city = req.query.city.toLowerCase();

                        res.send({
                            name: "Jang",
                            date: dateObj.dashdmy,
                            city: city.charAt(0).toUpperCase() + city.slice(1),
                            images: images
                        });
                    });
            });
    }
});

module.exports = router;
