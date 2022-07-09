import React, { Component } from "react";
import Image from "../Main/Image";
import Message from "../Main/Message";

export default class NtNews extends Component {
    _isMounted = false;
    cities = [
        "Karachi",
        "Lahore",
        "Islamabad",
        "Peshawar",
        "Faisalabad",
        "Sarghoda",
        "Quetta",
        "Multan",
    ];
    city = this.cities.indexOf(this.props.city) + 1;
    images = [];
    page = 0;
    tries = 0;
    tp = "";

    constructor(props) {
        super(props);
        this.state = {
            images: [],
            msg: "انتظار کریں",
        };
    }

    async componentDidMount() {
        if (this.cities.indexOf(this.props.city) === -1) {
            this.setState({ msg: "Not available for " + this.props.city });
        }
        this._isMounted = true;
        this.getImages(false);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async getImages(common) {
        if (this._isMounted) {
            let p = this.page;
            if (common) {
                p = p + "&is_common=Y";
            }
            let data = await this.sendRequest(
                "https://api.codetabs.com/v1/proxy?quest=www.roznama92news.com/efrontend/web/index.php/index2?station_id=" +
                    this.city +
                    "&page_id=" +
                    p
            );
            let search = 'src="/backend/web/uploads/epaper';
            let re = new RegExp(
                    "((\\S+[\\b\\s]?)" + search + "([\\b\\s]?\\S+))",
                    "i"
                ),
                matches = data.match(re);
            if (matches) {
                let words = data.match(re)[0].split(/\s+/);
                let link = words.join(" ");
                link = link.replace(
                    '<img src="',
                    "https://www.roznama92news.com"
                );
                link = link.replace('"', "");
                this.images.push(link);
                this.setState({ images: this.images });
                if (this.tries === 1) this.page = this.tp;
                if (this.page < 9) {
                    this.page += 1;
                    this.getImages(false);
                } else if (this.page === 9) {
                    this.page += 1;
                }
                if (this.page === 11) {
                    console("Fininshed");
                }
                this.tries = 0;
            } else {
                /*When Page is Not Found so it will search for common Page */
                if (this.tries === 0 && this.page <= 10) {
                    this.tries = 0;
                    this.tp = this.page;
                    this.getImages(true); //common
                    this.tries = 1;
                } else if (this.tries === 1 && this.page <= 10) {
                    this.tries = 0;
                    this.page += 1;
                    this.getImages(false);
                }
            }
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
