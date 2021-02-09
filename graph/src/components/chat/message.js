import React from "react";
import "./inbox.css";


const Message = ({ type, avatar }) => {
    return (
        <div className="row">
            {type === "other" ? <div className="avatar_wrapper"><span className="avatar">{avatar}</span></div> : null}
            <div className="row">

                {type === "other" ? <img src="/assets/images/other_msg_tip.png" className="other_tip" /> : null}
                <div className={type === "self" ? "self message" : "other message"}>

                    <span className="msg_text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            </span>
                </div>
                {type === "self" ? <img src="/assets/images/self_msg_tip.png" className="self_tip" /> : null}

            </div>
        </div>
    );
};

export default Message;