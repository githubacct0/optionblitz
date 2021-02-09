import React, { useState, useEffect } from "react";
import "./navbar.css"
const Tabs = () => {
    const [tabs, setTabs] = useState([{ title: "BTC/USD", content: "Binary" }]);

    const handleDeleteTab = async (val) => {
        let tmpArr = tabs;
        tmpArr = await tmpArr.filter((item, index) => {
            return val != index
        });
        await setTabs(tmpArr);
    };

    const handleAddTab = async () => {
        let tmpArr = tabs;
        setTabs([...tabs, { title: "BTC/USD", content: "Binary" }]);

    }
    useEffect(() => {
        console.log(tabs)
    }, [tabs]);
    return (
        <div className="tabs">
            {tabs.map((item, index) => {
                return (
                    <div className="tabWrapper" key={index}>
                        <div className="tab">
                            <div className="currency_wrapper">
                                <img src="/assets/images/usd.png" className="usd" />
                                <img src="/assets/images/bitcoin.png" className="bitCoin" />
                            </div>
                            <div className="title_wrapper">
                                <span className="tab_title">{item.title}</span>
                                <span className="tab_content">{item.content}</span>
                            </div>
                        </div>
                        <div className="closeWrapper" onClick={() => { handleDeleteTab(index); }}>
                            <img src="/assets/images/close.png" style={{ margin: "auto" }} />
                        </div>
                    </div>
                );
            })}
            <div onClick={() => { handleAddTab(); }}>
                <img className="add_tab" src="/assets/images/addTab.png" />
            </div>
        </div>
    );
};
export default Tabs; 