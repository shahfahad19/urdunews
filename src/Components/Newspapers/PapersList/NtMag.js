import React from "react";
import Image from "../Main/Image";

const NtMag = (props) => {
    let d = new Date();
    d.setDate(d.getDate() + 0 - d.getDay());
    let sunday = d.getDate(),
        sMonth = d.getMonth() + 1;
    if (sunday < 10) sunday = "0" + sunday;
    if (sMonth < 10) sMonth = "0" + sMonth;
    const magDate = sunday + sMonth + d.getFullYear();
    let images = [];
    for (var i = 1; i <= 24; i++) {
        images.push(
            `https://www.roznama92news.com/backend/web/uploads/emagzine/2/${d.getFullYear()}/${sMonth}/${magDate}/${i}.jpg`
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

export default NtMag;
