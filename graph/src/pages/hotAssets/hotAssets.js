import React, { useState } from "react";
import SelectDropDown from "../../components/dropDowns/dropDown";
import HotAssetsSmall from "../../components/hotAssets/hotAssetsSmall";
import "./hotAssets.css";
import Chart from "../../components/chart/chart";
const HotAssets = () => {

    const [asset, setAsset] = useState("");

    const handleAsset = (val) => {
        setAsset(val);
    }
    return (
        <div className="container">
            <div className="assets_bg">

                <div className="row align-center space-between">
                    <div className="row align-center space-around">
                        <img src="/assets/images/hotAssetsGreen.png" style={{ marginRight: "10px" }} />
                        <span className="hotAssetsTitle txt_white">Hot Assets</span>
                    </div>
                    <div className="row align-center space-around">
                        <img src="/assets/images/thumbnails.png" />
                        <div className="hamBurger">
                            <div className="hamBurgerLine"></div>
                            <div className="hamBurgerLine"></div>
                            <div className="hamBurgerLine"></div>
                        </div>
                    </div>
                </div>

                <div style={{ margin: "25px 0px" }}>
                    <SelectDropDown label="sort by" options={["Most Traded", "Most Traded", "Most Traded", "Most Traded"]} selectedValue="Most Traded" />
                </div>
                <div style={{ margin: "25px 0px" }}>
                    <SelectDropDown options={["Most Traded", "Most Traded", "Most Traded", "Most Traded"]} label="All Assets" />
                </div>

            </div>

            {asset != "" ? <div className="chartWrapper margin_minus container">
                <div className="chart_header">
                    <div className="currency_wrapper">
                        <img src="/assets/images/usd.png" className="usd" />
                        <img src="/assets/images/bitcoin.png" className="bitCoin" />
                    </div>
                    <div className="chart_title_wrapper">
                        <div className="row align-center">
                            <span className="title_txt">Bitcoin Price</span>
                            <div>
                                <img src="/assets/images/halfArrowUpGreen.png" />
                                <span className="chart_title_stats">1.00%</span>
                            </div>
                            <div>
                                <img src="/assets/images/arrowUpGreen.png" />
                                <span className="chart_title_stats">100</span>
                            </div>
                        </div>
                        <div className="row align-center">
                            <span className="chart_sub_text">0:700 H:8000 L;5000 C:9000</span>
                        </div>
                    </div>
                    <div>
                        <SelectDropDown options={["10 minutes", "20 minutes", "30 minutes", "40 minutes", "50 minutes"]} selectedValue="10 minutes" />
                    </div>
                    <img src="/assets/images/close.png" onClick={() => { setAsset("") }} />
                </div>
                <Chart />
            </div> : null}

            <div className={asset != "" ? "smAssetsWrapper" : "smAssetsWrapper margin_minus"}>
                <HotAssetsSmall price="$100" imageName="ethSM.png" priceChange="+9.06" symbol="eth" handleOnClick={() => { setAsset("eth"); }} />
                <HotAssetsSmall price="$100" imageName="xauSM.png" priceChange="+6.08" symbol="xau" handleOnClick={() => { setAsset("xau"); }} />
                <HotAssetsSmall price="$100" imageName="wtiSM.png" priceChange="+4.34" symbol="wti" handleOnClick={() => { setAsset("wti"); }} />
                <HotAssetsSmall price="$100" imageName="xagSM.png" priceChange="+3.63" symbol="xag" handleOnClick={() => { setAsset("xag"); }} />

                <HotAssetsSmall price="$100" imageName="ethSM.png" priceChange="+9.06" symbol="eth" handleOnClick={() => { setAsset("eth"); }} />
                <HotAssetsSmall price="$100" imageName="xauSM.png" priceChange="+6.08" symbol="xau" handleOnClick={() => { setAsset("xau"); }} />
            </div>
        </div>
    );
};

export default HotAssets;