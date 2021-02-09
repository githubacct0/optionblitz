import React, { useState } from "react";
import SelectDropDown from "../../components/dropDowns/dropDown";
import HotAssetsSmall from "../../components/hotAssets/hotAssetsSmall";
import "./trendings.css";
import Chart from "../../components/chart/chart";
const Trendings = () => {

    const [asset, setAsset] = useState("");

    const handleAsset = (val) => {
        setAsset(val);
    }
    return (
        <div className="container">

            <div className="chartWrapper container">
                <Chart />
            </div>

            <div className={asset != "" ? "smAssetsWrapper" : "smAssetsWrapper"}>
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

export default Trendings;