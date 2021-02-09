import React, { useState } from "react";
import "./balance.css";

const BlitzBalance = () => {
    const [isExpand, setIsExpand] = useState(false);
    const [fundingOptionDropDown, setFundingOptionDropDown] = useState(false);
    const [fundingOption, setFundingOption] = useState("");
    const [depositAddressDropDown, setDepositAddressDropDown] = useState(false);
    const [depositAddress, setDepositAddress] = useState("");

    const [tab, setTab] = useState("deposit");

    const toggleIsExpand = () => {
        setIsExpand(!isExpand);
    };


    return (
        <div className="balance">
            <div className="select" onClick={toggleIsExpand}>
                <div className="row wrapper">
                    <div className="profileWrapper">
                        <div className="profile">
                            <img src="/assets/images/blitzLogo.png" />
                        </div>

                    </div>
                    <div className="balanceWrapper">
                        <span className="label">Your Balance</span>
                        <span className="ammount">0 BTZ</span>
                    </div>
                </div>
                <img src={isExpand === true ? "/assets/svgs/upArrow.svg" : "/assets/svgs/downArrow.svg"} />
            </div>
            {isExpand === true ?
                <div className="expandedWrapper">
                    <React.Fragment>

                        <span className="historyTitle">Deposit</span>
                        <div className="withdrawAmmountInputWrapper">
                            <div className="withdrawAmmountInput">
                                <span className="title">BLZ tokens address Receive </span>
                                <input type="text" placeholder="0386 3792 3969 02969" />
                            </div>
                            <div className="vertical_line"></div>
                            <img src="/assets/svgs/copy.svg" style={{ margin: "auto" }} />
                        </div>
                        <span className="historyTitle">Convert to USDT</span>
                        <span className="blitzDepositContent">Balance available to convert 0.0 BLZ minimum wager x20. You must turn more over BLZ to redeem funds.</span>

                        <span className="historyTitle">Redeem</span>
                        <div className="withdrawAmmountInputWrapper">

                            <div className="withdrawAmmountInput">
                                <span className="title">ammount</span>
                                <input type="text" placeholder="0" />
                            </div>
                            <div className="vertical_line"></div>
                            <span className="grp_input_btn">All</span>
                        </div>

                        <button className="submitBtn">submit</button>


                    </React.Fragment>
                </div>
                : null}

        </div>
    )
};

export default BlitzBalance; 