import React, { useContext, useState } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import Tabs from "./tabs";
import { AuthContext } from "../../contexts/authContext";
import Login from "../login/login";
import NewAccount from "../newAccount/newAccount";
import WalletConnected from "../walletConnected/walletConnected";
import Warning from "../warning/warning";
const Navbar = (props) => {

    const location = useLocation();

    const authContext = useContext(AuthContext);
    const [showLogin, setShowLogin] = useState(false);
    const [showNewAccount, setShowNewAccount] = useState(false);
    const [showWalletConnected, setShowWalletConnected] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    return (
        <div className="col navbarWrapper">
            <div className={location.pathname != "/trade" ? "navbar bottom_line" : "navbar"}>
                <Link to="/"  >
                    <img src={location.pathname == "/" ? "/assets/images/activeHome.png" : "/assets/images/home.png"} />
                </Link>
                <Link to="/notifications"  >
                    <img src={location.pathname == "/notifications" ? "/assets/images/activeNotification.png" : "/assets/images/notificationNav.png"} />
                </Link>
                <Link to="/hot-assets" >
                    <img src={location.pathname == "/hot-assets" ? "/assets/images/activeHotAssets.png" : "/assets/images/hotAssets.png"} />
                </Link>
                <Link to="/news"  >
                    <img src={location.pathname == "/news" ? "/assets/images/activeNews.png" : "/assets/images/news.png"} />
                </Link>

                <Link to="/trades"  >
                    <img src={location.pathname == "/trades" ? "/assets/images/activeTrades.png" : "/assets/images/trades.png"} />
                </Link>
                <Link to="/chat" >
                    <div className="chatWrapper">
                        {/* <div className="chatNotification"></div> */}
                        <img src={location.pathname == "/chat" ? "/assets/images/activeChat.png" : "/assets/images/chat.png"} />
                    </div>
                </Link>
                {authContext.isAuth === true ?
                    <div className="profile_nav">
                        <div className="profileWrapper">
                            <img src="/assets/svgs/profile.svg" />
                        </div>
                        <div className="currencyWrapper">
                            <span className="ammount">0</span>
                            <span className="currency">USDT</span>
                        </div>
                        <img src="/assets/svgs/downArrow.svg" style={{ alignSelf: "center", marginLeft: "10px" }} />
                    </div> : <button className="navbar_login_btn" onClick={() => { setShowLogin(true); }}>login</button>
                }

            </div>
            {location.pathname != "/trades" && location.pathname.indexOf("trending") <0 ?
                <Link to="/trendings" >
                    <div className="row homeStarttraddingWrapper">
                        <img src={"/assets/svgs/plus.svg"} className="plus" />
                        <span className="startTradding">CLick here to start trading</span>
                    </div> </Link> : <Tabs />
            }
            {showLogin === true ? <Login handleWalletConnect={() => { setShowLogin(false); setShowWalletConnected(true); }} handleClose={() => { setShowLogin(false); }}
                handleSkip={() => { setShowLogin(false); setShowWarning(true); }}
                handleCreateAccount={async () => {
                    setShowLogin(false); setShowNewAccount(true);
                }} /> : null}
            {showNewAccount === true ? <NewAccount handleClose={() => { setShowNewAccount(false); }}
                handleBack={() => { setShowNewAccount(false); setShowLogin(true); }}
            /> : null}

            {showWarning === true ? <Warning handleClose={() => { setShowWarning(false); }} /> : null}
            {showWalletConnected === true ? <WalletConnected handleClose={() => { setShowWalletConnected(false) }} /> : null}
        </div>
    );
};

export default Navbar;