import React from "react";
import "./news.css"
const SingleNews = ({ title, thumbnail, content, time }) => {
    return (
        <div className="news">
            <div className="news_header">
                <img src="/assets/images/news_avatar.png" className="news_avatar" />

                <div className="news_titleWrapper">
                    <span className="single_news_title">{title}</span>
                    <span className="news_time">{time}</span>
                </div>
            </div>
            <img src={"/assets/images/news_img.png"} />
            <div className="content_wrapper">
                <span className="news_content">{content}</span>
                <span className="news_read_more">read more</span>
            </div>

        </div>
    )
};

export default SingleNews;