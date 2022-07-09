import React from "react";
import Image from "../Main/Image";

const Juraat = (props) => {
    const date =
        props.date.year + "/" + props.date.month + "/" + props.date.day;
    let images = [];
    for (let i = 1; i <= 12; i++)
        images.push(`https://e.juraat.com/khi/${date}/News/Page00${i}.jpg`);
    return (
        <>
            {images.map((x, i) => {
                return <Image src={x} key={i} page={i} />;
            })}
        </>
    );
};

export default Juraat;
