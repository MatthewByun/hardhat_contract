export const ADDRESS_POOL = '0x881143D0c761C6e3F27F72bF84ccDcBB0728A9DA';

export const ABI_POOL = [
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "_token",
        "type": "address"
      },
      {
        "internalType": "contract IERC20",
        "name": "_token2",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount2",
        "type": "uint256"
      }
    ],
    "name": "DespositTokens",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [],
    "name": "EApproveToken",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount2",
        "type": "uint256"
      }
    ],
    "name": "WithdrawTokens",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "ApproveToken",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount2",
        "type": "uint256"
      }
    ],
    "name": "DepositCurrencyToPool",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "GetEther",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "SendEther",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount2",
        "type": "uint256"
      }
    ],
    "name": "SwapTokenWithPool",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount1",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "amount2",
        "type": "uint256"
      }
    ],
    "name": "WithdrawCurrencyFromPool",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "testing",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token1",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token2",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]