

const tron = {
	//Tokens
	USDT_Address: 'TE3MLtNHrkddRNgy6tNi7bfUVRyAe9BpVL',	
	BLITZ_Address: '',

	tronScanAddress: "https://nile.tronscan.org/#/address/",           //for mainnet remove shasta.
    tronScanTransaction: "https://nile.tronscan.org/#/transaction/",
	tronWeb: null,
	async getTRXBalance(address) {
		if (!this.tronWeb) return 0;
		if (address=='') return 0;
        let res = await this.tronWeb.trx.getBalance(address);
        try
        {
            return res / Math.pow(10, 6);
        } catch (err) {
            return 0;
        }
	},
	async getUSDTBalance(address){
		if (!this.tronWeb) return 0;
		if (address=='') return 0;
		return await this.getTRC20Balance(address,this.USDT_Address,6);
	},
	async getBLITZBalance(address){
		if (!this.tronWeb) return 0;
		if (address=='') return 0;
		return await this.getTRC20Balance(address,this.BLITZ_Address,6);
	},
	async getTRC20Balance(address,contract_address,precision){
		try {
			if (address=='') return 0;
			if (!this.tronWeb) return 0;
			if (!this.tronWeb.isAddress(address)) return 0;

            const tokenContract = await this.tronWeb.contract().at(contract_address);
            let res = await tokenContract.balanceOf(address).call();
            //console.log(address,contract_address,res);
            return res.toNumber() / Math.pow(10, precision);
        } catch (err) {
            console.log('TRC20 Balance:', err);
            return 0;
        }
	},
	async Approve(spender, amount, token_contract_address){
		try {
			if (!this.tronWeb) return null;
		  	const tokenContract = await this.tronWeb.contract().at(token_contract_address);
		  	let res = await tokenContract.approve(spender, amount).send({
		          shouldPollResponse: false,
		          callValue: 0
		      });
		  return res;
		} catch (err) {
		  console.log(err);
		  return null;
		}
	},
	async getTransaction(tranID){
		if (!this.tronWeb) return null;
		console.log('getTransaction',tranID);
		let res = await this.tronWeb.trx.getTransaction(tranID);
		return res;
	}
}
export default tron;