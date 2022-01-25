pragma solidity ^0.8.4;

import '../contracts/SleepyswapERC20.sol';

contract ERC20 is SleepyswapERC20{
    constructor(uint _totalSupply) public{
        _mint(msg.sender, _totalSupply);
    }
}