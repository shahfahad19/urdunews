import React from "react";
import { Link } from "react-router-dom";
import "./MainMenu.css";

export const MainMenu = () => {
    return (
        <center>
            <div className="main-menu">
                <Link to="/news/pakistan">خبریں</Link>
                <Link to="/newspapers/papers">اخبارات</Link>
                <Link to="/newspapers/magazines">میگزینز</Link>
            </div>
        </center>
    );
};
