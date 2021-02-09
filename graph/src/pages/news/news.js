import React from "react";
import SelectDropDown from "../../components/dropDowns/dropDown";
import SingleNews from "../../components/news/news";
import "./news.css"
const News = () => {
    return (
        <div className="container">
            <div className="news_bg">
                <div className="row align-center">
                    <img src="/assets/images/newsGreen.png" />
                    <span className="news_title">news</span>
                </div>
                <SelectDropDown label="All Instruments" options={["hello", "hello"]} />
            </div>
            <div className="news_wrapper">
                <SingleNews title="Forbs" time="34 minute ago" content={`Second-Richest Man in Mexico Says That Bitcoin Is His 'Best Investment Ever`} time={"34 minute ago"} />

                <SingleNews title="Forbs" time="34 minute ago" content={`Second-Richest Man in Mexico Says That Bitcoin Is His 'Best Investment Ever`} time={"34 minute ago"} />
            </div>
        </div>
    );
};

export default News;