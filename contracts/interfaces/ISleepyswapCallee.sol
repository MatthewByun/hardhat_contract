pragma solidity ^0.8.4;

interface ISleepyswapCallee {
    function sleepyswapCall(address sender, uint amount0, uint amount1, bytes calldata data) external;
}
