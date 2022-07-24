const express = require("express");
const router = express.Router();
const axios = require("axios");
const date = require("../date");
const citiesNames = [
    "islamabad",
    "lahore",
    "karachi",
    "multan",
    "faisalabad",
    "gujranwala"
];
router.get("/", function (req, res) {
    const cities = ["ISL", "LHR", "KCH", "MUL", "FAB", "GUJ"];

    let reqcity = req.query.city;
    reqcity = reqcity.toLowerCase();
    const city = cities[citiesNames.indexOf(reqcity)];
    city == undefined &&
        res.send({
            error: "Invalid city",
            availablecities: citiesNames
        });
    let images = [];
    let url = "https://e.dunya.com.pk/index.php?e_name=" + city;
    console.log(url);
    axios
        .get(url)
        .then(function (response) {
            let data = response.data;
            let search = 'c="news/';
            let re = new RegExp(
                "((\\S+[\\b\\s]?)" + search + "([\\b\\s]?\\S+))",
                "i"
            );
            let matches = data.match(re);

            while (matches) {
                let words = "";
                try {
                    words = data.match(re)[0].split(/\s+/);
                } catch {
                    break;
                }
                let link = words.join(" ");
                data = data.replace(link, "");
                link = link.replace('src="', "");
                link = link.replace('"', "");
                images.push("https://e.dunya.com.pk/" + link);
            }
            res.send({
                name: "Dunya",
                date: date.dashdmy,
                city: req.query.city,
                images: images
            });
        })
        .catch(function (error) {
            // handle error
            console.log("Error");
        });
});

module.exports = router;
