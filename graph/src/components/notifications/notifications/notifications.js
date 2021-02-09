import React from "react";
import "./notifications.css";
import Notification from "./notification";
const AllNotification = () => {
    return (
        <div>
            <div className="notifications">

                <Notification notification_title="New bet won" notificationType="trade" notification_time="20 minutes ago" notification_payout_amount="$27.5" iconName="greenTick" notfication_profit={true} />

                <div className="bottom_line"></div>

                <Notification notification_title="New bet won" notificationType="trade" notification_time="20 minutes ago" notification_payout_amount="-$27.5" iconName="redCross" notfication_profit={false} />

                <div className="bottom_line"></div>
                <Notification notification_title="Price alert" notificationType="notify" notification_time="20 minutes ago" iconName="notification" />
                <div className="bottom_line"></div>
                <Notification notification_title="Have you tried turbo rush?" notificationType="news" notification_time="20 minutes ago" iconName="exclamationSign" />
                <div className="bottom_line"></div>
                <Notification notification_title="Have you tried turbo rush?" notificationType="news" notification_time="20 minutes ago" iconName="exclamationSign" />
            </div>
            <span className="notificationDayTitlte">Yesterday</span>

            <div className="notifications">

                <Notification notification_title="New bet won" notificationType="trade" notification_time="20 minutes ago" notification_payout_amount="$27.5" iconName="greenTick" notfication_profit={true} />

                <div className="bottom_line"></div>

                <Notification notification_title="New bet won" notificationType="trade" notification_time="20 minutes ago" notification_payout_amount="-$27.5" iconName="redCross" notfication_profit={false} />

                <div className="bottom_line"></div>
                <Notification notification_title="Price alert" notificationType="notify" notification_time="20 minutes ago" iconName="notification" />
                <div className="bottom_line"></div>
                <Notification notification_title="Have you tried turbo rush?" notificationType="news" notification_time="20 minutes ago" iconName="exclamationSign" />
                <div className="bottom_line"></div>
                <Notification notification_title="Have you tried turbo rush?" notificationType="news" notification_time="20 minutes ago" iconName="exclamationSign" />
            </div>

            <span className="notificationDayTitlte">09.01.2021</span>
            <div className="notifications">

                <Notification notification_title="New bet won" notificationType="trade" notification_time="20 minutes ago" notification_payout_amount="$27.5" iconName="greenTick" notfication_profit={true} />

                <div className="bottom_line"></div>

                <Notification notification_title="New bet won" notificationType="trade" notification_time="20 minutes ago" notification_payout_amount="-$27.5" iconName="redCross" notfication_profit={false} />

                <div className="bottom_line"></div>
                <Notification notification_title="Price alert" notificationType="notify" notification_time="20 minutes ago" iconName="notification" />
                <div className="bottom_line"></div>
                <Notification notification_title="Have you tried turbo rush?" notificationType="news" notification_time="20 minutes ago" iconName="exclamationSign" />
                <div className="bottom_line"></div>
                <Notification notification_title="Have you tried turbo rush?" notificationType="news" notification_time="20 minutes ago" iconName="exclamationSign" />
            </div>

        </div>

    );
};

export default AllNotification;