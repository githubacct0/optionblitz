
import tron from './tron';

const option = {
	OPTION_Address: 'TH4VYJ8ps5WVHrTvWaCJLTFFYXNjxJBn3M',	
	BTC_USD_AggregatorAddress:'TLNXr6KA8iQ7Gig8pBSy9R4nSR4PMvKYY4',
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
	async latestRound(){
		try {
			//console.log(_pair_id);
			if (!tron.tronWeb) return null;

            const contract = await tron.tronWeb.contract().at(this.BTC_USD_AggregatorAddress);
            let res = await contract.latestRound().call();
            console.log(parseInt(res._hex));
            return parseInt(res._hex);
        } catch (err) {
            console.log('latestRound:', err);
            return 0;
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