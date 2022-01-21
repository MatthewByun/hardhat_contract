pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "hardhat/console.sol";

contract DUGSS {
    IERC20 public token1;
    IERC20 public token2;

    event DespositTokens(uint256 amount1, uint256 amount2);
    event WithdrawTokens(uint256 amount1, uint256 amount2);
    event EApproveToken();

    constructor(IERC20 _token, IERC20 _token2) {
        token1 = _token;
        token2 = _token2;
        // token1.approve(address(this), token1.totalSupply());
        // token2.approve(address(this), token2.totalSupply());
    }

    function testing() public pure returns (string memory) {
        return "123";
    }

    function SendEther() external payable {}

    function GetEther() external payable {
        payable(msg.sender).transfer(msg.value);
    }

    function ApproveToken() external payable{
        token1.approve(address(this), token1.totalSupply());
        token2.approve(address(this), token2.totalSupply());
        emit EApproveToken();
    }

    // deposit token to pool
    function DepositCurrencyToPool(uint256 amount1, uint256 amount2)
        external
        payable
    {
        require(
            token1.balanceOf(msg.sender) >= amount1,
            "U don't have enough token 1 to desposit"
        );
        require(
            token2.balanceOf(msg.sender) >= amount2,
            "U don't have enough token 2 to desposit"
        );
        token1.transferFrom(msg.sender, address(this), amount1);
        token2.transferFrom(msg.sender, address(this), amount2);
        emit DespositTokens(amount1, amount2);
    }

    // function WithdrawCurrencyFromPool(IERC20 _token, uint amount) external payable{
    //     require(_token.balanceOf(address(this)) >= amount, "INSUFFICENT exceeds");
    //     _token.transferFrom(sender, recipient, amount);
    // }

    function SwapTokenWithPool(uint256 amount1, uint256 amount2)
        external
        payable
    {
        require(
            token1.balanceOf(msg.sender) >= amount1,
            "This address is not enough token for this transaction"
        );
        require(
            token2.balanceOf(address(this)) >= amount2,
            "This contract is not enough token for this transaction"
        );

        // perform safe transfer
        token1.transferFrom(msg.sender, address(this), amount1);
        token2.transferFrom(address(this), msg.sender, amount2);
    }

    function WithdrawCurrencyFromPool(uint256 amount1, uint256 amount2)
        external
        payable
    {
         require(
            token1.balanceOf(address(this)) >= amount1,
            "U don't have enough token 1 to desposit"
        );
        require(
            token2.balanceOf(address(this)) >= amount2,
            "U don't have enough token 2 to desposit"
        );
        token1.transferFrom(address(this), msg.sender, amount1);
        token2.transferFrom(address(this), msg.sender, amount2);
        emit WithdrawTokens(amount1, amount2);
    }

    // function sellToken(uint256 _amount) public {
    //     require(token.balanceOf(msg.sender) >= _amount);
    //     uint256 etherAmount = _amount / rate;
    //     require(address(this).balance >= etherAmount);
    //     // perform sale
    //     token.transferFrom(msg.sender, address(this), _amount);
    //     payable(msg.sender).transfer(etherAmount);
    //     // submit event
    //     emit TokenSold(msg.sender, address(token), _amount, rate);
    // }

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
