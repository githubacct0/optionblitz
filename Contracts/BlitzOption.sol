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
}
/*
#. Aggregator BTC-USD		TLNXr6KA8iQ7Gig8pBSy9R4nSR4PMvKYY4
##. JobID					c60981b342f544fbb2381e6e7129c0e1

#. Aggregator EUR-USDT		TLALWuipoQ15QSy4eKVq3hCua1P6D4E4t4
##. JobID					df38376bd6f14780bb1c8a1a4da5951e

#. Aggregator XAU-USDT		THcT2kzbEtaJbA9NQvEgAGqUmSTpBoLBzm
##. JobID					28d30f4029864c44be7124d14e20b071
*/

contract BlitzOption is  Ownable {
    using SafeMath for uint256;

    address public oracle;
    
    mapping (address => AggregatorInterface) priceFeed;
    struct Pair {
        string      name;
        uint        pair_id;
        uint        min_bet;
        uint        max_bet;                        
        uint        winningFactor; 
    } 
    uint public pair_count;
    mapping (uint => Pair) pairs;
    
    struct Bet {
        address         caller;
        uint            pair_id;
        uint            amount;
        uint            openPrice;
        uint            closePrice;
        uint            betType;            //CALL is 0 and PUT is 1
        
    } 
    uint public bet_count;
    mapping (uint => Bet) bets;
    
    constructor() public{        
       oracle = msg.sender;
    }
    
    ////////////////////// Getters
    function getLatestPrice(address Aggregator_Address) public view returns (int)  {
        require(priceFeed[Aggregator_Address].latestTimestamp() > 0, "Round not complete");
        return priceFeed[Aggregator_Address].latestAnswer();
    }
    
    //////////////////////
    // Admin/Owner Functions
    //////////////////////
    
    ////////////////////// Setters
    
    function addPair(string memory _name, uint _min_bet, uint _max_bet, uint _winningFactor) onlyOwner() public returns (uint pairID){
        
        pair_count++;
        pairs[pair_count] = Pair(_name,pair_count, _min_bet, _max_bet, _winningFactor);            
  
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
    
    
    function setPriceFeed(address Aggregator_Address) onlyOwner public {
       require(Aggregator_Address != address(0));
       priceFeed[Aggregator_Address] = AggregatorInterface(Aggregator_Address);
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