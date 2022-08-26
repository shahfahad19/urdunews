import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
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
    let timer = parseInt(parseInt(props.page) + 1 + "000");
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
                    style={{
                        width: "98vw",
                        minHeight: "75vw",
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
