import React, { useState } from "react";
import "./balance.css";

const Balance = (props) => {
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
                            <img src="/assets/svgs/balanceProfile.svg" />
                        </div>
                        <img src="/assets/images/tronLogo.png" className="tronLogo" />

                    </div>
                    <div className="balanceWrapper">
                        <span className="label">Your Balance</span>
                        <span className="ammount">0 USDT</span>
                    </div>
                </div>
                <img src={isExpand === true ? "/assets/svgs/upArrow.svg" : "/assets/svgs/downArrow.svg"} />
            </div>
            {isExpand === true ?
                <div className="expandedWrapper">
                    <div className="tabsWrapper">
                        <span className={tab === "deposit" ? "activeTab" : "tab"} onClick={() => { setTab("deposit"); }}>deposit</span>
                        <span className={tab === "withdraw" ? "activeTab" : "tab"} onClick={() => { setTab("withdraw"); }}>withdraw</span>
                    </div>
                    {tab === "deposit" ?
                        <React.Fragment>
                            <div className="select" onClick={() => { setFundingOptionDropDown(!fundingOptionDropDown); }}>
                                <div className="col selectInputWrapper">
                                    <span className="label">choose a funding option</span>
                                    <span className="option">eth</span>
                                </div>
                                <img src="/assets/svgs/downArrow.svg" />
                            </div>
                            {fundingOptionDropDown === true ?
                                <div className="selectOptions">
                                    <span className="option" onClick={() => { setFundingOption("eth"); setFundingOptionDropDown(false); }}>eth</span>
                                    <span className="option" onClick={() => { setFundingOption("eth"); setFundingOptionDropDown(false); }}>eth</span>
                                    <span className="option" onClick={() => { setFundingOption("eth"); setFundingOptionDropDown(false); }}>eth</span>
                                </div>
                                : null}
                            <div className="select" onClick={() => { setDepositAddressDropDown(!depositAddressDropDown); }}>
                                <div className="col selectInputWrapper">
                                    <span className="label">Deposite Address</span>
                                    <span className="option">0</span>
                                </div>
                                <img src="/assets/svgs/downArrow.svg" />
                            </div>
                            {depositAddressDropDown === true ?
                                <div className="selectOptions">
                                    <span className="option" onClick={() => { setDepositAddress("0"); setDepositAddressDropDown(false); }}>0</span>
                                    <span className="option" onClick={() => { setDepositAddress("0"); setDepositAddressDropDown(false); }}>0</span>
                                    <span className="option" onClick={() => { setDepositAddress("0"); setDepositAddressDropDown(false); }}>0</span>
                                </div>
                                : null}

                            <span className="deposit_tag_line">Balance created after I net. conf.</span>

                            <span className="incoming_transaction_txt"><span className="asterick">*</span>Incoming transaction</span>
                            <div className="row IncomingTransactionsWrapper">
                                <div className="block">
                                    <span className="title">ammount</span>
                                    <span className="ammount">0.007</span>
                                </div>
                                <div className="vertical_line"></div>
                                <div className="block">
                                    <span className="title">crypto</span>
                                    <span className="ammount">eth</span>
                                </div>
                                <div className="vertical_line"></div>
                                <div className="block">
                                    <span className="title">network conf</span>
                                    <span className="ammount">2</span>
                                </div>

                            </div>

                            <span className="historyTitle">History</span>
                            <span className="currentDate">2020-19-12, 17:56</span>
                            <div className="row IncomingTransactionsWrapper">
                                <div className="block">
                                    <span className="title">ammount</span>
                                    <span className="ammount">0.007</span>
                                </div>
                                <div className="vertical_line"></div>
                                <div className="block">
                                    <span className="title">method</span>
                                    <span className="ammount">usdt</span>
                                </div>
                                <div className="vertical_line"></div>
                                <div className="block">
                                    <span className="title">type</span>
                                    <span className="ammount">withdraw</span>
                                </div>
                                <div className="vertical_line"></div>
                                <div className="block">
                                    <span className="title">status</span>
                                    <span className="ammount warning">pending</span>
                                </div>


                            </div>
                            <span className="currentDate">2020-19-12, 17:56</span>
                            <div className="row IncomingTransactionsWrapper">
                                <div className="block">
                                    <span className="title">ammount</span>
                                    <span className="ammount">0.007</span>
                                </div>
                                <div className="vertical_line"></div>
                                <div className="block">
                                    <span className="title">method</span>
                                    <span className="ammount">eth</span>
                                </div>
                                <div className="vertical_line"></div>
                                <div className="block">
                                    <span className="title">type</span>
                                    <span className="ammount">withdraw</span>
                                </div>
                                <div className="vertical_line"></div>
                                <div className="block">
                                    <span className="title">status</span>
                                    <span className="ammount">completed</span>
                                </div>

                            </div>
                        </React.Fragment> : null}
                    {tab === "withdraw" ?
                        <React.Fragment>
                            <div className="withdrawAmmountInputWrapper">
                                <div className="withdrawAmmountInput">
                                    <span className="title">Withdraw amount</span>
                                    <input type="text" placeholder="0" />
                                </div>
                                <div className="vertical_line"></div>
                                <span className="grp_input_btn">All</span>
                            </div>
                            <div className="USDT_TRON_Address_Wrapper">
                                <span className="title">USDT-Tron Address</span>
                                <input type="text" placeholder="0" />
                            </div>
                            <button className="submitBtn">submit</button>
                            <span className="historyTitle">History</span>
                            <span className="currentDate">2020-19-12, 17:56</span>
                            <div className="row IncomingTransactionsWrapper">
                                <div className="block">
                                    <span className="title">ammount</span>
                                    <span className="ammount">0.007</span>
                                </div>
                                <div className="vertical_line"></div>
                                <div className="block">
                                    <span className="title">method</span>
                                    <span className="ammount">usdt</span>
                                </div>
                                <div className="vertical_line"></div>
                                <div className="block">
                                    <span className="title">type</span>
                                    <span className="ammount">withdraw</span>
                                </div>
                                <div className="vertical_line"></div>
                                <div className="block">
                                    <span className="title">status</span>
                                    <span className="ammount warning">pending</span>
                                </div>


                            </div>
                            <span className="currentDate">2020-19-12, 17:56</span>
                            <div className="row IncomingTransactionsWrapper">
                                <div className="block">
                                    <span className="title">ammount</span>
                                    <span className="ammount">0.007</span>
                                </div>
                                <div className="vertical_line"></div>
                                <div className="block">
                                    <span className="title">method</span>
                                    <span className="ammount">eth</span>
                                </div>
                                <div className="vertical_line"></div>
                                <div className="block">
                                    <span className="title">type</span>
                                    <span className="ammount">withdraw</span>
                                </div>
                                <div className="vertical_line"></div>
                                <div className="block">
                                    <span className="title">status</span>
                                    <span className="ammount">completed</span>
                                </div>
                            </div>


                        </React.Fragment> : null}
                </div>
                : null}

        </div>
    )
};

export default Balance; 