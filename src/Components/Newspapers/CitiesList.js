import React from "react";
import { Fade } from "react-reveal";
import { useParams, Link } from "react-router-dom";
import Message from "./Message";
import "./Style.css";

const CitiesList = (props) => {
    const params = useParams();
    const citiesList = props.data.papers;
    const pos = props.data.papersList.indexOf(params.paper);

    return (
        <Fade>
            {pos === -1 ? (
                <Message msg="paper404" />
            ) : (
                <center>
                    <div className="paper-name">
                        <h3>روزنامہ {props.data.urduPapersList[pos]}</h3>
                    </div>
                    <div className="grid">
                        {citiesList[pos].cities.map((city, i) => {
                            return (
                                <Link to={city} key={i}>
                                    {props.data.urduPapers[pos].cities[i]}
                                </Link>
                            );
                        })}
                    </div>
                </center>
            )}
        </Fade>
    );
};

export default CitiesList;
