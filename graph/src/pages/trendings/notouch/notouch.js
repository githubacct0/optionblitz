import React, { useState } from "react";
import SelectDropDown from "../../../components/dropDowns/dropDown";
import "./notouch.css";
import Chart from "../../../components/chart/chart";
const NoTouch = () => {

    const [asset, setAsset] = useState("");

    const handleAsset = (val) => {
        setAsset(val);
    }
    return (
        <div className="container">

            <div className="chartWrapper container">
                <Chart />
            </div>

        </div>
    );
};

export default NoTouch;