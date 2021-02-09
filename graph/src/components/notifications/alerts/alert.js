import React, { useState } from "react";
import PrimaryButton from "../../buttons/primaryButton";
import "./alert.css";
import NewAlert from "./newAlert";


const AllAlert = (props) => {

    const [isNewAlert, setIsNewAlert] = useState(false);

    return (
        <div className="container">
            {isNewAlert === false ?
                <React.Fragment>
                    <div className="row alertHeader">
                        <img src="/assets/images/leftArrowWhite.png" />
                        <span className="alertTitle">alerts</span>
                    </div>
                    <table>
                        <thead>
                            <tr className="alertTableHeader">
                                <th className="heading">symbol</th>
                                <th className="heading">condition</th>
                                <th className="heading">price</th>
                                <th className="heading"></th>
                            </tr>
                        </thead>

                        <div className="vertical_line"></div>
                        <div className="vertical_line"></div>
                        <div className="vertical_line"></div>
                        <div className="vertical_line"></div>

                        <tbody>
                            <tr>
                                <td className="data">EURUSD</td>
                                <td className="data"><img src="/assets/images/greaterThanEqualTo.png" /></td>
                                <td className="data">1.2346</td>
                                <td className="data"> <img src="/assets/images/greenCross.png" /></td>
                            </tr>
                            <tr>
                                <td className="data">EURUSD</td>
                                <td className="data"><img src="/assets/images/lessThanEqualTo.png" /></td>
                                <td className="data">1.2346</td>
                                <td className="data"> <img src="/assets/images/greenCross.png" /></td>
                            </tr>
                            <tr>
                                <td className="data">EURUSD</td>
                                <td className="data"><img src="/assets/images/lessThanEqualTo.png" /></td>
                                <td className="data">1.2346</td>
                                <td className="data"> <img src="/assets/images/greenCross.png" /></td>
                            </tr>
                            <tr>
                                <td className="data">EURUSD</td>
                                <td className="data"><img src="/assets/images/lessThanEqualTo.png" /></td>
                                <td className="data">1.2346</td>
                                <td className="data"> <img src="/assets/images/greenCross.png" /></td>
                            </tr>

                        </tbody>
                    </table>
                    <div className="primaryBtnWrapper">
                        <PrimaryButton text="Add new price alert" handleOnClick={() => { setIsNewAlert(true); }} />
                    </div>

                    <span className="cancelAlerts">Cancel all alerts</span>
                </React.Fragment>
                : <NewAlert />}
        </div>
    );
};


export default AllAlert;