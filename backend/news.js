const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", function (req, res) {
    let cat = req.query.cat || "Pakistan";
    let limit = req.query.n || "60";
    let page = req.query.p || "1";
    axios
        .get(
            "http://167.172.82.64:80/api/v1/news?sort=-updatedAt&categories=" +
                cat +
                "&page=" +
                page +
                "&limit=" +
                limit,
            {
                headers: {
                    authorization: "Basic a2V5OjIyMzM0NDEx"
                }
            }
        )
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.sendStatus(404);
        });
});

module.exports = router;
