const express = require("express");
const axios = require("axios");
const router = express.Router();
const date = require("../date");

router.get("/", function (req, res) {
    let pdate = req.query.date || date.dashdmy;
    let images = [];
    for (let i = 1; i <= 8; i++)
        images.push(`http://alakhbar.com.pk/epaper/epaper/${pdate}/${i}.jpg`);

    axios
        .get(images[0])
        .then(function (response) {
            res.send({
                name: "Al Akhbar",
                date: pdate,
                city: "Islamabad",
                images: images
            });
        })
        .catch(function (error) {
            pdate = date.yestdashdmy;
            images = [];
            for (let i = 1; i <= 8; i++)
                images.push(
                    `http://alakhbar.com.pk/epaper/epaper/${pdate}/${i}.jpg`
                );
            res.send({
                name: "Al Akhbar",
                date: pdate,
                city: "Islamabad",
                images: images
            });
        });
});

module.exports = router;
