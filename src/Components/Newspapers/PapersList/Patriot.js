import React, { Component } from "react";
import Image from "../Main/Image";
import Message from "../Main/Message";

export default class Patriot extends Component {
	_isMounted = false;

	images = [];

	constructor(props) {
		super(props);
		this.state = {
			images: [],
			msg: "loading"
		};
	}

	async componentDidMount() {
		this._isMounted = true;
		let data = await this.sendRequest(
			"https://api.codetabs.com/v1/proxy/?quest=https://dailythepatriot.com/epaper"
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
		let search = "-copy-";
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
			link = link.replaceAll('"', "").replace("src=", "");
			if (link.length < 65) this.images.push(link);
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
						statusText: xhr.statusText
					});
				}
			};
			xhr.onerror = function () {
				reject({
					status: this.status,
					statusText: xhr.statusText
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
