import React, { useState } from "react";
import PrimaryButton from "../buttons/primaryButton";
import "../login/login.css";
const Warning = ({ handleClose }) => {

    return (
        <div className="login_wrapper">
            <div className="login_header">
                <div className="title_wrapper">
                    <img src="/assets/images/warning.png" />
                    <span className="login_header_title">Warning</span>
                </div>
                <img src="/assets/images/close.png" onClick={handleClose} />
            </div>
            <div className="not_connected_wrapper">
                <span className="not_connected_tag_line_1 warning_text">IF you close this session you will not be able to recover your balance. Use a <span className="not_connected_tag_words">Dapp wallet  </span>
                 or create a <span className="not_connected_tag_words">Login</span> to  secure your funds</span>
            </div>
            <div className="login_btn_wrapper">
                <PrimaryButton text="Continue" handleOnClick={() => { handleClose(); }} />
            </div>
            <span className="skip_login" onClick={() => { handleClose(); }}>Back</span>
        </div>
    )
};

export default Warning;