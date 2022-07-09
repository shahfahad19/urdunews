import React, { Component } from "react";
import Image from "../Main/Image";
import Message from "../Main/Message";

export default class NawaiWaqt extends Component {
    _isMounted = false;
    cities = [
        "ajk",
        "gawadar",
        "gujranwala",
        "islamabad",
        "karachi",
        "lahore",
        "multan",
        "quetta",
    ];
    city = this.cities[this.cities.indexOf(this.props.city.toLowerCase())];
    images = [];

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            msg: "انتظار کریں",
        };
    }

    async componentDidMount() {
        if (this.cities.indexOf(this.props.city.toLowerCase()) === -1) {
            this.setState({ msg: "Not available for " + this.props.city });
        }
        this._isMounted = true;
        let data = await this.sendRequest(
            "https://api.codetabs.com/v1/proxy?quest=https://www.nawaiwaqt.com.pk/E-Paper/" +
                this.city
        );
        this.getImages(data);
        if (this._isMounted) {
            this.setState({ images: this.images });
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    getImages(data) {
        let search = "epaper_image/small";
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
            link = link.replace('src="', "");
            link = link.replace("small", "large");
            link = link.replace('"', "");

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
