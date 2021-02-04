///////////////////////////////////////////////////////////////
import React, { Component } from "react";
import TronLinkGuide from "../TronLinkGuide";
import utils from "../../utils";
import tron from "../../utils/tron";
import staking from "../../utils/staking";
import $ from 'jquery';
import SweetAlert from "react-bootstrap-sweetalert";

export default class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popup: null,
      USDT_balance:0,
      ingameUSDT_balance:0,
      message:''
    };
    this.tick = this.tick.bind(this);
    this.intervalHandle = null;
    this.loaded = false;
    
  }
  async tick() { 
    //console.log(tron.tronWeb,utils.address);
    if  (!this.loaded){
      if (utils.address != '' && !!tron.tronWeb){
        this.setState({
          ingameUSDT_balance: await staking.getUSDTBalance(utils.address),
          USDT_balance:await tron.getUSDTBalance(utils.address),
        },this.forceUpdate());
        this.loaded = true;
      }
        
    }
    

    
  }
  async onDeposit(value) {
    if (!tron.tronWeb){
        this.setState({message:"Please wait for system to finish loading and try again"});
        return;
    }
    //TODO check TRX balance
    if (this.state.TRX_balance<=10){
      alert('Your TRX balance is low, you might not have enough TRX to pay for transaction fee');
    }
    this.hideModal();
    this.setState({message:"Approving contract to spend " + value + " USDT ..."});
    let res = await tron.Approve(staking.STAKING_Address,parseInt(value*1000000),tron.USDT_Address);
    if (!res){
      this.setState({message:"Something wrong with your request, please retry!"});
      return;
    }
    this.setState({message:"Deposit..."});
    res = await staking.depositUSDT(parseInt(value*1000000));
    if (!res){
      this.setState({message:"Something wrong with your request, please retry!"});
      return;
    }
    this.setState({message:"Thank you!!!"});
    this.loaded = false;

  }
  deposit() {

        this.setState({
            popup: <SweetAlert style={{ color: 'black' }}
                input
                showCancel
                title='Enter your amount to deposit'
                inputType='number'
                onConfirm={(response) => this.onDeposit(response)}
                onCancel={this.hideModal}
            />
        });

  }
  async onWithdraw(value) {
    if (!tron.tronWeb){
        this.setState({message:"Please wait for system to finish loading and try again"});
        return;
    }
    //TODO check TRX balance
    if (this.state.TRX_balance<=10){
      alert('Your TRX balance is low, you might not have enough TRX to pay for transaction fee');
    }
    this.hideModal();
    this.setState({message:"Withdraw..."});
    let res = await staking.withdrawUSDT(parseInt(value*1000000));
    if (!res){
      this.setState({message:"Something wrong with your request, please retry!"});
      return;
    }
    this.setState({message:"Thank you!!!"});
    this.loaded = false;

  }
  withdraw() {

        this.setState({
            popup: <SweetAlert style={{ color: 'black' }}
                input
                showCancel
                title='Enter your amount to withdraw'
                inputType='number'
                onConfirm={(response) => this.onWithdraw(response)}
                onCancel={this.hideModal}
            />
        });

  }
  async componentWillUnmount(){
    //console.log("unmounted");
    clearInterval(this.intervalHandle);
    
  }
  async componentDidMount() {
    this.tick();
    this.intervalHandle = setInterval(this.tick, 3000);
    return;

  }
  hideModal = () => {
        this.setState({ popup: null });
    };

  render() {
    let { popup } = this.state;
    return (
      <div>
          {popup}
          
          <section className="site-section bg-light" id="contact-section">
            <div className="container" style={{marginTop:"50px"}}>
              <div className="row mb-5">
                <div className="col-12 text-center">
                  <h3 className="section-sub-title">TEST OPTION</h3>
                  
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-5">
                  <form action="#" className="p-5 bg-white">
                    <div className="row form-group">
                      <div className="col-md-12">
                        
                        <label className="text-black" for="subject">Your USDT Balance</label> <br/>
                        {this.state.USDT_balance} USDT 
                      </div>
                      <div className="col-md-12">
                        
                        <label className="text-black" for="subject">Your in-game USDT Balance</label> <br/>
                        {this.state.ingameUSDT_balance} USDT 
                      </div>
                      <div className="col-md-12" style={{marginTop:"3px"}}>
                        
                          <a href={void(0)} className="btn btn-primary" onClick={()=>this.deposit()}>DEPOSIT</a>
                          <a href={void(0)} className="btn btn-primary" onClick={()=>this.withdraw()}>WITHDRAW</a>
                        
                      </div>
                    </div>

                    <p id="message">{this.state.message}</p>
                  </form>
                </div>
              </div>
              
            </div>

        </section>          
      </div>

    );
  }
}

