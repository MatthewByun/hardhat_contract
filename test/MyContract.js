const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("My Contract", function () {
  it("Should return the new greeting once it's changed", async function () {
    const MyContract = await ethers.getContractFactory("MyContract");
    const contract = await MyContract.deploy()
    await contract.deployed();

    expect(await contract.totalSupply()).to.equal(100000);
  });
});
