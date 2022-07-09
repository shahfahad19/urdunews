import React from "react";
import Image from "../Main/Image";

const Express = (props) => {
    const date = props.date.year + "" + props.date.month + "" + props.date.day;
    const cities = [
        "LHE",
        "KHI",
        "ISB",
        "FSB",
        "GRW",
        "MUX",
        "PEW",
        "RYK",
        "SGD",
        "SUK",
        "QTA",
    ];
    const citiesName = [
        "Lahore",
        "Karachi",
        "Islamabad",
        "Faisalabad",
        "Gujranwala",
        "Multan",
        "Peshawar",
        "Raheem Yar Khan",
        "Sargodha",
        "Sukkur",
        "Quetta",
    ];
    const city = cities[citiesName.indexOf(props.city)];
    const link =
        "https://www.express.com.pk/images/NP_" +
        city +
        "/" +
        date +
        "/" +
        date +
        "-NP_" +
        city +
        "-";
    return (
        <>
            {citiesName.indexOf(props.city) === -1 && <h2>City Not Found</h2>}
            <Image src={link + "Front_Page_1.jpg"} page={0} />
            <Image src={link + "Metropolitan_PageC002_2.jpg"} />
            <Image src={link + "NAT_INT_PageC003_3.jpg"} />
            <Image src={link + "City_PageC004_4.jpg"} />
            <Image src={link + "Baqia_PageC005_5.jpg"} />
            <Image src={link + "Editorial_PageC006_6.jpg"} />
            <Image src={link + "Classified_PageC007_7.jpg"} />
            <Image src={link + "Sports_PageC008_8.jpg"} />
            <Image src={link + "Magazine_PageC009_9.jpg"} />
            <Image src={link + "Back_PageC010_10.jpg"} />
            <Image src={link + "City_Page002_2.jpg"} />
            <Image src={link + "National_Page003_3.jpg"} />
            <Image src={link + "Classified_Page004_4.jpg"} />
            <Image src={link + "Baqia_Page005_5.jpg"} />
            <Image src={link + "Commerce_PageBW_6.jpg"} />
            <Image src={link + "Sports_PAGE007_7.jpg"} />
            <Image src={link + "Back_Page008_8.jpg"} />
            <Image src={link + "Metropolitan_Page009_9.jpg"} />
            <Image src={link + "Editorial_Page10_10.jpg"} />
            <Image src={link + "Opinion_Page011_11.jpg"} />
            <Image src={link + "Magazine_Page12_12.jpg"} />
        </>
    );
};

export default Express;
