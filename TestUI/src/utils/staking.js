
import tron from './tron';

const staking = {
	STAKING_Address: 'TQaNm3E5kUHRyJ8TXQjW4WhFmZkh2Z31BY',	
	async getUSDTBalance(_address){
		try {
			if (!tron.tronWeb) return null;
		  	const contract = await tron.tronWeb.contract().at(this.STAKING_Address);
		  	let res = await contract.getUSDTBalance(_address).call();
		  	//console.log(parseInt(res._hex)/1000000);
		  	return parseInt(res._hex)/1000000;
		} catch (err) {
		  console.log(err);
		  return null;
		}
	},
	async depositUSDT(_amount){
		try {
			if (!tron.tronWeb) return null;
		  	const contract = await tron.tronWeb.contract().at(this.STAKING_Address);
		  	let res = await contract.depositUSDT(_amount).send({
		          shouldPollResponse: false,
		          callValue: 0
		      });
		  	console.log(res);
		  	return res;
		} catch (err) {
		  console.log(err);
		  return null;
		}
	},
	async withdrawUSDT(_amount){
		try {
			if (!tron.tronWeb) return null;
		  	const contract = await tron.tronWeb.contract().at(this.STAKING_Address);
		  	let res = await contract.withdrawUSDT(_amount).send({
		          shouldPollResponse: false,
		          callValue: 0
		      });
		  	console.log(res);
		  	return res;
		} catch (err) {
		  console.log(err);
		  return null;
		}
	},
}
export default staking;