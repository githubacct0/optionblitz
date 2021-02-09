import React, { useState } from "react";
import "./home.css";
import Lottie from 'react-lottie'
import animationData from "./OPTIONBLITZ.json"
import PersonalInfo from "../../components/home/personalInfo/personalInfo";
import Balance from "../../components/home/yourBalance/balance";
import BlitzBalance from "../../components/home/yourBalance/blitzBonusBalance";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const Home = () => {

    // const [hideBullets, setHideBullets] = useState(true);
    const defaultOptions = {
        // container: document.getElementById('lottie'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData,


    }
    return (
        <div className="container">

            <Lottie options={defaultOptions}
                width={"100%"}
                height={300}
                style={
                    {
                        overflow: "visible"
                    }
                }
            />

            <h1 className="welcome_msg">Welcome to Option Blitz</h1>
            <PersonalInfo />
            <Balance />
            <BlitzBalance />

            <ul className="homeBullets">
                <li>Visit the <span className="boldTitle">Blitz Academy</span> to learn more about trading strategies and guides to using the trading systems.</li>
                <li>Need <span className="boldTitle">Help?</span> Press the icon <img src="/assets/images/helpIcon.png" style={{ marginTop: "auto", alignSelf: "center" }} /> or visit the chat module and talk to our 24/7 support</li>
                <li>Join our Telegram Group <span className="boldTitle">Here!</span></li>
            </ul>


            <Carousel showArrows={false} >
                <div>
                    <img src="/assets/images/offer_1.png" />

                </div>
                <div>
                    <img src="/assets/images/offer_2.png" />

                </div>
                <div>
                    <img src="/assets/images/offer_2.png" />

                </div>
            </Carousel>
        </div>
    )
};

export default Home;