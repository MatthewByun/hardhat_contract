const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Router", function () {
  it("My Router testing", async function () {
    const MyContract = await ethers.getContractFactory("Router");
    const contract = await MyContract.deploy();
    await contract.deployed();
    // await contract.buyToken();
    expect("123").to.equal("123");
  });
});
