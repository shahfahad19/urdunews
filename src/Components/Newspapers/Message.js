import React from "react";
import Swing from "react-reveal/Swing";

const Message = (props) => {
    const msg = props.msg;
    let message = "";

    if (msg === "paper404") message = "یہ اخبار دستیاب نہیں ہے";
    else if (msg === "city404")
        message = "اس شہر کے لئیے یہ اخبار دستیاب نہیں ہے";
    else if (msg === "page404") message = "صفحہ نہیں ملا";
    else if (msg === "mag404") message = "یہ میگزین دستیاب نہیں ہے";
    else if (msg === "loading") message = "انتظار کریں";
    else if (msg === "newsloading") message = "...خبریں لوڈ ہو رہی ہیں";
    else if (msg === "unavailable") message = "یہ اخبار فلحال دستیاب نہیں ہے";
    else message = msg;
    return (
        <div className="msg">
            <h3>
                <Swing>{message}</Swing>
            </h3>
        </div>
    );
};

export default Message;
