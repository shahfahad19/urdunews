import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Message from "./Message";
const Image = (props) => {
    const [notAvail, setNotAvail] = useState(false);
    const [load, setLoad] = useState(false);
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
    let timer = parseInt(parseInt(props.page) + 1 + "000") / 2;
    let loadImage = setTimeout(() => {
        setLoad(true);
    }, timer);

    return (
        <>
            {notAvail && <Message msg="unavailable" />}
            {load && (
                <LazyLoadImage
                    src={src}
                    effect="blur"
                    threshold="250"
                    style={{
                        width: "98vw",
                        minHeight: "70vw",
                        height: "max-content",
                        display: display,
                        padding: "5px"
                    }}
                    onError={imgErrorHandler}
                />
            )}
        </>
    );
};

export default Image;
