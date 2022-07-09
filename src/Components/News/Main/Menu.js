import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Menu.css";

const Menu = (props) => {
    let navigate = useNavigate();
    useEffect(() => {
        if (props.default) {
            navigate("/news/pakistan");
        }
    });

    return (
        <>
            <div className="menu">
                <NavLink activeclassname="active" to="/news/pakistan">
                    پاکستان
                </NavLink>
                <NavLink activeclassname="active" to="/news/regional">
                    علاقائی
                </NavLink>
                <NavLink activeclassname="active" to="/news/international">
                    بین الاقوامی
                </NavLink>
                <NavLink activeclassname="active" to="/news/sports">
                    کھیل
                </NavLink>
                <NavLink activeclassname="active" to="/news/business">
                    کاروبار
                </NavLink>
                <NavLink activeclassname="active" to="/news/other">
                    دیگر
                </NavLink>
            </div>
        </>
    );
};
export default Menu;
