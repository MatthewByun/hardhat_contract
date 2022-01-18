/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { TOKEN_CONTRACT_ABI, TOKEN_ADDRESS } from "./MyContractAbi";

import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./abi/abi_MyContract";

import {
  CONTRACT_API_SWAPPER,
  CONTRACT_SWAPPER_ADDRESS,
} from "./abi/abi_SwapContract";
import Web3 from "web3";
import SwapToken from "./SwapToken";

const WalletCard = () => {
  const web3 = new Web3(Web3.givenProvider);
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();

  useEffect(() => {
    (async () => {
      const acc =
        (await web3.eth.getAccounts()) && (await web3.eth.requestAccounts());
      const bal = await web3.eth.getBalance(acc[0]);
      setAccount(acc[0]);
      setBalance(bal);
    })();
  }, []);

  const SwapOnClickETH = async () => {
    const contract = new web3.eth.Contract(
      CONTRACT_API_SWAPPER,
      CONTRACT_SWAPPER_ADDRESS
    );
    const ethAmount = document.getElementsByClassName("swap")[1].value;
    await contract.methods
      .buyToken()
      .send({
        from: account,
        value: ethAmount * 1000000000000000000,
      })
      .then((rep) => console.log(rep));
  };

  const SwapOnClick = async () => {
    const amount1 = document.getElementsByClassName("swap")[0].value;
    // const amount2 = document.getElementsByClassName('swap')[1].value;

    const contract = new web3.eth.Contract(
      CONTRACT_API_SWAPPER,
      CONTRACT_SWAPPER_ADDRESS
    );

    const token = new web3.eth.Contract(TOKEN_CONTRACT_ABI, TOKEN_ADDRESS);
    // console.log('token', token);
    await token.methods
      .approve(CONTRACT_SWAPPER_ADDRESS, `${amount1}000000000000000000`)
      .send({ from: account })
      .then((rep) => console.log(rep));

    await contract.methods
      .sellToken(`${amount1}000000000000000000`)
      .send({ from: account })
      //   .call()
      .then((receipt) => console.log(receipt));
  };

  const transformBalanceDogun = async () => {
    const token = new web3.eth.Contract(TOKEN_CONTRACT_ABI, TOKEN_ADDRESS);
    console.log(token);
    const bal = await token.methods.balanceOf(account).call();

    console.log(bal);
    setBalance(bal);
  };

  const transformBalanceEther = async () => {
    const bal = await web3.eth.getBalance(account);
    setBalance(bal);
  };

  const sendEtherHandleClick = async () => {
    const contract = new web3.eth.Contract(
      CONTRACT_API_SWAPPER,
      CONTRACT_SWAPPER_ADDRESS
    );
    await contract.methods
      .SendEther()
      .send({
        from: account,
        value:
          document.getElementsByClassName("send")[0].value * 100000000000000000,
      })
      .then((receipt) => console.log(receipt));
  };

  return (
    <div>
      <h4>Account</h4>
      {account ? account : "Not connected yet!!"}
      <h5>Balance</h5>
      {balance ? balance : 0}
      <br />
      <button onClick={transformBalanceDogun}>transform to dogun</button>
      <button onClick={transformBalanceEther}>transform to ether</button>
      <h5>Send Ether to contract</h5>
      <div>
        <input
          type={`number`}
          className="send"
          placeholder="ether send (Ether)"
        />
        <br />
        <button onClick={sendEtherHandleClick}>Send Ether to contract</button>
      </div>
      <h5>Transfer zone</h5>
      {/* <input type={`number`} className="transfer" placeholder="Amount (Ethers)" />
            <input type={`text`} className="transfer" placeholder="Adress: 0x....." /><br />
            <button onClick={TransferOnClick}> Transfer to this address</button><br />
            <div>
                Despoist to contract<input type={`number`} className="despoist" />
                <button onClick={DepoistOnClick} >Despoist to contract</button>
            </div> */}
      {/* <SwapToken /> */}
      DUG: <input type={`number`} className="swap" placeholder="Amount (DUG)" />
      <button onClick={SwapOnClick}>Buy ETH with DUG</button>
      <br />
      <br />
      Ether:{" "}
      <input type={`number`} className="swap" placeholder="Amount (ETH)" />
      <button onClick={SwapOnClickETH}>Buy DUG with ETH</button>
    </div>
  );
};

export default WalletCard;
