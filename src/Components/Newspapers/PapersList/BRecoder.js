import React from "react";
import Image from "../Main/Image";

const BRecoder = (props) => {
	const date =
		props.date.year + "/" + props.date.month + "/" + props.date.day;
	let images = [];
	for (let i = 1; i <= 16; i++)
		images.push(
			`https://e.brecorder.com/image/papers/${date}/page_${i}.jpg`
		);
	return (
		<>
			{images.map((x, i) => {
				return <Image src={x} key={i} page={i} />;
			})}
		</>
	);
};

export default BRecoder;
