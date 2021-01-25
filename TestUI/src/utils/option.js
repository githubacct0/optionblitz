
import tron from './tron';

const option = {
	//Tokens
	OPTION_Address: 'TCsR3K7ZWaz9kgejcRdX1v7SdUBTsGRpDB',	
	
	async requestPriceUpdate(_pair_id){
		try {
			if (!tron.tronWeb) return null;
		  	const contract = await tron.tronWeb.contract().at(this.OPTION_Address);
		  	let res = await contract.requestPriceUpdate(_pair_id).send({
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
	async pairs(_pair_id){

		try {
			//console.log(_pair_id);
			if (!tron.tronWeb) return null;

            const contract = await tron.tronWeb.contract().at(this.OPTION_Address);
            let res = await contract.pairs(_pair_id).call();
            console.log(res);
            return res;
        } catch (err) {
            console.log('pairs:', err);
            return null;
        }
	},
	//getLatestPrice(uint _pair_id)
	async getLatestPrice(_pair_id){
		try {
			if (!tron.tronWeb) return null;
		  	const contract = await tron.tronWeb.contract().at(this.OPTION_Address);
		  	let res = await contract.getLatestPrice(_pair_id).call();
		  	console.log(res/1000000);
		  	return res/1000000;
		} catch (err) {
		  console.log(err);
		  return null;
		}
	},
	//addBet(uint _amount, uint _pair_id, uint _duration,uint8 _betType)
	async addBet(_amount, _pair_id, _duration, _betType){
		try {
			if (!tron.tronWeb) return null;
		  	const contract = await tron.tronWeb.contract().at(this.OPTION_Address);
		  	let res = await contract.addBet(_amount, _pair_id, _duration, _betType).send({
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
export default option;