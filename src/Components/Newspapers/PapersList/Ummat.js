import React from "react";
import Image from "../Main/Image";

const Ummat = (props) => {
    const date = `${props.date.year}/${props.date.month}/${props.date.day}`;
    let cities = ["page-", "page0", "page_", "page"];
    let citiesName = ["Karachi", "Peshawar", "Hyderabad", "Rawalpindi"];
    let city = cities[citiesName.indexOf(props.city)];
    let c = 0;
    if (props.date.nday === 0) c = 12;
    else c = 10;
    let images = [];
    for (let i = 1; i <= c; i++) {
        images.push(`https://www.ummat.net/${date}/images/${city}${i}.jpg`);
    }
    return (
        <>
            <Image src={images[0]} page={0} hide={"true"} />
            {images.map((x, i) => {
                return (
                    <img
                        src={x}
                        key={i}
                        alt=""
                        onError={(e) => {
                            if (!e.target.src.includes("page-"))
                                e.target.src = e.target.src
                                    .replace("page_", "page-")
                                    .replace("page0", "page-")
                                    .replace("page", "page-")
                                    .replace("--", "-");
                        }}
                    />
                );
            })}
        </>
    );
};

export default Ummat;
