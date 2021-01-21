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

contract BlitzStaking is  Ownable {
    using SafeMath for uint256;
    
    TRC20Interface usdtToken = TRC20Interface(0x412CA9216290851A71AAECE65924034006DA8D2E24);         //TE3MLtNHrkddRNgy6tNi7bfUVRyAe9BpVL
    
    mapping (address => bool) public validContractCaller;
    
    uint public platformUSDT;
    
    constructor() public{        
        
    }
    function receiveUSDT(uint _amount) onlyValidContractCaller external returns(uint){
        platformUSDT = platformUSDT.add(_amount);
        return platformUSDT;
    }
    function sendUSDT(address _to, uint _amount) onlyValidContractCaller external returns(uint){
        require(_to != address(0),'invalid address');
        require(_amount >0,'invalid amount');
        require(_amount<=platformUSDT,'platform run out of USDT');
        
        platformUSDT = platformUSDT.sub(_amount);
        usdtToken.transfer(_to,_amount);
        return platformUSDT;
    }
    /*OTHERS*/
    function setValidContractCaller(address _contractAddress, bool _status) onlyOwner public{
        validContractCaller[_contractAddress] = _status;      //
    }
    modifier onlyValidContractCaller(){
        require (validContractCaller[msg.sender] || msg.sender == owner);
        _;
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
    
    //////////////////////
    // END OF Admin Functions
    //////////////////////
}