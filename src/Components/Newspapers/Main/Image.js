import React, { useState } from "react";
import "./Image.css";
import Message from "./Message";
const Image = (props) => {
    const [notAvail, setNotAvail] = useState(false);
    let imgDisplay = "block";
    if (props.hide === "true") {
        imgDisplay = "none";
    }
    const [display, setDisplay] = useState(imgDisplay);
    const [src, setSrc] = useState(props.src);
    function imgErrorHandler() {
        setDisplay("none");
        setSrc("#");
        if (props.page === 0) {
            setNotAvail(true);
        }
    }
    return (
        <>
            {notAvail && <Message msg="unavailable" />}
            <img
                src={src}
                loading="lazy"
                onError={imgErrorHandler}
                alt=""
                style={{ display: display }}
            />
        </>
    );
};

export default Image;
