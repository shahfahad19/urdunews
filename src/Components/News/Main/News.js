import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Fade } from "react-reveal";
import "./News.css";
const News = (props) => {
    const news = props.news;
    const [details, showDetails] = useState(false);
    const defaultStyles = {
        height: "auto",
        headDisplay: "row-reverse",
        imgHeight: "80px",
        imgWidth: "120px",
        objectFit: "cover",
        titleSize: "14px",
        clicked: false
    };
    const [styles, setStyles] = useState(defaultStyles);

    const date = new Date(news.time).getTime();

    const dateNow = new Date().getTime();
    const n = 86400000;
    const d = dateNow - date;
    let time = 0;
    const days = Math.floor(d / n);
    const hrs = Math.floor((d % n) / (n / 24));
    const min =
        Math.floor((d % (n / 24)) / 60000) > 0
            ? Math.floor((d % (n / 24)) / 60000)
            : 1;

    time = hrs > 0 ? hrs : time;
    time = days > 0 ? days : hrs;
    time = time === 0 ? min : time;

    let ind = 0;

    ind = time === min ? " منٹ پہلے" : ind;
    ind = time === hrs ? " گھنٹے پہلے" : ind;
    ind = time === days ? " دن پہلے" : ind;

    let color = "red";
    const src = news.source;

    if (src === "GeoNews") color = "#204499";
    if (src === "AryNews") color = "#B53017";
    if (src === "JangNews") color = "#353535";
    if (src === "BBCNews") color = "#992712";
    if (src === "ExpressNews") color = "#C5351A";
    if (src === "DunyaNews") color = "#425AD9";
    if (src === "SamaaNews") color = "#283786";
    if (src === "KhaleejUrdu") color = "#2C5296";
    if (src === "DW") color = "#002A5C";

    const clickHandler = () => {
        if (details) {
            showDetails(false);
            setStyles(defaultStyles);
        } else {
            showDetails(true);
            setStyles({
                height: "max-content",
                headDisplay: "column",
                imgHeight: "auto",
                imgWidth: "100%",
                objectFit: "contain",
                titleSize: "16px",
                clicked: true
            });
        }
    };
    return (
        <>
            <Fade>
                <div
                    className={`newscard ${styles.clicked && "clicked"}`}
                    onClick={clickHandler}
                    style={{ height: styles.height }}
                >
                    <div
                        className={`news-head`}
                        style={{ flexDirection: styles.headDisplay }}
                    >
                        <LazyLoadImage
                            src={news.image}
                            effect="blur"
                            style={{
                                height: styles.imgHeight,
                                width: styles.imgWidth,
                                objectFit: styles.objectFit
                            }}
                        />
                        <p
                            style={{
                                marginRight: "10px",
                                fontSize: styles.titleSize
                            }}
                        >
                            {news.title}
                        </p>
                    </div>

                    <div className="info">
                        <div className="info-time">
                            <small>{time}</small>
                            <small>{ind}</small>
                        </div>
                        <div className="info-source">
                            <small style={{ backgroundColor: color }}>
                                {news.source.replace("News", "")}
                            </small>
                        </div>
                    </div>

                    {details && (
                        <>
                            {news.shortSummary.length > 30 && (
                                <p
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {news.shortSummary}
                                </p>
                            )}
                            <p
                                style={{
                                    fontSize: "14px",
                                    margin: "0px 5px 0px 5px"
                                }}
                            >
                                {news.summary}
                            </p>
                        </>
                    )}
                </div>
            </Fade>
        </>
    );
};

export default News;
