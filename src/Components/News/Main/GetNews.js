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
            let news;
            try {
                news = localStorage.getItem(type + "_News_Urdu");
                let data = JSON.parse(news);
                setNews(data.data);
            } catch {
                setNews([]);
            }

            if (mounted.current) {
                let data = await sendRequest(
                    "http://167.172.82.64:80/api/v1/news?sort=-updatedAt&categories=" +
                        type +
                        "&page=1&limit=60"
                );
                localStorage.setItem(type + "_News_Urdu", data);
                if (news !== data && mounted.current) {
                    data = JSON.parse(data);
                    setNews(data.data);
                    window.scrollTo(0, 0);
                }
            }

            isUpdated(true);
        }

        function sendRequest(url) {
            return new Promise(function (resolve, reject) {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.setRequestHeader("authorization", "Basic a2V5OjIyMzM0NDEx");
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
            {news.length < 1 && <Message msg="...خبریں لوڈ ہو رہی ہیں" />}
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
