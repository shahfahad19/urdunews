import React from "react";
import Image from "../Main/Image";

const Mashriq = (props) => {
    const date =
        props.date.day + "-" + props.date.month + "-" + props.date.year;
    let images = [];
    for (let i = 1; i <= 12; i++)
        images.push(
            `https://mashriqtv.pk/daily-mashriq/uploads/mashriqnp/${date}/mas-${date}-${i}.jpg`
        );
    return (
        <>
            {images.map((x, i) => {
                return <Image src={x} key={i} page={i} />;
            })}
        </>
    );
};

export default Mashriq;
