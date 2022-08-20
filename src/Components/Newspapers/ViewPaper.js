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

    const dateObj = new Date();
    const year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDate();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    const maxdate = `${year}-${month}-${day}`;
    let inDate = useRef(maxdate);
    const [date, setDate] = useState("");

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
                    let d = data.date.split("-");
                    inDate.current = d[2] + "-" + d[1] + "-" + d[0];
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
            link = date === "" ? link : link + "?date=" + date;
            getNews(link);
            setPaper({ images: [] });
        }

        return () => {
            mounted.current = false;
        };
    }, [props, date]);

    const changeDate = (inputDate) => {
        let iDate = inputDate.split("-");
        //console.log(iDate);
        setDate(`${iDate[2]}-${iDate[1]}-${iDate[0]}`);
    };

    return (
        <>
            {errorType === 0 && (
                <>
                    {avail.length > 0 && (
                        <>
                            <h3>
                                {avail[0]} &nbsp;({avail[1]})
                            </h3>
                            {paper.images.length > 0 && (
                                <div className="date">
                                    Date:&nbsp;
                                    <input
                                        type="date"
                                        max={maxdate}
                                        value={inDate.current}
                                        onChange={(event) => {
                                            changeDate(event.target.value);
                                            inDate.current = event.target.value;
                                        }}
                                    />
                                </div>
                            )}
                        </>
                    )}

                    {paper.images.length > 0 &&
                        paper.images.map((link, index) => {
                            return <Image src={link} key={index} />;
                        })}
                    {paper.images.length === 0 && <Message msg={"loading"} />}
                </>
            )}
            {errorType !== 0 && <Message msg={errorType} />}
        </>
    );
};

export default ViewPaper;