import React, { useState } from "react";
import CheckBox from "../checkbox/checkbox";
import "./styles.css";


const SelectDropDown = (props) => {

    const [showSymbolOptions, setShowSymbolOptions] = useState(false);
    const [selectedValue, setSelectedValue] = useState(props.selectedValue);
    const [options, setOptions] = useState(props.options);

    return (
        <div className="SelectWrapper">
            <div className="Select" onClick={() => { setShowSymbolOptions(!showSymbolOptions); }}>
                <div className="selectTitleWrapper" style={selectedValue != null ? null : { justifyContent: "center", }}>
                    {props.label ?
                        <span className="selectTitle" style={selectedValue != null ? null : { color: "#39967B", fontFamily: "Cabin" }} > {props.label}</span> : null}
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
    );
};

export default SelectDropDown;