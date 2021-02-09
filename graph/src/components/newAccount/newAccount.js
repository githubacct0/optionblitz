import React from "react";
import PrimaryButton from "../buttons/primaryButton";
import "../login/login.css";
import TextInputSecondary from "../textInput/textInputSecondary"
const NewAccount = ({ handleClose, handleBack }) => {
    return (
        <div className="login_wrapper">
            <div className="login_header">
                <div className="title_wrapper">
                    <img src="/assets/images/admin.png" />
                    <span className="login_header_title">Login/Register Now</span>
                </div>
                <img src="/assets/images/close.png" onClick={handleClose} />
            </div>
            <div className="login_body_wrapper">
                <span className="tag_line">Select the login most convenient for you</span>
                <TextInputSecondary iconName="email" placeHolder="email" />
                <TextInputSecondary iconName="lock" placeHolder="password" />
                <TextInputSecondary iconName="lock" placeHolder="confirm password" />
                <div className="login_btn_wrapper">
                    <PrimaryButton text="register" handleOnClick={() => { }} />
                </div>
                <span className="skip_login" onClick={() => { handleBack(); }}>back</span>
            </div>
        </div>
    );
};

export default NewAccount;