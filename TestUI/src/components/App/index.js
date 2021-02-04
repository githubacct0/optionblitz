import React, { Component } from "react";
import "./App.scss";
import {
  HashRouter,
  Route,
  Link
} from 'react-router-dom';

import TronWeb from "tronweb";
import TronGrid from "trongrid";
import Home from '../Home';
import ContactPage from '../Contact';
import RequestPage from '../Request';
import AboutPage from '../About';
import WalletPage from '../Wallet';
import Nav from '../Nav';
import utils from "../../utils";
import tron from "../../utils/tron";

/////////////////////////////////////////////////////////////////
const FOUNDATION_ADDRESS = "TWiWt5SEDzaEqS6kE5gandWMNfxR2B5xzg";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      tronWeb: {
        installed: false,
        loggedIn: false
      }
    }

    this.loading= true;
    this.tick = this.tick.bind(this);
    this.intervalHandle = null;

  }
  async tick() { 
    console.log("Checking TronWeb connection:");  
    
    if ((!!window.tronWeb)&&(window.tronWeb.ready))
    {
      console.log("Logged in and Ready");
      utils.address = window.tronWeb.defaultAddress.base58;
      tron.tronWeb = window.tronWeb;
      //console.log(utils.address);

    
      const tronWebState = {
        installed: !!window.tronWeb,
        loggedIn: window.tronWeb && window.tronWeb.ready
      };
      this.setState({
          tronWeb: tronWebState
      });
      clearInterval(this.intervalHandle);

    }
  }
  async componentWillUnmount(){
    //console.log("unmounted");
    clearInterval(this.intervalHandle);
    
  }
  async componentDidMount() {
    
    this.intervalHandle = setInterval(this.tick, 200);
    return;

  }
  render() {
    return (
        <div>
          <Nav />
          <HashRouter>
              <div>
                <Route path="/" exact component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/wallet" component={WalletPage} />
                
                
              </div>
          </HashRouter >
        </div>
      );
  }
}

export default App;

