require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

const ROOTSTOCK_TESTNET_PRIVATE_KEY = "39bfbb341dbdb3a65cdc08fd08411454aec46f9679c62dd1835b4a7d753aa7df"

if (!ROOTSTOCK_TESTNET_PRIVATE_KEY) {
  console.error("Please set your ROOTSTOCK_TESTNET_PRIVATE_KEY in a .env file");
  process.exit(1);
}

// module.exports = {
//   solidity: "0.8.20",
//   networks: {
//     rskTestnet: {
//       url: "https://public-node.testnet.rsk.co",
//       chainId: 31,
//       gasPrice: 60000000,
//       accounts: [`0x${ROOTSTOCK_TESTNET_PRIVATE_KEY}`]
//     }
//   }
// };


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    rskTestnet: {
      url: "https://public-node.testnet.rsk.co",
      chainId: 31,
      accounts: [`0x${ROOTSTOCK_TESTNET_PRIVATE_KEY}`],
      gasPrice: 'auto',
      timeout: 300000 // 5 minutes
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  mocha: {
    timeout: 40000
  }
};