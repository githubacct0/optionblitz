import React, { useEffect } from "react";
import "./inbox.css";
import Message from "./message";
const Inbox = () => {
    useEffect(() => {
        let element = document.getElementsByClassName("inbox_wrapper")[0];
        console.log(element);
        element.scrollTo = element.scrollHeight;
    }, []);

    return (
        <div className="inbox_wrapper">

            <div className="chat_msgs">
                <Message type="self" />
                <Message type="other" avatar="a" />
                <Message type="self" />
                <Message type="other" avatar="m" />
            </div>

            <div className="bottom_wrapper">
                <input type="text" className="input" />
                <img src="/assets/images/send.png" className="sendBtn" />
            </div>
        </div>
    );
};

export default Inbox;