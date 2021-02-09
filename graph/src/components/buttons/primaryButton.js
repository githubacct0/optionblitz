import React from "react";
import "./styles.css"
const PrimaryButton = (props) => {
    return (

        <button className="primaryButton" onClick={props.handleOnClick}>{props.text}</button>
    );
};

export default PrimaryButton;