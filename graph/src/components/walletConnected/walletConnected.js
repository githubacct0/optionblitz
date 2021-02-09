import React, { useState } from "react";
import PrimaryButton from "../buttons/primaryButton";
import "../login/login.css";
import TextInputSecondary from "../textInput/textInputSecondary"
const WalletConnected = ({ handleClose, handleBack }) => {
    const [isConnected, setIsConnected] = useState(false);
    return (
        <div className="login_wrapper">
            <div className="login_header">
                <div className="title_wrapper">
                    <img src={isConnected === true ? "/assets/images/lockGreen.png" : "/assets/images/unlockRed.png"} />
                    <span className="login_header_title">{isConnected === true ? "Wallet connected" : "Wallet is not connected"}</span>
                </div>
                <img src="/assets/images/close.png" onClick={handleClose} />
            </div>
            <div className="login_body_wrapper">
                {isConnected === true ?
                    <div className="exchange_wrapper">
                        <img src="/assets/images/exchange.png" className="exchange_logo" />
                    </div> : null}

                {isConnected === false ?
                    <div className="not_connected_wrapper">
                        <span className="not_connected_tag_line_1">Don’t have a dapp wallet?<span className="not_connected_tag_words">What is this?</span></span>
                        <span className="not_connected_tag_line_2">We recommend</span>
                        <div className="apps_wrapper">

                            <div className="app">
                                <div className="app_pic_wrapper">
                                    <img src="/assets/images/tron_link.png" className="app_pic" />
                                </div>
                                <span className="app_name">tron link</span>
                                <button className="app_install_btn">
                                    <img src="/assets/images/download.png" className="download_icon" />
                                    install</button>
                            </div>
                            <div className="vertical_line"></div>

                            <div className="app">
                                <div className="app_pic_wrapper">
                                    <img src="/assets/images/tron_wallet.png" className="app_pic_Wallet" />
                                </div>
                                <span className="app_name">tron wallet</span>

                                <button className="app_install_btn">
                                    <img src="/assets/images/download.png" className="download_icon" />
                                    install</button>
                            </div>
                        </div>
                        <span className="app_footer_line">Compatible DAPP WALLET or browser extension not detected.</span>
                    </div>
                    : null}

                <div className="login_btn_wrapper">
                    <PrimaryButton text="continue" handleOnClick={() => { handleClose(); }} />
                </div>
                <span className="skip_login" onClick={() => { handleBack(); }}>back</span>

            </div>
        </div >
    );
};

export default WalletConnected;