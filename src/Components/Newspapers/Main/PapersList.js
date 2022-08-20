import React from "react";
import { Link } from "react-router-dom";
import "./Grid.css";

const PapersList = (props) => {
    return (
        <>
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
        </>
    );
};

export default PapersList;
