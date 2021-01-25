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

//new Bet

const checkNewBet = async (_size) => {
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

    for (var i=0;i<leng;i++){
    	if (Events[i].name== 'newBet'){
    		let res = await contract.bets(Events[i].result._bet_id).call();
	    	if (res.status==0){
	    		let betTime = parseInt(res.betTime._hex);
	    		let duration = parseInt(res.duration._hex);
	    		console.log('Open Bet:',Events[i].result._bet_id,betTime,duration);
	    		//if 

	    	}
    	}
    	
    }
}

console.log("Welcome to Options Service");
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
	var interval = setInterval(async function() {
	  await checkNewBet(200);
	}, 3000);	//check automatically every 3 seconds
})
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   


