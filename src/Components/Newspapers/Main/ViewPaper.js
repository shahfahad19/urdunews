import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Message from "./Message";
import Image from "./Image";

const ViewPaper = (props) => {
    const params = useParams();
    let mounted = useRef(false);
    const [errorType, setError] = useState(0);
    const [avail, setAvail] = useState([]);
    const [paper, setPaper] = useState({ images: [] });

    //const [paper, setPaper] = useState({});
    useEffect(() => {
        mounted.current = true;
        const papers = props.papers;
        const cities = props.cities;

        let paperCities = [],
            cityIndex;
        const paperIndex = papers.indexOf(params.paper);
        let link = "";
        if (paperIndex !== -1) {
            paperCities = cities[paperIndex];
            cityIndex = paperCities.cities.indexOf(params.city);
            link =
                "https://urdunewsapi.herokuapp.com/np/" +
                cities[paperIndex].shortname +
                "/" +
                params.city;
        }
        let paperName, cityName;

        if (paperIndex === -1) {
            setError("paper404");
        } else if (
            paperIndex !== -1 &&
            cityIndex === -1 &&
            paperCities.length > 0
        ) {
            errorType = "city404";
        } else {
            setError(0);
            paperName = props.urduCities[paperIndex].name;
            cityName = props.urduCities[paperIndex].cities[cityIndex];
            setAvail([paperName, cityName]);
        }
        if (paperIndex !== -1) {
            paperCities = cities[paperIndex];
            cityIndex = paperCities.cities.indexOf(params.city);
            link =
                "https://urdunewsapi.herokuapp.com/np/" +
                cities[paperIndex].shortname +
                "/" +
                params.city;
        }

        async function getNews(url) {
            window.scrollTo(0, 0);
            if (mounted.current) {
                let data = await sendRequest(url);

                if (mounted.current) {
                    data = JSON.parse(data);
                    setPaper(data);
                }
            }
        }

        function sendRequest(url) {
            return new Promise(function (resolve, reject) {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(xhr.response);
                    }
                };
                xhr.send();
            });
        }

        if (mounted.current && paperIndex > -1 && cityIndex > -1) {
            getNews(link);
        }

        return () => {
            mounted.current = false;
        };
    }, [props]);

    return (
        <>
            {errorType === 0 && (
                <>
                    <h3
                        style={{
                            textAlign: "center",
                            color: "#0f0f0f",
                            borderTop: "3px solid red",
                            alignSelf: "center"
                        }}
                    >
                        {avail.length > 0 && `${avail[0]} (${avail[1]})`}
                    </h3>
                    <div className="date">
                        <div style={{ fontFamily: "Arial" }}>
                            {paper.images.length > 0 && paper.date}
                        </div>
                        <div>
                            Select Date:&nbsp;
                            <input type="date" />
                        </div>
                    </div>

                    {paper.images.length > 0 &&
                        paper.images.map((link, index) => {
                            return <Image src={link} key={index} />;
                        })}
                </>
            )}
            {errorType !== 0 && <Message msg={errorType} />}
        </>
    );
};

export default ViewPaper;
