import React from "react";

const Notification = (props) => {
    return (
        <div className="notification">
            <div className="row">
                <div className="iconWrapper">
                    <img src={"/assets/images/" + props.iconName + ".png"} />
                </div>
                <div className="col notification_col_wrapper">
                    <div className="row">
                        <span className="notification_title">{props.notification_title}</span>
                        {props.notificationType == "trade" ? <span className="notification_action">view</span> : null}
                    </div>
                    {props.notificationType == "trade" ?
                        <span className="notification_content">Trade Amount:<span className="notification_content_amount">$75</span></span> : null}
                    {props.notificationType == "notify" ?
                        <span className="notification_content">EUR/USD is up <span className="green_content">+ 10.06% <br /></span>to <span className="green_content">1.3456</span> in the last 2 hours.</span>
                        : null}

                    {props.notificationType == "news" ?
                        <span className="notification_content">Option Bliz most popular trading product</span>
                        : null}
                </div>
            </div>
            <div className="col notification_col_wrapper">
                <span className="notification_time">{props.notification_time}</span>
                {props.notificationType == "trade" ? <span className="notification_payout">Payout:<span className={props.notificationType == "trade" && props.notfication_profit == true ? "notification_payout_amount_green" : "notification_payout_amount_red"}>{props.notification_payout_amount}</span></span> : null}
            </div>
        </div>
    );
};

export default Notification;