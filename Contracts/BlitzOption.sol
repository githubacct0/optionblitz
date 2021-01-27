pragma solidity >=0.4.23 <0.6.0;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
    address public owner;


    event OwnershipRenounced(address indexed previousOwner);
    event OwnershipTransferred(
        address indexed previousOwner,
        address indexed newOwner
    );


    /**
     * @dev The Ownable constructor sets the original `owner` of the contract to the sender
     * account.
     */
    constructor() public {
        owner = msg.sender;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    /**
     * @dev Allows the current owner to transfer control of the contract to a newOwner.
     * @param _newOwner The address to transfer ownership to.
     */
    function transferOwnership(address _newOwner) public onlyOwner {
        _transferOwnership(_newOwner);
    }

    /**
     * @dev Transfers control of the contract to a newOwner.
     * @param _newOwner The address to transfer ownership to.
     */
    function _transferOwnership(address _newOwner) internal {
        require(_newOwner != address(0));
        emit OwnershipTransferred(owner, _newOwner);
        owner = _newOwner;
    }
}

/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {

    /**
    * @dev Multiplies two numbers, throws on overflow.
    */
    function mul(uint256 _a, uint256 _b) internal pure returns (uint256 c) {
        // Gas optimization: this is cheaper than asserting 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
        if (_a == 0) {
            return 0;
        }

        c = _a * _b;
        assert(c / _a == _b);
        return c;
    }

    /**
    * @dev Integer division of two numbers, truncating the quotient.
    */
    function div(uint256 _a, uint256 _b) internal pure returns (uint256) {
        // assert(_b > 0); // Solidity automatically throws when dividing by 0
        // uint256 c = _a / _b;
        // assert(_a == _b * c + _a % _b); // There is no case in which this doesn't hold
        return _a / _b;
    }

    /**
    * @dev Subtracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
    */
    function sub(uint256 _a, uint256 _b) internal pure returns (uint256) {
        assert(_b <= _a);
        return _a - _b;
    }

    /**
    * @dev Adds two numbers, throws on overflow.
    */
    function add(uint256 _a, uint256 _b) internal pure returns (uint256 c) {
        c = _a + _b;
        assert(c >= _a);
        return c;
    }
}

contract TRC20Interface {

    function totalSupply() public view returns (uint);
    function balanceOf(address guy) public view returns (uint);
    function allowance(address src, address guy) public view returns (uint);
    function approve(address guy, uint wad) public returns (bool);
    function transfer(address dst, uint wad) public returns (bool);
    function transferFrom(address src, address dst, uint wad) public returns (bool);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}

interface AggregatorInterface {
    function latestAnswer() external view returns (int256);
    function latestTimestamp() external view returns (uint256);
    function latestRound() external view returns (uint256);
    function getAnswer(uint256 roundId) external view returns (int256);
    function getTimestamp(uint256 roundId) external view returns (uint256);
    function requestRateUpdate() external returns (bytes32);
}

interface BlitzStakingInterface{
    function sendUSDT(address _to, uint _amount) external returns(uint);
    function receiveUSDT(uint _amount) external returns(uint);
}
/*
#. Aggregator BTC-USD       TLNXr6KA8iQ7Gig8pBSy9R4nSR4PMvKYY4
##. JobID                   6dff23e595e74352b319c35e2d29737a

#. Aggregator EUR-USDT      TLALWuipoQ15QSy4eKVq3hCua1P6D4E4t4
##. JobID                   839c053c02204544b56403d3f43cc114

#. Aggregator XAU-USDT      THcT2kzbEtaJbA9NQvEgAGqUmSTpBoLBzm
##. JobID                   44f3d76d57d84049a6c5e16a6fd58e38
*/

