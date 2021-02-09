import React from "react";
import "./hotAssets.css";

const HotAssetsSmall = ({ price, imageName, priceChange, symbol, handleOnClick }) => {

    return (
        <div className="hotAssetsSmallWrapper" onClick={handleOnClick}>
            <img className="expand" src="/assets/images/expand.png" />

            <span className="hotAssetsPrice">{price}</span>
            <div className={symbol == "eth" ? "ethSMBGLine" : symbol == "xau" ? "xauSMBGLine" : symbol == "wti" ? "wtiSMBGLine" : symbol == "xag" ? "xagSMBGLine" : null}></div>
            <div className={symbol == "eth" ? "ethSMBG" : symbol == "xau" ? "xauSMBG" : symbol == "wti" ? "wtiSMBG" : symbol == "xag" ? "xagSMBG" : null}>
                <img src={"/assets/images/" + imageName} className="hotAssetLogo" />
                <div className="col align-center priceSymbolWrapper">
                    <span className="hotAssetPriceChange">{priceChange}</span>
                    <span className="hotAssetSymbol">{symbol}</span>
                </div>
            </div>
        </div>
    );
};
export default HotAssetsSmall; 