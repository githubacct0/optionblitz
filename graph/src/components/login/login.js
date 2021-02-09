import React from "react";
import "./login.css"
import TextInputSecondary from "../textInput/textInputSecondary";
import PrimaryButton from "../buttons/primaryButton";
const Login = ({ handleClose, handleCreateAccount, handleWalletConnect, handleSkip }) => {

    return (
        <div className="login_wrapper">
            <div className="login_header">
                <div className="title_wrapper">
                    <img src="/assets/images/auth_logo.png" />
                    <span className="login_header_title">Login/Register Now</span>
                </div>
                <img src="/assets/images/close.png" onClick={handleClose} />
            </div>
            <div className="login_body_wrapper">
                <span className="tag_line">Select the login most convenient for you</span>
                <button className="dapp_wallet_button" onClick={() => { handleWalletConnect(); }}>Connect Dapp Wallet</button>
                <span className="or">or</span>
                <TextInputSecondary iconName="email" placeHolder="email" />
                <TextInputSecondary iconName="lock" placeHolder="password" />
                <div className="login_btn_wrapper">
                    <PrimaryButton text="login" handleOnClick={() => { }} />
                </div>
                <span className="or_social_media">or social media</span>
                <div className="social_media_wrapper">
                    <div className="social_icon_wrapper">
                        <img src="/assets/images/google.png" />
                    </div>
                    <div className="social_icon_wrapper">
                        <img src="/assets/images/facebook.png" />
                    </div>
                    <div className="social_icon_wrapper">
                        <img src="/assets/images/twitter.png" />
                    </div>
                    <div className="social_icon_wrapper">
                        <img src="/assets/images/telegram.png" />
                    </div>
                    <div className="social_icon_wrapper">

                        <img src="/assets/images/what's_app.png" />

                    </div>
                </div>
                <span className="second_tag">Don’t have an account?</span>
                <div className="login_btn_wrapper">
                    <PrimaryButton text="Create new account" handleOnClick={() => { handleCreateAccount(); }} />
                </div>
                <span className="skip_login" onClick={() => { handleSkip(); }}>Skip</span>
            </div>
        </div>
    );
};

export default Login;