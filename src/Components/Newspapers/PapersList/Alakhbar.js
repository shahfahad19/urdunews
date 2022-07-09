import React from "react";
import Image from "../Main/Image";

const Alakhbar = (props) => {
    const date =
        props.date.day + "-" + props.date.month + "-" + props.date.year;
    let images = [];
    for (let i = 1; i <= 8; i++)
        images.push(`http://alakhbar.com.pk/epaper/epaper/${date}/${i}.jpg`);
    return (
        <>
            {images.map((x, i) => {
                return <Image src={x} key={i} page={i} />;
            })}
        </>
    );
};

export default Alakhbar;
