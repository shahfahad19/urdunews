import React from "react";
import Image from "../Main/Image";

const Jang = (props) => {
    let date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    date = month + "-" + day + "-" + year;
    const cities = ["lahore", "pindi", "karachi", "quetta", "multan", "london"];
    const citiesName = [
        "Lahore",
        "Rawalpindi",
        "Karachi",
        "Quetta",
        "Multan",
        "London",
    ];
    let city = cities[citiesName.indexOf(props.city)];
    let images = [];
    for (let i = 1; i <= 10; i++) {
        images.push(
            `https://e.jang.com.pk/static_pages/${date}/${city}/mainpage/page${i}.jpg`
        );
    }
    return (
        <>
            <Image src={images[0]} page={0} hide="true" />
            {images.map((x, i) => {
                return (
                    <img
                        src={x}
                        key={i}
                        alt=""
                        onError={(e) => {
                            if (e.target.src.includes("jpg"))
                                e.target.src = e.target.src.replace(
                                    "jpg",
                                    "png"
                                );
                            else {
                                e.target.style.display = "none";
                            }
                        }}
                    />
                );
            })}
        </>
    );
};

export default Jang;
