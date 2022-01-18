const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token swapper", function () {
  it("My token swapper testing", async function () {
    const MyContract = await ethers.getContractFactory("TokenSwapper");
    const contract = await MyContract.deploy(
      "0xa2d9cbf13b177dddb08347d4220a4bc8fbbfe190"
    );
    await contract.deployed();
    // await contract.buyToken();
    expect(await contract.testing()).to.equal("123");
  });
});
