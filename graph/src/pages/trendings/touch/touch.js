import React, { useState } from "react";
import SelectDropDown from "../../../components/dropDowns/dropDown";
import "./touch.css";
import TouchChart from "../../../components/chart/touchChart";
const Touch = () => {

    const [asset, setAsset] = useState("");

    const handleAsset = (val) => {
        setAsset(val);
    }
    return (
        <div className="container">

            <div className="chartWrapper container">
                <TouchChart />
            </div>

        </div>
    );
};

export default Touch;