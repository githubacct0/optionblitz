import React from "react";
import PrimaryButton from "../buttons/primaryButton";
import "./trades.css"
const ActiveTabSection = ({ tabBtn }) => {
    return (
        <div className="tab_section">
            <div className="tab_header">
                <div className="title_wrapper">
                    <span className="tab_section_title">{tabBtn === "binary" ? "BTC/USD" : tabBtn === "touch" ? "EUR/USD" : "ETH"}</span>
                    {tabBtn != "binary" && tabBtn != "touch" ? <div className="tab_header_logo_wrapper">
                        <img src="/assets/images/ethereum.png" className="first_logo" />
                    </div>

                        : (
                            <div className="tab_header_logo_wrapper">
                                <img src="/assets/images/usd.png" className="first_logo" />
                                <img src="/assets/images/bitcoin.png" className="second_logo" />

                            </div>


                        )}
                </div>
                <span className="tab_date_time">20-12-26 17:15:45</span>
            </div>
            <div className="tab_section_content_row">

                <div className="row_item">
                    <span className="row_item_title">
                        investment
                    </span>
                    <span className="row_item_content">
                        $100
                    </span>
                </div>
                <div className="tab_content_border"></div>

                {tabBtn === "turbo rush" ? null :
                    tabBtn === "rush" ?
                        <div className="row_item" >
                            <span className="row_item_title" style={{ display: "block", margin: "auto" }} >
                                direction
                                 </span>
                            <span className="row_item_content" style={{ display: "block", margin: "auto" }}>
                                up  <img src="/assets/images/arrowUpGreen.png" className="row_item_img" />
                            </span>
                        </div>
                        :
                        <div className="row_item" >
                            <span className="row_item_title" style={{ display: "block", margin: "auto" }}>
                                type
                              </span>
                            <span className="row_item_content" style={{ display: "block", margin: "auto", whiteSpace: "nowrap" }}>
                                {tabBtn === "touch" ? "double-touch" : "call"}  <img src="/assets/images/arrowUpGreen.png" className="row_item_img" />
                            </span>
                        </div>
                }
                {tabBtn === "turbo rush" ? null : <div className="tab_content_border"></div>}
                <div className="row_item">
                    <span className="row_item_title">
                        time to expire
                    </span>
                    <span className="row_item_content">
                        58:23
                    </span>
                </div>
            </div>
            <div className="tab_content_border_bottom"></div>
            <div className="tab_section_content_row">

                <div className="row_item">
                    <span className="row_item_title">
                        status
                    </span>
                    <span className="row_item_content" style={tabBtn === "turbo rush" ? { color: "red" } : null}>
                        {tabBtn === "turbo rush" ? "otm" : "itm"}
                    </span>
                </div>
                <div className="tab_content_border"></div>
                <div className="row_item">
                    <span className="row_item_title">
                        profit/loss
                    </span>
                    <span className="row_item_content" style={tabBtn === "turbo rush" ? { color: "red" } : null}>
                        {tabBtn === "turbo rush" ? "-100$" : "+75$"}
                    </span>
                </div>
            </div>
            <div className="tab_section_btn_wrapper">
                <PrimaryButton handleOnClick={() => { }} text="view" />
            </div>
        </div >
    );
};;

export default ActiveTabSection;