contract BlitzOption is  Ownable {
    
    using SafeMath for uint;

    address public oracle;
    address public stakingContract = address(0x410DD7C51F8DA12479FF138865EA54960F365B2E94);         //TBEQGWtRwZPDWw3XZ8gtMShJMiDs3FM1v2
    TRC20Interface usdtToken = TRC20Interface(0x412CA9216290851A71AAECE65924034006DA8D2E24);         //TE3MLtNHrkddRNgy6tNi7bfUVRyAe9BpVL
    
    /*
        Each trading Pair is defined here
    */
    struct Pair {
        string      name;
        uint        pair_id;
        uint        min_bet;
        uint        max_bet;                        
        uint        winningFactor;          // multiply of 1000 - eg. 1.1x = 1100
        address     AggregatorAddress;
        AggregatorInterface aggregator;
        bool       status;                 //1 is active pair 0 is inactive pair
    } 
    uint public pair_count;
    mapping (uint => Pair) public pairs;
    /*
        Bet structure
    */
    struct Bet {
        address         caller;
        uint            pair_id;
        uint            amount;
        uint            duration;           //in seconds 
        uint            betTime;
        int             openPrice;
        uint            openroundID;
        int             closedPrice;
        uint            closedroundID;
        uint8           betType;            //CALL is 0 and PUT is 1 note: Calls -- Up; Puts -- Down
        uint8           status;             //OPEN is 0 - CLOSED is 1 - CANCELLED is 2
    } 
    uint public bet_count;
    mapping (uint => Bet) public bets;
    
    /*
        Request Validation 
    */
    //Block Number of latest user request
    mapping (address => uint) public validRequestTime;      
    //how many blocks after request Note that Tron block time is every 3 seconds
    //if requestDuration = 2 means addBet only valid in 2 blocks (6 seconds) after making requestUpdate
    uint public requestDuration = 5;                        
    /*
        validDuration[_duration] must equal to _duration or its invalid 
    */
    mapping (uint => uint) validDuration;   //in seconds
    
    
    //////////////////////
    // Events
    //////////////////////
    event newBet(uint _bet_id,address _caller,uint _pair_id, uint _amount, uint _duration,int _openPrice,uint _roundID,uint _betTime,uint8 _betType);
    event betClosed(uint _bet_id,int _openPrice,int _closedPrice,uint _roundID,bool won, uint wonAmount,uint8 _betType,uint winningFactor);
    event betCancelled(uint _bet_id);
    event requestUpdate(address _caller,uint _pair_id);
    
    constructor() public{        
       oracle = msg.sender;
       validDuration[10] = 10;
       validDuration[20] = 20;
       validDuration[30] = 30;
       validDuration[40] = 40;
       validDuration[50] = 50;
       validDuration[60] = 60;
       //BTCUSD TLNXr6KA8iQ7Gig8pBSy9R4nSR4PMvKYY4
       addPair('BTCUSD',10000000,100000000,1234,address(0x41721A8E6A51F09B8D48E02C9DA32B741D2E82E678));
    }
    
    ////////////////////// Send Request for latest update
    
    ////////////////////// Getters
    function getLatestPrice(uint _pair_id) public view returns (int)  {
        require(pairs[_pair_id].aggregator.latestTimestamp() > 0, "Round not complete");
        return pairs[_pair_id].aggregator.latestAnswer();
    }
    function requestPriceUpdate(uint _pair_id) public {
        if (pairs[_pair_id].aggregator.latestTimestamp()<now)
        {
            pairs[_pair_id].aggregator.requestRateUpdate();
            validRequestTime[msg.sender] = block.number + requestDuration;
            emit requestUpdate(msg.sender,_pair_id);
        }
    }
    
    //////////////////////
    // Admin/Owner Functions
    //////////////////////
    
    ////////////////////// Setters
    /*BETS*/
    //addBet return:
    // -1 as cannot get latest price
    // >0 as OK, openPrice
    function addBet(uint _amount, uint _pair_id, uint _duration,uint8 _betType) public payable returns(int _returnCode){
        require(_pair_id<=pair_count,'pair not exist');
        require(pairs[_pair_id].status,'pair not active');
        if (pairs[_pair_id].aggregator.latestTimestamp() <= 0)
            return -1;
        require(pairs[_pair_id].min_bet<=_amount,'invalid bet amount');
        require(pairs[_pair_id].max_bet>=_amount,'invalid bet amount');
        require(_betType == 0 || _betType == 1,'invalid bet' );
        require(_duration>0,'invalid duration');
        require(_amount>0,'invalid amount');
        require(validDuration[_duration] == _duration,'invalid duration');
        require(block.number<=validRequestTime[msg.sender],'request Expired');
        
        int openPrice = getLatestPrice(_pair_id);
        uint roundID = pairs[_pair_id].aggregator.latestRound();
        bet_count++;
        bets[bet_count] = Bet(msg.sender,_pair_id,_amount,_duration,now,openPrice,roundID,-1,0,_betType,0);
        
        //send money to Staking contract
        uint256 allowance = usdtToken.allowance(msg.sender,address(this));
        require (allowance>=_amount,'allowance error');
        
        usdtToken.transferFrom(msg.sender,stakingContract,_amount);
        BlitzStakingInterface(stakingContract).receiveUSDT(_amount);
        
        emit newBet(bet_count,msg.sender, _pair_id, _amount, _duration,openPrice,roundID,now, _betType);
        return openPrice;
    }
    function setOpenPrice(uint _bet_id,int _openPrice) external onlyOracle {
        require(_bet_id<=bet_count,'bet not exist');
        require(bets[_bet_id].status == 0,'bet not open');
        bets[_bet_id].openPrice = _openPrice;
        
    }
    function closeBet(uint _bet_id) public onlyOracle {
        require(_bet_id<=bet_count,'bet not exist');
        require(bets[_bet_id].status == 0,'bet already closed');
        
        uint roundID = pairs[bets[_bet_id].pair_id].aggregator.latestRound();
        require(roundID>bets[_bet_id].openroundID);
        
        bets[_bet_id].closedPrice = getLatestPrice(bets[_bet_id].pair_id);
        bets[_bet_id].status = 1;
        bets[_bet_id].closedroundID = roundID;
        
        uint winningAmount = 0;
        if (bets[_bet_id].betType == 0) // CALL UP
        {
            if (bets[_bet_id].closedPrice>bets[_bet_id].openPrice)
                winningAmount = bets[_bet_id].amount * pairs[bets[_bet_id].pair_id].winningFactor/1000;
        }
        else if (bets[_bet_id].betType == 1) // PUT DOWN
        {
            if (bets[_bet_id].closedPrice<bets[_bet_id].openPrice)
                winningAmount = bets[_bet_id].amount * pairs[bets[_bet_id].pair_id].winningFactor/1000;
        }
        if (winningAmount > 0){
            //PAY the Winner from Staking Contract
            BlitzStakingInterface(stakingContract).sendUSDT(bets[_bet_id].caller,winningAmount);
            emit betClosed(_bet_id,bets[_bet_id].openPrice,bets[_bet_id].closedPrice,roundID,true,winningAmount,bets[_bet_id].betType,pairs[bets[_bet_id].pair_id].winningFactor);
        }
        else 
            emit betClosed(_bet_id,bets[_bet_id].openPrice,bets[_bet_id].closedPrice,roundID,false,0,bets[_bet_id].betType,pairs[bets[_bet_id].pair_id].winningFactor);
    }

    function cancelBet(uint _bet_id) public {
        require(bets[_bet_id].caller == msg.sender || msg.sender == oracle,'not bet owner or contract owner');
        require(bets[_bet_id].status == 0,'bet not open');
        
        bets[_bet_id].status = 2;
        emit betCancelled(_bet_id);
    }
    
    /*PAIRS*/
    function addPair(string memory _name, uint _min_bet, uint _max_bet, uint _winningFactor,address _AggregatorAddress) onlyOwner() public returns (uint pairID){
        
        pair_count++;
        pairs[pair_count] = Pair(_name,pair_count, _min_bet, _max_bet, _winningFactor,_AggregatorAddress,AggregatorInterface(_AggregatorAddress),true);            
  
        return pair_count;
    }
    function updatePairName(uint pairID, string memory _name) onlyOwner() public{
        pairs[pairID].name= _name;
    }
    function updatePairMin(uint pairID, uint _min_bet) onlyOwner() public{
        pairs[pairID].min_bet= _min_bet;
    }
    function updatePairMax(uint pairID, uint _max_bet) onlyOwner() public{
        pairs[pairID].max_bet= _max_bet;
    }
    function updatePairCoefs(uint pairID, uint _winningFactor) onlyOwner() public{
        pairs[pairID].winningFactor= _winningFactor;
    }
    function updatePairStatus(uint pairID, bool _status) onlyOwner() public{
        pairs[pairID].status= _status;
    }
    function updatePairAggregatorAddress(uint pairID, address _AggregatorAddress) onlyOwner() public{
        pairs[pairID].AggregatorAddress= _AggregatorAddress;
        pairs[pairID].aggregator= AggregatorInterface(_AggregatorAddress);
    }
    
    /*OTHERS*/
    function setRequestDuration(uint _blocks) onlyOwner public{
        require(_blocks>0,'invalid input');
        requestDuration = _blocks;
    }
    function setValidDurations(uint _duration, uint _durationValue) onlyOwner public{
        require(_duration>0,'invalid duration');
        validDuration[_duration] = _durationValue;      //
    }
    function setStakingContract(address _stakingContract) onlyOwner public{
        require(_stakingContract != address(0));
        stakingContract = _stakingContract;
    }
    function setOracle(address _newOracle) onlyOwner external {
        require(_newOracle != address(0) && _newOracle != oracle);
        oracle = _newOracle;
    }
    
    ////////////////////// Administration
    function transferFund(address to, uint256 amount,address token) onlyOwner public {
        uint256 balance = TRC20Interface(token).balanceOf(address(this));
        require(amount<=balance,'exceed contract balance');
        TRC20Interface(token).transfer(to, amount);
    }
    function transferTRX(address payable to,uint256 amount) onlyOwner public {
        require(amount<=address(this).balance,'exceed contract balance');
        to.transfer(amount);
    }

    modifier onlyOracle(){
        require(msg.sender==oracle,'Not Owner');
        _;
    }
    //////////////////////
    // END OF Admin Functions
    //////////////////////
}