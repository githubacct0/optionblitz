import axios from 'axios';

const price = {
	//Tokens

	async getBTCUSD(){
		let ret = 0;
		await axios.get('https://api.binance.com/api/v3/avgPrice?symbol=BTCUSDT')
		  .then(function (response) {
		    ret = response.data.price;
		  })
		  .catch(function (error) {
		    // handle error
		    console.log(error);
		  });
		  return ret;
	}

}
export default price;