import React, { Component } from "react";
import Message from "../Main/Message";
import Image from "../Main/Image";

export default class Khabrain extends Component {
    _isMounted = false;
    cities = [12, 7, 9, 13, 17, 8, 18, 11];
    citiesName = [
        "Karachi",
        "Lahore",
        "Multan",
        "Islamabad",
        "Peshawar",
        "Muzaffarabad",
        "Bahawalpur",
        "Magazine",
    ];

    city = this.cities[this.citiesName.indexOf(this.props.city)];

    pages = [];
    images = [];

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            msg: "انتظار کریں",
        };
    }

    async componentDidMount() {
        this._isMounted = true;
        let data = await this.sendRequest(
            "https://api.codetabs.com/v1/proxy?quest=epaper.dailykhabrain.com.pk/epaper?station_id=" +
                this.city
        );
        this.getPages(data);
        for (let i = 0; i <= this.pages.length; i++) {
            if (this._isMounted) {
                let image = await this.sendRequest(
                    "https://api.codetabs.com/v1/proxy?quest=epaper.dailykhabrain.com.pk/epaper?station_id=" +
                        this.city +
                        "&page_id=" +
                        this.pages[i]
                );
                this.getImages(image);
            }
        }
        if (this._isMounted) {
            this.setState({ images: this.images });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getPages(data) {
        let search = "&page_id=";
        let re = new RegExp(
                "((\\S+[\\b\\s]?)" + search + "([\\b\\s]?\\S+))",
                "i"
            ),
            matches = data.match(re);
        while (matches) {
            let words = "";
            try {
                words = data.match(re)[0].split(/\s+/);
            } catch {
                break;
            }
            let link = words.join(" ");
            data = data.replace(link, "");
            link = link.replace(
                'href="epaper?station_id=' + this.city + "&page_id=",
                ""
            );
            link = link.substr(0, 6);
            this.pages.push(link);
        }
    }

    getImages(image) {
        let search = "issues";
        let re = new RegExp(
                "((\\S+[\\b\\s]?)" + search + "([\\b\\s]?\\S+))",
                "i"
            ),
            matches = image.match(re);
        if (matches) {
            let words = image.match(re)[0].split(/\s+/),
                link = words.join(" ");
            link = link
                .replaceAll('"', "")
                .replaceAll("src=", "https://epaper.dailykhabrain.com.pk/");
            this.images.push(link);
        }
    }

    sendRequest(url) {
        return new Promise(function (resolve, reject) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url);
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(xhr.response);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText,
                    });
                }
            };
            xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                });
            };
            xhr.send();
        });
    }

    render() {
        return (
            <div>
                {this.state.images.length === 0 && (
                    <Message msg={this.state.msg} />
                )}
                {this.state.images.map((link, index) => {
                    return <Image src={link} key={index} />;
                })}
            </div>
        );
    }
}
