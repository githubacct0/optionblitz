///////////////////////////////////////////////////////////////
import React, { Component } from "react";
import "./Home.scss";
import TronLinkGuide from "../TronLinkGuide";
import utils from "../../utils";
import tron from "../../utils/tron";
import option from "../../utils/option";
import price from "../../utils/price";
import staking from "../../utils/staking";
import $ from 'jquery';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      USDT_balance:0,
      TRX_balance:0,
      message:'',
      BTCUSD:0,
      BTCUSDpair:null,
      trans:[],
      ingameUSDT_balance:0,
    };
    this.tick = this.tick.bind(this);
    this.intervalHandle = null;
    this.loaded = false;
    this.duration = 10;
    this.bet = 0;
    this.delay = 0;

  }
  async tick() { 
    //console.log(tron.tronWeb,utils.address);
    if  (!this.loaded){
      if (utils.address != '' && !!tron.tronWeb){
        this.setState({
          USDT_balance:await tron.getUSDTBalance(utils.address),
          TRX_balance: await tron.getTRXBalance(utils.address),
          BTCUSDpair: await option.pairs(1),
          ingameUSDT_balance: await staking.getUSDTBalance(utils.address),
        },this.forceUpdate());
        this.getTransactions();
        this.loaded = true;
      }
        
    }
    this.setState({
      BTCUSD:await price.getBTCUSD()
    });

    this.getTransactions();


    
  }
  async getTransactions(){
    if (!tron.tronWeb) return;
    var Trans = [];

    var options = {size:20,eventName:"newBet"}; 
    await tron.tronWeb.getEventResult(option.OPTION_Address,options).then(result => {
        $.each(result, function (key, value) {
                Trans.push(value);
            });
    });
    options = {size:20,eventName:"betClosed"}; 
    await tron.tronWeb.getEventResult(option.OPTION_Address,options).then(result => {
        $.each(result, function (key, value) {
                Trans.push(value);
            });
    });
    options = {size:20,eventName:"betCancelled"}; 
    await tron.tronWeb.getEventResult(option.OPTION_Address,options).then(result => {
        $.each(result, function (key, value) {
                Trans.push(value);
            });
    });
    if (Trans.length > 0)
      Trans.sort(function (a, b) {
        return b.timestamp - a.timestamp;
      });
    console.log(Trans);
    this.setState({trans:Trans},this.forceUpdate());
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
  async callput(_pairID,_type){
    if (!tron.tronWeb){
        this.setState({message:"Please wait for system to finish loading and try again"});
        return;
    }
    if (this.bet > this.state.ingameUSDT_balance){
        this.setState({message:"You dont have enough USDT"});
        return;
    }
    //TODO check TRX balance
    if (this.state.TRX_balance<=10){
      alert('Your TRX balance is low, you might not have enough TRX to pay for transaction fee');
    }
    let currentRound = await option.latestRound();

    this.setState({message:"Requesting latest Price from Oracle Contract ..."});
    let res = await option.requestPriceUpdate(_pairID);
    if (!res){
      this.setState({message:"Something wrong with your request, please retry!"});
      return;
    }

    this.setState({message:"Requesting latest Price from Oracle Contract ..."});
    res = await option.getLatestPrice(_pairID);
    if (!res){
      this.setState({message:"Something wrong with your request, please retry!"});
      return;
    }

    let newRound = await option.latestRound();
    let timeout = 0;
    while (currentRound != newRound){
        newRound = await option.latestRound();
        await utils.delay(100)
        timeout++;
        if (timeout > 50){
            this.setState({message:"Something wrong with your request, please retry!"});
            return;
        }
    }
    this.setState({message:"Placing CALL bet at " + res + " for " + this.duration + " seconds ..."});
    
    //_amount, _pair_id, _duration, _betType
    res = await option.addBet(parseInt(this.bet*1000000),_pairID,this.duration,_type);
    if (!res){
      this.setState({message:"Something wrong with your request, please retry!"});
      return;
    }
    this.setState({message:"Your bet request has been sent successfully!"});
    this.loaded = false;
  }
  selectDuration(){
    var e = document.getElementById("duration");
    var duration = e.value;
    //console.log(duration);
    this.duration = duration;
  }
  updateBet(props){
    //console.log(parseFloat(props.target.value));
    this.bet = parseFloat(props.target.value);
  }
  render() {
   
    return (
      <div>
          
          <section className="site-section bg-light" id="contact-section">
            <div className="container" style={{marginTop:"50px"}}>
              <div className="row mb-5">
                <div className="col-12 text-center">
                  <h3 className="section-sub-title">TEST OPTION</h3>
                  
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 mb-5">
                  <form action="#" className="p-5 bg-white">
                    <div className="row form-group">
                      
                      <div className="col-md-12">
                        
                        <label className="text-black" for="subject">BTC-USD Oracle:</label> <br/>
                        <a href={tron.tronScanContract + utils.address} target="_blank">{option.BTC_USD_AggregatorAddress}</a><br/>
                        <label className="text-black" for="subject">Option Contract:</label> <br/>
                        <a href={tron.tronScanContract + utils.address} target="_blank">{option.OPTION_Address}</a><br/>
                        
                        <label className="text-black" for="subject">Your Address:</label> <br/>
                        <a href={tron.tronScanAddress + utils.address} target="_blank">{utils.address}</a><br/>
                        
                        <label className="text-black" for="subject">Your Balance:</label> <br/>
                        {this.state.USDT_balance} USDT <br/>
                        {this.state.TRX_balance} TRX <br/>
                        <label className="text-black" for="subject">Your in-game Balance:</label> <br/>
                        {this.state.ingameUSDT_balance} USDT
                      </div>

                    </div>

                    <p id="topup_message"></p>
                  </form>
                </div>
                <div className="col-md-6 mb-5">
                  <form action="#" className="p-5 bg-white">
                    <div className="row form-group">
                      
                      <div className="col-md-12">
                        <label className="text-black" for="subject">BTC-USDT Pair: <strong>{this.state.BTCUSD}</strong></label> <br/>
                      </div>
                      <div className="col-md-12">
                        <label className="text-black" for="subject">Duration: </label> <br/>
                        <select name="duration" id="duration" onChange={()=>this.selectDuration()}>
                          <option value="10">10 seconds</option>
                          <option value="20">20 seconds</option>
                          <option value="30">30 seconds</option>
                          <option value="40">40 seconds</option>
                          <option value="50">50 seconds</option>
                          <option value="60">60 seconds</option>
                        </select>
                      </div>
                      <div className="col-md-12">
                        <label className="text-black" for="subject">Bet Amount in USDT:</label> <br/>
                        <input type="number" className="form-control" onChange={(e)=>this.updateBet(e)}/>
                      </div>
                      <div className="col-md-12">
                        <label className="text-black" for="subject">Winning Factor: {this.state.BTCUSDpair ? parseFloat(this.state.BTCUSDpair.winningFactor._hex/1000) : 0}</label> <br/>
                        
                      </div>
                      <div className="col-md-12">
                        <label className="text-black" for="subject">Win: {this.state.BTCUSDpair ? parseFloat(this.state.BTCUSDpair.winningFactor._hex/1000) * this.bet : 0}</label> <br/>
                        
                      </div>
                      
                       <div className="col-md-12" style={{marginTop:"3px"}}>
                        
                          <a href={void(0)} className="btn btn-primary" onClick={()=>this.callput(1,0)}>CALL</a>
                          <a href={void(0)} className="btn btn-primary" onClick={()=>this.callput(1,1)}>PUT</a>
                        
                      </div>
                      <div className="col-md-12">
                        {this.state.message}
                      </div>
                    </div>

                    <p id="claimtoken_message"></p>
                  </form>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mb-5">
                  <form action="#" className="p-5 bg-white">
                      <div className="col-md-12">
                        <label className="text-black" for="subject">Transactions History:</label> <br/>
                      </div>
                      <div className="col-md-12">
                        <table className="custom-table">
                            <tbody><tr>
                              <th>Event Name</th>
                              <th>Bet ID</th>
                              <th>User</th>
                              <th>Transaction ID</th>
                              <th>Pair</th>
                              <th>Time</th>
                              <th>Amount</th>
                              <th>Duration</th>
                              <th>Round ID</th>
                              <th>Open Price</th>
                              <th>Close Price</th>
                              <th>Type</th>
                              
                            </tr>
                            </tbody>
                            <tbody className="">
                              <p>{this.state.trans.length == 0 ? "Loading..." : null}</p>
                              {this.state.trans.map((tran, index) => (
                                <tr key={index}>
                                  <td>{tran.name}</td>
                                  <td>{tran.result._bet_id} </td>
                                  { tran.name == 'newBet' ?
                                    <td><a href={tron.tronScanAddress + tron.tronWeb.address.fromHex(tran.result._caller)} target="_blank">{utils.truncateStr(tron.tronWeb.address.fromHex(tran.result._caller), 5)}</a></td>
                                    :
                                    <td></td>
                                  }
              
                                  <td><a href={tron.tronScanTransaction + tran.transaction} target="_blank">{utils.truncateStr(tran.transaction, 5)}</a></td>
                                  { tran.name == 'newBet' ?
                                    <td>BTC-USD</td>
                                    :
                                    <td></td>
                                  }
                                  <td>{utils.convertTimeStamp(tran.timestamp)}</td>
                                  { tran.name == 'newBet' ?
                                    <td>{tran.result._amount/1000000} USDT</td>
                                    :
                                    tran.name == 'betClosed' ?
                                    <td>{tran.result.wonAmount/1000000} USDT</td>
                                    :
                                    <td></td>
                                  }
                                  { tran.name == 'newBet' ?
                                    <td>{tran.result._duration} seconds</td>
                                    :
                                    <td></td>
                                  }
                                  { tran.name == 'newBet' || tran.name == 'betClosed' ?
                                    <td><a href={tron.tronScanContract + option.BTC_USD_AggregatorAddress + '/code'} target="_blank" >{tran.result._roundID}</a></td>
                                    :
                                    <td></td>
                                  }
                                  { tran.name == 'newBet' || tran.name == 'betClosed' ?
                                    <td>{tran.result._openPrice/1000000}</td>
                                    :
                                    <td></td>
                                  }
                                  { 
                                    tran.name == 'betClosed' ?
                                    <td>{tran.result._closedPrice/1000000}</td>
                                    :
                                    <td></td>
                                  }
                                  { tran.name == 'newBet' ?
                                    <td>{tran.result._betType == 0 ? 'CALL' : 'PUT'}</td>
                                    :
                                    tran.name == 'betClosed' ?
                                    <td>{tran.result.won =='true' ? 'WON' : 'LOST'}</td>
                                    :
                                    <td></td>
                                  }
                                </tr>
                              ))}
                            </tbody>
                          </table>
                      </div>
                  </form>
                </div>

              </div>
            </div>

        </section>          
      </div>

    );
  }
}

