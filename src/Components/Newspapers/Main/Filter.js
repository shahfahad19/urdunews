import React from "react";
import { NavLink } from "react-router-dom";
import "./Filter.css";

const Filter = () => {
    return (
        <div className="filter">
            <div className="filter-names">
                <NavLink activeclassname="active" to="/newspapers/papers">
                    اخبارات
                </NavLink>
                <NavLink activeclassname="active" to="/newspapers/magazines">
                    میگزین
                </NavLink>
            </div>
        </div>
    );
};

export default Filter;
