import React, { useEffect, useState } from "react";
import TrendingOption from "../../components/TrendingOption/trendingOption";
import "./trendings.css";

const Trendings = () => {
    const [trending, setTrending] = useState("");

    const handleTrending = (val) => {
        setTrending(val);
    }
    return (
        <div className="container">
            <div className="trendingOptions">
                <TrendingOption title="Binary Options" link="/trending/binary" imageName="ethSM.png" text="Speculate up/down price movements across a range of assets." number="2" onClick={() => { handleTrending('binary'); }}/>
                <TrendingOption title="Touch Options" link="/trending/touch" imageName="ethSM.png" text="Select target price, expiration and if the barrier is broken receive payout." number="2" onClick={() => { handleTrending('touch'); }}/>
                <TrendingOption title="No-Touch Options" link="/trending/notouch" imageName="ethSM.png" text="Price must not break through barrier or range during trade team." number="2" onClick={() => { handleTrending('notouch'); }}/>
            </div>
        </div>
    );
};

export default Trendings;