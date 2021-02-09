import React from "react";
import "./notifications.css";
import AllNotification from "../../components/notifications/notifications/notifications";
import { Link } from "react-router-dom";
import Alert from "../alert/alert";
const Notifications = () => {
    return (
        <div className="container notificationContainer ">
            <div className="notifications_bg">
                <div className="row titleRow">
                    <div className="notificationsLogoWrapper">
                        <img src="/assets/images/activeNotifications.png" className="notificationLogo" />
                        <span className="title">Notifications</span>
                    </div>
                    <div className="dropdown">
                        <span className="menuItem">All<img src="/assets/images/downArrowActive.png" className="downArrow" /></span>
                    </div>
                </div>
                <Link to="/alerts" >
                    <button className="priceAlertBtn">
                        <img className="increasePrice" src="/assets/images/increaseTrend.png" />
                price alert</button>
                </Link>

                <span className="notificationDayTitlte">Today</span>
            </div>

            <AllNotification />
            <span className="showmore">Show more  <img src="/assets/images/rightArrowGreen.png" style={{ marginLeft: "5px" }} /></span>
            <div className="alert">
                <img src="/assets/images/helpIcon.png" />
                <p className="content">
                    Connect your Telegram account now to receive notifications. Visit:<br />
                    <span className="link">https://t.me/optionblitz_bot</span><br />
                     and follow the instructionss
                </p>
                <img src="/assets/images/close.png" />
            </div>


        </div>
    )
};

export default Notifications;