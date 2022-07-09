import React from "react";
import Image from "../Main/Image";

const Jasarat = (props) => {
    const date = `${props.date.year}-${props.date.month}-${props.date.day}`;
    const cities = ["islamabad", "karachi", "Hyderabad"];
    const citiesName = ["Islamabad", "Karachi", "Hyderabad"];
    const city = citiesName.indexOf(props.city);
    let images = [];
    let link = "";
    if (city === 0)
        link =
            "https://islamabad.jasarat.com/images/dates/" +
            date +
            "/islamabad/mm/";
    else if (city === 1)
        link =
            "https://epaper.jasarat.com/images/dates/" + date + "/karachi/mm/";
    else if (city === 3)
        link =
            "https://hyderabad.jasarat.com/images/dates/" +
            date +
            "/hyderabad/mm/";
    for (let i = 1; i <= 8; i++) {
        images.push(`${link}${i}.jpg`);
    }
    return (
        <>
            {images.map((x, i) => {
                return <Image src={x} key={i} page={i} />;
            })}
        </>
    );
};

export default Jasarat;
