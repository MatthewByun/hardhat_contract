const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DUG-SS", function () {
  it("My token swapper testing", async function () {
    const MyContract = await ethers.getContractFactory("DUGSS");
    const contract = await MyContract.deploy(
      "0xa2d9cbf13b177dddb08347d4220a4bc8fbbfe190",
      "0x28afeecc16ef8c3cba817b1b91277b00d01ee9f6"
    );
    await contract.deployed();
    // await contract.buyToken();
    expect(await contract.testing()).to.equal("123");
  });
});
