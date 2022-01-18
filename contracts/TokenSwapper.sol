pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract TokenSwapper {
    IERC20 public token;
    uint256 public rate = 100;

    event TokenPurchased(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    event TokenSold(
        address account,
        address token,
        uint256 amount,
        uint256 rate
    );

    constructor(IERC20 _token) {
        token = _token;

    }

    function testing() public pure returns (string memory) {
        return "123";
    }

    function SendEther() external payable {

    }

    function buyToken() public payable {
        uint256 tokenAmount = msg.value * rate;
        console.log(token.balanceOf(address(this)));
        require(
            token.balanceOf(address(this)) >= tokenAmount,
            "Not enough token"
        );
        token.transfer(msg.sender, tokenAmount);
        emit TokenPurchased(msg.sender, address(token), tokenAmount, rate);
    }

    function sellToken(uint256 _amount) public {
        require(token.balanceOf(msg.sender) >= _amount);
        uint256 etherAmount = _amount / rate;
        require(address(this).balance >= etherAmount);
        // perform sale
        token.transferFrom(msg.sender, address(this), _amount);
        payable(msg.sender).transfer(etherAmount);
        // submit event
        emit TokenSold(msg.sender, address(token), _amount, rate);
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
