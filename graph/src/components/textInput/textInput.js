import React from "react";
import "./textInput.css";

const TextInput = ({ placeholder, onChange, value }) => {
    return (
        <div className="textInputWrapper">
            <input type="text" placeholder={placeholder} onChange={onChange} value={value} />
        </div>
    );
};

export default TextInput;