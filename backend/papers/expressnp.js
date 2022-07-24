// create an express app
const express = require("express");
const axios = require("axios");
const router = express.Router();
const date = require("../date");

router.get("/", function (req, res) {
    const pdate = req.query.date || date.ymd;
    const cities = [
        "LHE",
        "KHI",
        "ISB",
        "FSB",
        "GRW",
        "MUX",
        "PEW",
        "RYK",
        "SGD",
        "SUK",
        "QTA"
    ];
    const citiesName = [
        "lahore",
        "karachi",
        "islamabad",
        "faisalabad",
        "gujranwala",
        "multan",
        "peshawar",
        "raheem_yar_khan",
        "sargodha",
        "sukkur",
        "quetta"
    ];
    const city = cities[citiesName.indexOf(req.query.city.toLowerCase())];

    let link =
        "https://www.express.com.pk/images/NP_" +
        city +
        "/" +
        pdate +
        "/" +
        pdate +
        "-NP_" +
        city +
        "-";

    let url = link + "Front_Page_1.jpg";

    let images = [];
    if (city == undefined) {
        res.send({
            name: "Express",
            cities: [
                "Lahore",
                "Karachi",
                "Islamabad",
                "Faisalabad",
                "Gujranwala",
                "Multan",
                "Peshawar",
                "Raheem Yar Khan",
                "Sargodha",
                "Sukkur",
                "Quetta"
            ]
        });
    } else {
        axios
            .get(url)
            .then(function (response) {
                // handle success
                axios
                    .get(link + "Metropolitan_PageC002_2.jpg")
                    .then(function (response) {
                        images = [
                            link + "Front_Page_1.jpg",
                            link + "Metropolitan_PageC002_2.jpg",
                            link + "NAT_INT_PageC003_3.jpg",
                            link + "City_PageC004_4.jpg",
                            link + "Baqia_PageC005_5.jpg",
                            link + "Editorial_PageC006_6.jpg",
                            link + "Classified_PageC007_7.jpg",
                            link + "Sports_PageC008_8.jpg",
                            link + "Magazine_PageC009_9.jpg",
                            link + "Back_PageC010_10.jpg"
                        ];
                    })
                    .catch(function (error) {
                        images = [
                            link + "Front_Page_1.jpg",
                            link + "City_Page002_2.jpg",
                            link + "National_Page003_3.jpg",
                            link + "Classified_Page004_4.jpg",
                            link + "Baqia_Page005_5.jpg",
                            link + "Commerce_PageBW_6.jpg",
                            link + "Sports_PAGE007_7.jpg",
                            link + "Back_Page008_8.jpg",
                            link + "Metropolitan_Page009_9.jpg",
                            link + "Editorial_Page10_10.jpg",
                            link + "Opinion_Page011_11.jpg",
                            link + "Magazine_Page12_12.jpg"
                        ];
                    })
                    .then(function (response) {
                        res.send({
                            name: "Express",
                            date: date.dashdmy,
                            city:
                                req.query.city.charAt(0).toUpperCase() +
                                req.query.city.slice(1),
                            images: images
                        });
                    });
            })
            .catch(function (error) {
                // handle error
                pdate = date.yestymd;
                link =
                    "https://www.express.com.pk/images/NP_" +
                    city +
                    "/" +
                    pate +
                    "/" +
                    pate +
                    "-NP_" +
                    city +
                    "-";
                axios
                    .get(link + "Metropolitan_PageC002_2.jpg")
                    .then(function (response) {
                        images = [
                            link + "Front_Page_1.jpg",
                            link + "Metropolitan_PageC002_2.jpg",
                            link + "NAT_INT_PageC003_3.jpg",
                            link + "City_PageC004_4.jpg",
                            link + "Baqia_PageC005_5.jpg",
                            link + "Editorial_PageC006_6.jpg",
                            link + "Classified_PageC007_7.jpg",
                            link + "Sports_PageC008_8.jpg",
                            link + "Magazine_PageC009_9.jpg",
                            link + "Back_PageC010_10.jpg"
                        ];
                    })
                    .catch(function (error) {
                        images = [
                            link + "Front_Page_1.jpg",
                            link + "City_Page002_2.jpg",
                            link + "National_Page003_3.jpg",
                            link + "Classified_Page004_4.jpg",
                            link + "Baqia_Page005_5.jpg",
                            link + "Commerce_PageBW_6.jpg",
                            link + "Sports_PAGE007_7.jpg",
                            link + "Back_Page008_8.jpg",
                            link + "Metropolitan_Page009_9.jpg",
                            link + "Editorial_Page10_10.jpg",
                            link + "Opinion_Page011_11.jpg",
                            link + "Magazine_Page12_12.jpg"
                        ];
                    })
                    .then(function (response) {
                        res.send({
                            name: "Express",
                            date: date.dashdmy,
                            city:
                                req.query.city.charAt(0).toUpperCase() +
                                req.query.city.slice(1),
                            images: images
                        });
                    });
            });
    }
});

// start the server listening for requests
module.exports = router;
