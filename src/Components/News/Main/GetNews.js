import React, { useEffect, useRef, useState } from "react";
import Message from "../../Newspapers/Main/Message";
import News from "./News";

const GetNews = (props) => {
    const mounted = useRef(false);
    const [news, setNews] = useState([]);
    const [updated, isUpdated] = useState(false);

    const type = props.type;

    useEffect(() => {
        mounted.current = true;

        async function getNews() {
            window.scrollTo(0, 0);
            let newsSaved;
            try {
                newsSaved = localStorage.getItem(type + "_urdunews");
                let data = JSON.parse(newsSaved);
                if (mounted.current) setNews(data);
            } catch {
                setNews([]);
            }

            if (mounted.current) {
                let data = await sendRequest(
                    `https://urdunewsapi.vercel.app/news?cat=${type}&n=100`
                );
                localStorage.setItem(type + "_urdunews", data);
                if (newsSaved !== data && mounted.current) {
                    data = JSON.parse(data);
                    setNews(data);
                    window.scrollTo(0, 0);
                }
            }
            if (mounted.current) isUpdated(true);
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
        getNews();

        return () => {
            mounted.current = false;
        };
    }, []);

    return (
        <div>
            {mounted.current && news.length < 1 && (
                <Message msg="...خبریں لوڈ ہو رہی ہیں" />
            )}
            {!updated && (
                <center style={{ fontFamily: `"Noto Nastaliq Urdu", serif` }}>
                    <small> نئی خبریں لوڈ ہو رہی ہیں</small>
                </center>
            )}
            {news.map((news, index) => (
                <News key={index} news={news} />
            ))}
        </div>
    );
};

export default GetNews;
