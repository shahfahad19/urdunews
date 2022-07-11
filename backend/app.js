// create an express app
const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://urdunews.vercel.app",
            "http://urdunews.vercel.app",
        ],
    })
);

// use the express-static middleware
app.use(express());

// define the first route
app.get("/", function (req, res) {
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
                    authorization: "Basic a2V5OjIyMzM0NDEx",
                },
            }
        )
        .then((response) => {
            res.send(response.data);
        })
        .catch((error) => {
            res.sendStatus(404);
        });
});

// start the server listening for requests
app.listen(process.env.PORT || 9000, () => console.log("Server is running..."));
