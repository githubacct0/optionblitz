import React, { useState } from "react";
import PrimaryButton from "../../buttons/primaryButton";
import CheckBox from "../../checkbox/checkbox";
import SelectDropDown from "../../dropDowns/dropDown";
import TextInput from "../../textInput/textInput";
import PriceAlert from "./priceAlert";

const NewAlert = (props) => {
    const [showSymbolOptions, setShowSymbolOptions] = useState(false);
    const [alertNotificationType, setAlertNotificationType] = useState("higher");
    const [alertAmmount, setAlertAmmount] = useState(1.2346);
    const [isCreateAlert, setIsCreateAlert] = useState(false);
    return (
        <React.Fragment>
            {isCreateAlert === true ? <PriceAlert /> :
                <div className="newAlertContainer">
                    <div className="newAlertHeader">
                        <span className="newAlertTitle">Create price alert</span>
                        <img src="/assets/images/close.png" />
                    </div>

                    <SelectDropDown label="Select Symbol" selectedValue="EURUSD" options={["EURUSD", "EURUSD", "EURUSD", "EURUSD",]} />

                    <div className="currentPriceWrapper">
                        <span className="currentPriceLabel">Current price</span>
                        <span className="currentPrice">1.2346</span>
                    </div>

                    <div className="notificationWrapper">
                        <span className="notifyText">Notify me when price is :</span>
                        <div className="notificationsBtn">
                            <span className={alertNotificationType === "higher" ? "activeNotificationType" : "notificationType"}
                                onClick={() => { setAlertNotificationType("higher"); }}
                            >higher</span>
                            <span className={alertNotificationType === "lower" ? "activeNotificationType" : "notificationType"}
                                onClick={() => { setAlertNotificationType("lower"); }}
                            >lower</span>
                        </div>
                    </div>


                    <div className="notificationWrapper">
                        <span className="notifyText">or equal to </span>
                        <div className="equalBtns">
                            <img src="/assets/images/minusCircle.png" onClick={() => { setAlertAmmount(alertAmmount - 1); }} />
                            <span className="alertAmmount">{alertAmmount.toFixed(4)}</span>
                            <img src="/assets/images/plusCircle.png" onClick={() => { setAlertAmmount(alertAmmount + 1); }} />
                        </div>
                    </div>
                    <div className="alertCheckBoxWrapper">
                        <CheckBox label="Show Pop-up" handleChange={() => { }} />
                        <span className="label">Show Pop-up</span>
                    </div>
                    <div className="alertCheckBoxWrapper">
                        <CheckBox label="Show Pop-up" handleChange={() => { }} />
                        <span className="label">Notify Telegram</span>
                    </div>

                    <TextInput placeholder="comment" value="" onChange={() => { }} />
                    <div className="primaryBtnWrapper">
                        <PrimaryButton text="create alert" handleOnClick={() => { setIsCreateAlert(true); }} />
                    </div>

                </div>}
        </React.Fragment>
    );
};

export default NewAlert;