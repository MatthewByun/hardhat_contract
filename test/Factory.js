const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Factory", function () {
  it("My Factory testing", async function () {
    const MyContract = await ethers.getContractFactory("Factory");
    const contract = await MyContract.deploy();
    await contract.deployed();
    // await contract.buyToken();
    expect("123").to.equal("123");
  });
});
