import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import Message from "./Message";
import Image from "./Image";
import "./Style.css";
import { Fade } from "react-reveal";

const ViewMagazine = (props) => {
    const mag = useParams().magname;
    const [magname, setMag] = useState("");
    const [errorType, setError] = useState(0);
    const [paper, setPaper] = useState({ images: [] });

    let mounted = useRef(false);

    const dateObj = new Date();
    const year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    let day = dateObj.getDate();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;

    const maxdate = `${year}-${month}-${day}`;
    let inDate = useRef(maxdate);
    const [date, setDate] = useState("");
    const days = ["اتوار", "پیر", "منگل", "بدھ", "جمعرات", "جمعہ", "ہفتہ"];
    const months = [
        "جنوری",
        "فروری",
        "مارچ",
        "اپریل",
        "مئى",
        "جون",
        "جولائی",
        "اگست",
        "ستمبر",
        "اکتوبر",
        "نومبر",
        "دسمبر"
    ];
    let urduDate = useRef("");

    useEffect(() => {
        mounted.current = true;

        if (mounted.current && props.maglist.indexOf(mag) > -1) {
            setMag(props.urduMag[props.maglist.indexOf(mag)]);
            setError(0);
        } else setError("mag404");

        async function getNews(url) {
            window.scrollTo(0, 0);
            if (mounted.current) {
                let data = await sendRequest(url);

                if (mounted.current) {
                    if (mounted.current) {
                        data = JSON.parse(data);
                        let d = data.date.split("-");
                        inDate.current = d[2] + "-" + d[1] + "-" + d[0];
                        urduDate.current = {
                            day: days[new Date(inDate.current).getDay()],
                            date: d[0],
                            month: months[parseInt(d[1]) - 1],
                            year: d[2]
                        };
                        setPaper(data);
                    }
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

        if (mounted.current && magname !== "") {
            let link =
                "https://urdunewsapi.vercel.app/mag/" +
                mag.toLowerCase().replaceAll(" ", "");
            link = date === "" ? link : link + "?date=" + date;
            getNews(link);
            setPaper({ images: [] });
            getNews(link);
        }

        return () => {
            mounted.current = false;
        };
    }, [props, date, magname]);

    const changeDate = (inputDate) => {
        let iDate = inputDate.split("-");
        setDate(`${iDate[2]}-${iDate[1]}-${iDate[0]}`);
    };

    return (
        <>
            {errorType === 0 && (
                <>
                    {magname !== "" && (
                        <>
                            <h3
                                className="paperName"
                                style={{
                                    textAlign: "center",
                                    color: "#0f0f0f",
                                    alignSelf: "center"
                                }}
                            >
                                {magname}
                            </h3>
                            {paper.images.length > 0 && (
                                <div className="date">
                                    <p>&nbsp;</p>
                                    <h4 className="urduDate">
                                        <span>{urduDate.current.day}</span>،
                                        <span>{urduDate.current.date}</span>
                                        <span>{urduDate.current.month}</span>
                                        <span>{urduDate.current.year}</span>
                                    </h4>
                                    <div>
                                        Date:&nbsp;
                                        <input
                                            type="date"
                                            max={maxdate}
                                            value={inDate.current}
                                            onChange={(event) => {
                                                changeDate(event.target.value);
                                                inDate.current =
                                                    event.target.value;
                                            }}
                                        />
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {paper.images.length === 0 && <Message msg={"loading"} />}
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

export default ViewMagazine;
