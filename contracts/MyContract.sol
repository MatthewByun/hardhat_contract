pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MyContract {
    uint256 count = 0;
    address public _owner;
    string public name = "My Hardhat token";
    string public symbol = "MHT";

    uint256 public totalSupply = 100000;

    mapping(uint256 => Contact) public contacts;
    mapping(address => uint256) balances;

    constructor() {
        _owner = msg.sender;
        balances[msg.sender] = totalSupply;
    }

    struct Contact {
        uint256 id;
        string name;
        string phone;
    }

    event ContactCreated(uint256 id, string name, string phone);

    function createFunction(string memory _name, string memory _phone) public {
        count++;
        contacts[count] = Contact(count, _name, _phone);
        emit ContactCreated(count, _name, _phone);
    }

    function transfer(address to, uint amount) external {
        console.log("sender balance is %s tokens", balances[msg.sender]);
        console.log("trying to send %s tokens to %s token to %s", balances[msg.sender], amount, to);
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint){
        return balances[account];
    }

}
