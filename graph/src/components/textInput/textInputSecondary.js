import React from "react";
import "./textInput.css";
const TextInputSecondary = ({ iconName, placeHolder }) => {

    return (
        <div className="textInputWrapper secondaryInputWrapper">
            <img src={"/assets/images/" + iconName + ".png"} />
            <input type="text" className="secondaryInput" placeholder={placeHolder} />
        </div>
    )
};

export default TextInputSecondary;    