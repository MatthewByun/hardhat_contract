pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MyContract {
    uint256 count = 0;

    string private name = "My Hardhat token";

    mapping(uint256 => Contact) public contacts;
    mapping(address => uint256) balances;

    constructor() {}

    struct Contact {
        uint256 id;
        string name;
        string phone;
    }

    event ContactCreated(uint256 id, string name, string phone);

    function myName() public view returns (string memory) {
        return name;
    }

    function createFunction(string memory _name, string memory _phone) public {
        count++;
        contacts[count] = Contact(count, _name, _phone);
        emit ContactCreated(count, _name, _phone);
    }

    function _transferToContract(uint256 amount) external payable {
        // require(balances[msg.sender] >= amount, "Your amount not enough for sending token");
        // payable(msg.sender).transfer();÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷÷/////
        // address(this).balance += amount;
        // balances[msg.sender] += amount;
        console.log(address(this).balance);
    }
    
    function _setAmountContract(uint amount) external payable{

        balances[msg.sender] = amount; 
    }

    function balanceOf() external view returns (uint256) {
        console.log(address(this).balance);
        return address(this).balance;
    }

    function swap(
        IERC20 token,
        address from,
        uint256 amount,
        IERC20 token2,
        address to,
        uint256 amount2
    ) public {
        require(token.balanceOf(from) >= amount, "Not enough balance");
        require(token2.balanceOf(to) >= amount2, "Not enough balance");

        _safeTransferFrom(token, from, to, amount);
        _safeTransferFrom(token2, to, from, amount2);
    }

    function _safeTransferFrom(
        IERC20 token,
        address sender,
        address recipient,
        uint256 amount
    ) private {
        bool sent = token.transferFrom(sender, recipient, amount);
        require(sent, "Token transfer failed");
    }
}
