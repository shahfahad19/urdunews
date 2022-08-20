import React from "react";
import "./NewsDetails.css";
import ReactDOM from "react-dom";

export const NewsDetails = (props) => {
    const newsDetails = props.data;
    //////console.log(newsDetails);
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <div className="news-details">
                    <div className="news-details_content">
                        <div className="head">
                            <h3>{newsDetails.title}</h3>
                            <img src={newsDetails.image} alt="" />
                        </div>
                        <div className="details">{newsDetails.summary}</div>
                    </div>
                </div>,
                document.getElementById("overlay")
            )}
        </React.Fragment>
    );
};
