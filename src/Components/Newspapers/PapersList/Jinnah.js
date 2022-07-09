import React from "react";
import Image from "../Main/Image";

const Jinnah = (props) => {
    const date =
        props.date.day + "-" + props.date.month + "-" + props.date.year;
    const cities = ["Lahore", "Islamabad", "Kashmir", "Karachi"];
    if (cities.indexOf(props.city === -1)) {
    }
    const images = [];
    for (let i = 1; i <= 8; i++) {
        images.push(
            `https://www.dailyjinnah.com/assets/${props.city.toLowerCase()}/${date}/${i}.jpg`
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

export default Jinnah;
