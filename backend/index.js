// create an express app
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(express());

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://urdunews.vercel.app",
            "http://urdunews.vercel.app"
        ]
    })
);

//Paths
const news = require("./news");

//==> newspapers
const n2 = require("./papers/92");
const alakhbar = require("./papers/alakhbar");
const brecorder = require("./papers/brecorder");
const dunya = require("./papers/dunya");
const expressnp = require("./papers/expressnp");
const is = require("./papers/is");
const jang = require("./papers/jang");
const jasarat = require("./papers/jasarat");
const jehanpakistan = require("./papers/jehanpakistan");
const jinnah = require("./papers/jinnah");
const jurrat = require("./papers/jurrat");
const k2 = require("./papers/k2");
const khabrain = require("./papers/khabrain");
const mashriq = require("./papers/mashriq");
const naibaat = require("./papers/naibaat");
const nation = require("./papers/nation");
const nawaiwaqt = require("./papers/nawaiwaqt");
const pakistan = require("./papers/pakistan");
const pakobserver = require("./papers/pakobserver");
const patriot = require("./papers/patriot");
const ummat = require("./papers/ummat");

//==>magazines
const n2mag = require("./magazines/92");
const family = require("./magazines/family");
const khabrainMag = require("./magazines/khabrain");
const mashriqMag = require("./magazines/mashriq");
const nawaiwaqtMag = require("./magazines/nawaiwaqt");
const nidaimillat = require("./magazines/nidaimillat");
const phool = require("./magazines/phool");
const zindagi = require("./magazines/zindagi");

app.use("/", function (req, res) {
    res.send("Welcome! This API is currently under construction");
});
app.use("/news", news);
app.use("/Express", expressnp);
app.use("/Al_Akhbar", alakhbar);
app.use("/Business_Recorder", brecorder);
app.use("/Dunya", dunya);
app.use("/Islam", is);
app.use("/Jang", jang);

app.listen(9000, () => console.log("Server is running..."));
