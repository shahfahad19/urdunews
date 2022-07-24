const express = require("express");
const axios = require("axios");
const router = express.Router();
const dateObj = require("../date");

router.get("/", function (req, res) {
    let date = req.query.date || dateObj.slashymd;
    let images = [];
    for (let i = 1; i <= 16; i++)
        images.push(
            `https://e.brecorder.com/image/papers/${date}/page_${i}.jpg`
        );

    axios
        .get(images[0])
        .then(function (response) {
            res.send({
                name: "Business Recorder",
                date: dateObj.dashdmy,
                city: "Karachi",
                images: images
            });
        })
        .catch(function (error) {
            date = dateObj.yestslashymd;
            images = [];
            for (let i = 1; i <= 16; i++)
                images.push(
                    `https://e.brecorder.com/image/papers/${date}/page_${i}.jpg`
                );
            res.send({
                name: "Business Recorder",
                date: dateObj.yestdashdmy,
                city: "Karachi",
                images: images
            });
        });
});

module.exports = router;
