import React from "react";
import { Link } from "react-router-dom";
import "./Grid.css";

const MagList = (props) => {
    return (
        <>
            <center>
                <div className="grid">
                    {props.maglist.map((name, index) => {
                        return (
                            <Link
                                key={index}
                                to={name}
                                state={{
                                    magName: props.urdumaglist[index],
                                }}
                            >
                                {props.urdumaglist[index]}
                            </Link>
                        );
                    })}
                </div>
            </center>
        </>
    );
};

export default MagList;
