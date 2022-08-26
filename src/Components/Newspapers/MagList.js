import React from "react";
import { Fade } from "react-reveal";
import { Link } from "react-router-dom";

const MagList = (props) => {
    return (
        <Fade>
            <center>
                <div className="grid">
                    {props.maglist.map((name, index) => {
                        return (
                            <Link
                                key={index}
                                to={name}
                                state={{
                                    magName: props.urdumaglist[index]
                                }}
                            >
                                {props.urdumaglist[index]}
                            </Link>
                        );
                    })}
                </div>
            </center>
        </Fade>
    );
};

export default MagList;
