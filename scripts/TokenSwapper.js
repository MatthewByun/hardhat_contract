// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // We get the contract to deploy
  const Contract = await hre.ethers.getContractFactory("TokenSwapper");
  const contract = await Contract.deploy(
    "0xa2d9cbf13b177dddb08347d4220a4bc8fbbfe190"
  );
  console.log("deploy here");
  await contract.deployed();
  console.log("contract deployed to:", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
