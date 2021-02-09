import React from "react";
import { Link } from "react-router-dom";
import "./trendingOption.css";

const TrendingOption = ({ title, link, imageName, text, number }) => {

    return (
        <Link to={link} className="trendingOptionWrapper">
            <img src={"/assets/images/" + imageName} className="optionLogo" />
            <div className="content">
                <div className="trendingTitle">{title}</div>
                <div className="trendingDesc">{text}</div>
            </div>
            <div className="trendingNo">{number}</div>
            
        </Link>
    );
};
export default TrendingOption; 