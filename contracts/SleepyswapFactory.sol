pragma solidity ^0.8.4;

import "./interfaces/ISleepyswapFactory.sol";
import "./SleepyswapPair.sol";

contract SleepyswapFactory is ISleepyswapFactory {
    address public feeTo;
    address public feeToSetter;

    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    event PairCreated(
        address indexed token0,
        address indexed token1,
        pair,
        uint256
    );

    constructor(address _feeToSetter) {
        feeToSetter = _feeToSetter;
    }

    function allPairsLength() external view returns (uint256) {
        return allPairs.length;
    }

    function createPair(address tokenA, address tokenB)
        external
        returns (address pair)
    {
        require(tokenA != tokenB, "Sleepyswap: IDENTICAL_ADDRESS");
        (address token0, address token1) = tokenA < tokenB
            ? (tokenA, tokenB)
            : (tokenB, tokenA);
        require((token0 != address(0), "Sleepyswap: ZERO addresss"));
        require(
            getPair[token0][token1] == address(0),
            "Sleepyswap: PAIR_EXISTED"
        );
        bytes memory bytecode = type(SleepyswapPair).creationCode;
        bytes32 salt = keccak256(abi.encodePacked(token0, token1));
        assembly {
            pair := create2(0, add(bytecode, 32), mload(bytecode), salt)
        }

        ISleepyswapPair(pair).initialize(token0, token1);
        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair;
        allPairs.push(pair);
        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    function setFeeTo(address _feeTo) external {
        require(msg.sender == feeToSetter, "Sleepyswap: FORBIDDEN");
        feeTo = _feeTo;
    }

    function setFeeToSetter(addres _feeToSetter) external {
        require(msg.sender == feeToSetter, "Sleepyswap: FORBIDDEN");
        feeToSetter = _feeToSetter;
    }
}
