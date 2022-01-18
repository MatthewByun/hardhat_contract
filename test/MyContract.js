const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MyContract", function () {
  // it("My contract testing", async function () {
  //   const MyContract = await ethers.getContractFactory("MyContract");
  //   const contract = await MyContract.deploy();
  //   await contract.deployed();
    
  //   expect(await contract.myName()).to.equal("My Hardhat token");
  // });

  it("Test transfer", async function () {
    const MyContract = await ethers.getContractFactory("MyContract");
    const contract = await MyContract.deploy();
    const confunction = await contract.deployed();
    // console.log("before");
    // await confunction.balanceOf();
    await confunction._transferToContract(3);
    // console.log("after");
    // await confunction.balanceOf();
    // console.log('after transfer', confunction.balanceOf())
    expect(confunction.balanceOf()).to.equal(3);
  });
});
