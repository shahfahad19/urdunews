import React from "react";
import Image from "../Main/Image";

const MashriqMag = (props) => {
	let d = new Date();
	d.setDate(d.getDate() + 0 - d.getDay());
	let sunday = d.getDate(),
		sMonth = d.getMonth() + 1;
	if (sunday < 10) sunday = "0" + sunday;
	if (sMonth < 10) sMonth = "0" + sMonth;
	const magDate = sunday + "-" + sMonth + "-" + d.getFullYear();
	let images = [];
	for (var i = 1; i <= 16; i++) {
		images.push(
			`https://mashriqtv.pk/wp-content/uploads/mag-${magDate}-${i}.jpg`
		);
	}
	return (
		<>
			{images.map((x, i) => {
				return <Image src={x} key={i} page={i} />;
			})}
		</>
	);
};

export default MashriqMag;
