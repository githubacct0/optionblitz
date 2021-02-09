import React, { useState } from "react";
import "./personalInfo.css";

const PersonalInfo = (props) => {

    const [showDropDown, setShowDropDown] = useState(false);

    const handleDropDown = (val) => {
        setShowDropDown(val);
        console.log("value_10", showDropDown)
       
    }

    return (
        <div className="personalInfo">
            <div className="profilePic">
                <div className="picWrapper">
                    <img src="/assets/images/profilePic.png" className="pic" />
                    <div className="editWrapper">
                        <img src="/assets/images/edit.png" className="edit" />
                    </div>
                </div>
                <div className="levelWrapper">
                    <span className="level_label">Level 1</span>
                    <img src="/assets/images/medal.png" className="medal" />
                </div>
            </div>
            <div className="verticalLine"></div>
            <div className="profileDetails">
                <div className="detailsWrapper">
                    <span className="label">country</span>
                    <div className="selectWrapper">
                        <div className="select" onClick={() => { handleDropDown(!showDropDown); }}>
                            <img src="/assets/images/usa.png" />
                            <img src="/assets/svgs/downArrow.svg" />
                        </div>
                        {showDropDown === true ?
                            <div className="countries">
                                <div className="country" onClick={() => { handleDropDown(false); }}>
                                    <img src="/assets/images/usa.png" />
                                    <span>us</span>
                                </div>
                                <div className="country" onClick={() => { handleDropDown(false); }}>
                                    <img src="/assets/images/usa.png" />
                                    <span>us</span>
                                </div>
                                <div className="country" onClick={() => { handleDropDown(false); }}>
                                    <img src="/assets/images/usa.png" />
                                    <span>us</span>
                                </div>
                            </div> : null}
                    </div>
                </div>
                <div className="detailsWrapper">
                    <span className="label">username</span>
                    <span className="value">Kamix85</span>
                </div>
                <div className="detailsWrapper">
                    <span className="label">last login</span>
                    <span className="value">2020-12-26 17:15</span>
                </div>
                <div className="detailsWrapper">
                    <span className="label">current date</span>
                    <span className="value">2020-12-29 17:40</span>
                </div>
            </div>
        </div>
    );
};

export default PersonalInfo;