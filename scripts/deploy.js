// scripts/deploy.js
const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const ReclaimVerifier = await hre.ethers.getContractFactory("ReclaimVerifier");
  const reclaimVerifier = await ReclaimVerifier.deploy();

  await reclaimVerifier.deployed();

  console.log("ReclaimVerifier deployed to:", reclaimVerifier.address);

  // Save the contract's ABI and address to a file
  const data = {
    address: reclaimVerifier.address,
    abi: JSON.parse(reclaimVerifier.interface.format('json'))
  };
  fs.writeFileSync('./contracts/ReclaimVerifier.json', JSON.stringify(data, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });