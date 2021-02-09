import React from "react";
import PrimaryButton from "../../buttons/primaryButton";
import TextAreaInput from "../../textInput/textArea";

const PriceAlert = () => {
    return (
        <div className="newAlertContainer">
            <div className="newAlertHeader">
                <div className="newAlertTitleWrapper">
                    <img src="/assets/images/priceAlertTrend.png" />
                    <span className="newAlertTitle">price alert</span>
                </div>
                <img src="/assets/images/close.png" />
            </div>
            <img src="/assets/images/priceAlertLogo.png" className="priceAlertLogo" />
            <span className="txt_center priceAlertContent">EUR/USD is up <span className="txt_primary">+10.06</span> to <span className="txt_primary">1.3456</span></span>
            <span className="txt_center priceAlertContent">in the last 2 hours</span>
            <span className="priceAlertTitle">Alert Message</span>
            <TextAreaInput placeholder="Hey! Go to binary options and start trading now!" />
            <div className="primaryBtnWrapper">
                <PrimaryButton text="OK" />
            </div>
        </div>
    );
};

export default PriceAlert;