import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Redirect = (props) => {
    let navigate = useNavigate();
    useEffect(() => {
        navigate(props.to, { replace: true });
    });
    return <></>;
};
