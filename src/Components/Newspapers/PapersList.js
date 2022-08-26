import React from "react";
import { Fade } from "react-reveal";
import { Link } from "react-router-dom";
import "./Style.css";

const PapersList = (props) => {
    return (
        <Fade>
            <center>
                <div className="grid">
                    {props.paperlist.map((paper, index) => {
                        return (
                            <Link key={index} to={paper.name}>
                                {props.urduPapers[index]}
                            </Link>
                        );
                    })}
                </div>
            </center>
        </Fade>
    );
};

export default PapersList;
