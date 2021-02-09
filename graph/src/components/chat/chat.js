import React, { useState } from "react";
import PrimaryButton from "../buttons/primaryButton";
import "./chat.css";
const ChatHeadset = () => {

    const [showDropDown, setShowDropDown] = useState(false);

    const handleDropDown = (val) => {
        setShowDropDown(val);
        console.log("value_10", showDropDown)

    }

    return (
        <div className="chat_container">
            <img src="/assets/images/headsetWhite.png" className="headset_logo" />
            <span className="chat_content">Welcome to support. We are available 24/7, just select your language and open Live chat to start</span>

            <div className="detailsWrapper">

                <div className="selectWrapper">
                    <div className="select" onClick={() => { handleDropDown(!showDropDown); }}>
                        <img src="/assets/images/usa.png" />
                        <img src="/assets/svgs/downArrow.svg" />
                    </div>
                    {showDropDown === true ?
                        <div className="countries">
                            <div className="country" onClick={() => { handleDropDown(false); }}>
                                <img src="/assets/images/usa.png" />
                                <span>us</span>
                            </div>
                            <div className="country" onClick={() => { handleDropDown(false); }}>
                                <img src="/assets/images/usa.png" />
                                <span>us</span>
                            </div>
                            <div className="country" onClick={() => { handleDropDown(false); }}>
                                <img src="/assets/images/usa.png" />
                                <span>us</span>
                            </div>
                        </div> : null}
                </div>
            </div>
            <div className="live_chat_btn_wrapper">
                <PrimaryButton text="Open live chat" />
            </div>
        </div>
    );
};

export default ChatHeadset;