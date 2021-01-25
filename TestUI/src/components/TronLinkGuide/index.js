import React, { Component } from 'react';
import './TronLinkGuide.scss';
import Utils from "../../utils";
class TronLinkGuide extends Component {

  constructor(props) {
    super(props);
    this.state = {
    };
    
  }
  render() {

    if (!this.props.tronwebReady)
      return (
        <div>
            <div className="row align-items-center justify-content-center">
              <div className="col-lg-8">
                <div className="about_us_text text-center">
                  <blockquote className="generic-blockquote"><p>Please use <b>TronLink/TronPay</b> in Chrome or <b>TronWallet</b> in mobile devices.</p></blockquote>   
                </div>
              </div>
            </div>   
          
        </div>
      );

      return(
        <div>
        </div>
      );

  }

}

export default TronLinkGuide;