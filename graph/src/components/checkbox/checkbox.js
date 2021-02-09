import React, { useState } from "react";
import "./checkbox.css"
const CheckBox = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <div className="checkBoxWrapper" onClick={() => { setIsChecked(!isChecked); }}>

            {isChecked === true ? <img src="/assets/images/greenTickCheckBox.png" /> : null}
        </div>
    );
}

export default CheckBox; 