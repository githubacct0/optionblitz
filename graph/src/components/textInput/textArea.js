import React from "react";
import "./textInput.css";

const TextAreaInput = ({ placeholder, onChange, value }) => {
    return (
        <div className="textInputWrapper textAreaInputWrapper">
            <textarea type="text" placeholder={placeholder} rows={5} />
        </div>
    );
};

export default TextAreaInput;