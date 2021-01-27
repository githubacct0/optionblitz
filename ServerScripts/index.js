const TronWeb = require("tronweb");
const axios = require('axios');
require('dotenv').config({ path: '/root/OptionsScript/.env' });

const cors = require('cors') ;
const bodyParser = require('body-parser');
const express = require('express');
var MobileDetect = require('mobile-detect');
const app = express();
var BigNumber = require('bignumber.js');
const port = 1357

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const tronWeb = new TronWeb({
    fullNode: 'https://api.nileex.io',
    solidityNode: 'https://api.nileex.io',
    eventServer: 'https://event.nileex.io',
    privateKey: process.env.PRIVATE_KEY //oracle account
});

let isRunning = false;
//new Bet

const checkNewBet = async (_size) => {
	if (isRunning) return;
	isRunning = true;
	console.log('Checking latest '+_size+' events...');
	console.log(process.env.OPTION_ADDRESS);
  	let Events = [];
    await tronWeb.getEventResult(process.env.OPTION_ADDRESS, {size:_size}).then(result => {
            Events = result;
    });
    let leng = Events.length;
    console.log('Events Length',leng);
    const contract = await tronWeb.contract().at(process.env.OPTION_ADDRESS);
    let currentBlock = await tronWeb.trx.getCurrentBlock();
    let currentBlockTime = currentBlock.block_header.raw_data.timestamp/1000;	//seconds
    console.log('currentBlockTime',currentBlockTime);


    const BTCUSD_Aggregator_contract = await tronWeb.contract().at('TLNXr6KA8iQ7Gig8pBSy9R4nSR4PMvKYY4');

    for (var i=0;i<leng;i++){
    	if (Events[i].name== 'newBet'){
    		let res = await contract.bets(Events[i].result._bet_id).call();
	    	if (res.status==0){
	    		let betTime = parseInt(res.betTime._hex);
	    		let duration = parseInt(res.duration._hex);
	    		let openroundID = parseInt(res.openroundID._hex);
	    		console.log('Open Bet:',Events[i].result._bet_id,betTime,duration);
	    		//if 
	    		if (currentBlockTime > betTime + duration + 10){
	    			//Bet Expire, set to 2
	    			console.log('Bet Expired',Events[i].result._bet_id);
	    			let resExpired = await contract.cancelBet(Events[i].result._bet_id).send({
				          shouldPollResponse: false,
				          callValue: 0
				      });
	    		}
	    		else if (currentBlockTime > betTime + duration){
	    			//Check if request Price Update for Pair
				    //TODO: for all pairs as atm only BTC USD Pair
				    //BTC USD Aggregator Address
				    //TLNXr6KA8iQ7Gig8pBSy9R4nSR4PMvKYY4
				    
				    let BTCUSD_latestUpdate = await BTCUSD_Aggregator_contract.latestTimestamp().call();
				    if (currentBlockTime > BTCUSD_latestUpdate - 5){
				    	console.log('Updating Price...');
					    await contract.requestPriceUpdate(1).send({
						      shouldPollResponse: false,
						      callValue: 0
						});
						let BTCUSD_latest_roundID = await BTCUSD_Aggregator_contract.latestRound().call();
						console.log(BTCUSD_latest_roundID,openroundID)
						let timeout = 0;
						while(BTCUSD_latest_roundID <= openroundID){

							console.log('Round ID not changed, waiting...');
							await sleep(100);
							timeout++;
							if (timeout>50) break;
							BTCUSD_latest_roundID = await BTCUSD_Aggregator_contract.latestRound().call();

						}
				    }
				    	
	    			let BTCUSD_latestPrice = await BTCUSD_Aggregator_contract.latestAnswer().call();
	    			console.log(parseInt(BTCUSD_latestPrice._hex));
	    			//Close Bet
	    			console.log('Close Bet ',Events[i].result._bet_id);
	    			let resClose = await contract.closeBet(Events[i].result._bet_id).send({
				          shouldPollResponse: false,
				          callValue: 0
				      });
	    		}
	    	}
    	}
    	
    }
    isRunning = false;
}

console.log("Welcome to Options Service");
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
	var interval = setInterval(async function() {
	  await checkNewBet(200);
	}, 5000);	//check automatically every 3 seconds
})
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   


