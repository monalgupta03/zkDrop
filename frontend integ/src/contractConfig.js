import { ethers } from 'ethers';

export const CONTRACT_ADDRESS = 0x1D8170DcC668271a0BA0f04F59c1EB8B22b4124D; // Replace with your actual contract address

export const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "providerId",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "proof",
        "type": "string"
      }
    ],
    "name": "submitProof",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "userId",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "providerId",
        "type": "uint256"
      }
    ],
    "name": "verifyUser",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "userId",
        "type": "address"
      }
    ],
    "name": "checkAirdropEligibility",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getProviders",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          }
        ],
        "internalType": "struct ReclaimVerifier.Provider[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getUsers",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "userAddress",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "providerId",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "verified",
            "type": "bool"
          }
        ],
        "internalType": "struct ReclaimVerifier.User[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

export const getRootStockProvider = () => {
  return new ethers.JsonRpcProvider('https://public-node.testnet.rsk.co');
};