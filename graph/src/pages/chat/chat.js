import React, { useState } from "react";
import ChatHeadset from "../../components/chat/chat";
import Inbox from "../../components/chat/inbox";
import "./chat.css";
import { useSwipeable } from "react-swipeable";
import Chart from "../../components/chart/chart";
const Chat = () => {
    const [tab, setTab] = useState("headset");

    const [showChat, setShowChat] = useState(true);
    const [showLive, setShowLive] = useState(false);

    const [showSymbolOptions, setShowSymbolOptions] = useState(false);
    const [selectedValue, setSelectedValue] = useState([]);
    const [options, setOptions] = useState(["Eur/USD", "Eur/USD", "Eur/USD", "Eur/USD", "Eur/USD"]);
    const handlers = useSwipeable({
        onSwipedLeft: (eventData) => {
            setShowChat(false);
            setShowLive(true);
        },
        onSwipedRight: (eventData) => {
            setShowChat(true);
            setShowLive(false);
        }

    });
    return (
        <div className="container">
            <div className={showChat === true ? "bg_chat" : showLive === true ? "bg_chat bg_live" : null} {...handlers}>
                <div className="bullets_wrapper">
                    <div className={showChat === true ? "activeDot" : "dot"} onClick={() => { setShowChat(true); setShowLive(false); }}></div>
                    <div className={showLive === true ? "activeDot" : "dot"} onClick={() => { setShowChat(false); setShowLive(true); }}></div>
                </div>
                <div className="chat_header">
                    <img src={showChat === true ? "/assets/images/greenChat.png" : showLive === true ? "/assets/images/binocular.png" : null} />
                    <span className="chat_title">{showChat === true ? "chat" : showLive === true ? "Live sentiment" : null}</span>
                </div>
                {showLive === true ? <React.Fragment>
                    <span className="show_live_title">Most popular markets</span>
                    <div className="row align-center">
                        <div className="SelectWrapper">
                            <div className="Select" onClick={() => { setShowSymbolOptions(!showSymbolOptions); }}>
                                <div className="selectTitleWrapper" style={selectedValue != null ? null : { justifyContent: "center", }}>

                                    <span className="selectTitle"  >EUR/USD <span style={selectedValue == null ? null : { color: "#39967B", fontFamily: "Cabin", marginLeft: "10px" }}>.5 online</span></span>
                                    {selectedValue != null ? <span className="selectValue">{selectedValue}</span> : null}
                                </div>
                                <img src="/assets/svgs/downArrow.svg" />
                            </div>
                            {showSymbolOptions === true ?
                                <div className="Options">
                                    {options.map((item, index) => (
                                        <span className="selectValue"
                                            onClick={() => { setShowSymbolOptions(false); setSelectedValue(item); }}
                                            key={index}
                                        >{item}</span>
                                    ))}
                                </div> : null}

                        </div>
                        <div className="row align-center" style={{ marginLeft: "auto", marginRight: "25px" }}>
                            <img src="/assets/images/priceAlertLogo.png" className="currency_pic" />
                            <div className="col">
                                <span className="lg_stats">1.2238</span>
                                <span className="md_stats">+0.12%</span>
                                <span className="sm_stats"><img src="/assets/images/arrowUpGreen.png" style={{ marginRight: "10px" }} />0.100</span>
                            </div>
                        </div>
                    </div>
                </React.Fragment> : null}
            </div>
            {showChat === true ? <React.Fragment>
                <div className="tabs_wrapper">
                    <img src={tab === "headset" ? "/assets/images/headsetGreenSmall.png" : "/assets/images/headsetSmall.png"} className={tab === "headset" ? "chats_tab_active" : "chats_tab"} onClick={() => { setTab("headset"); }} style={{ width: "auto", height: "auto", padding: "6.25px" }} />

                    <span className={tab === "english" ? "chats_tab_active" : "chats_tab"} onClick={() => { setTab("english"); }} >
                        english
                </span>

                    <span className={tab === "russian" ? "chats_tab_active" : "chats_tab"} onClick={() => { setTab("russian"); }} >
                        russian
                </span>

                    <span className={tab === "chinese" ? "chats_tab_active" : "chats_tab"} onClick={() => { setTab("chinese"); }} >
                        chinese
                </span>
                </div>
                {
                    tab === "headset" ?
                        <ChatHeadset /> : null
                }
                {
                    tab != "headset" ?
                        <Inbox /> : null
                }
            </React.Fragment> : null}
            {showLive === true ? <React.Fragment>

                <Chart />
            </React.Fragment>
                : null}
        </div >
    );
};

export default Chat;
