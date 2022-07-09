import React, { useState } from "react";
import Image from "../Main/Image";

const Is = (props) => {
    const monthName = new Date()
        .toLocaleDateString("en-PK", { month: "long" })
        .toLowerCase();
    const date =
        props.date.day + "-" + props.date.month + "-" + props.date.year;
    let city = props.city === "Lahore" ? "/lahore" : "";
    let images = [];
    for (let i = 1; i <= 8; i++) {
        images.push(
            `http://www.dailyislam.pk/epaper/images${city}/${props.date.year}/${monthName}/${date}/page${i}.jpg`
        );
    }

    return (
        <>
            {images.map((link, i) => {
                return <Image src={link} key={i} page={i} />;
            })}
        </>
    );
};

export default Is;
