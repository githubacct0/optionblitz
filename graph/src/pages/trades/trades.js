import React, { useEffect, useState } from "react";
import ActiveTabSection from "../../components/trades/tabSection";
import TabHistory from "../../components/trades/tabHistory";
import "./trade.css";

const Trades = () => {
    const [tab, setTab] = useState("active");
    const [tabBtn, setTabBtn] = useState("binary");

    useEffect(() => {

    }, [tab]);


    return (
        <div className="container">
            <div className="bg_trades">
                <div className="trades_header">
                    <img src="/assets/images/trades.png" className="trades_logo" />
                    <span className="trades_title">Trades</span>
                </div>

            </div>
            <div className="tabs_wrapper">
                <span className={tab === "active" ? "trades_tab_active" : "trades_tab"} onClick={() => { setTab("active"); }}>
                    actives
                </span>
                <span className={tab === "history" ? "trades_tab_active" : "trades_tab"} onClick={() => { setTab("history"); }}>
                    history
                    </span>
            </div>
            <div className="tabs_btns">
                <span className={tabBtn === "binary" ? "tab_btn activeTabBtn" : "tab_btn"} onClick={() => { setTabBtn("binary"); }}>

                    binary<sup style={{ marginBottom: "auto" }}>1</sup>
                </span>
                <span className={tabBtn === "turbo rush" ? "tab_btn activeTabBtn" : "tab_btn"} onClick={() => { setTabBtn("turbo rush"); }}>turbo rush</span>
                <span className={tabBtn === "rush" ? "tab_btn activeTabBtn" : "tab_btn"} onClick={() => { setTabBtn("rush"); }}>rush</span>
                <span className={tabBtn === "touch" ? "tab_btn activeTabBtn" : "tab_btn"} onClick={() => { setTabBtn("touch"); }}>touch</span>
                <span className={tabBtn === "no touch" ? "tab_btn activeTabBtn" : "tab_btn"} onClick={() => { setTabBtn("no touch"); }}>no touch</span>
            </div>
            {tab === "active" ? <div>
                <ActiveTabSection tabBtn={tabBtn} />
            </div> : null}
            {tab === "history" ? <TabHistory /> : null}
        </div>
    );
};

export default Trades;