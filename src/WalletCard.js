import { useEffect, useState } from "react";
import {
    TOKEN_CONTRACT_ABI,
    TOKEN_ADDRESS,
    CONTRACT_API_SWAPPER,
    CONTRACT_SWAPPER_ADDRESS
} from './MyContractAbi';

import {
    CONTRACT_ABI,
    CONTRACT_ADDRESS
} from './abi/abi_MyContract';
import Web3 from "web3";
import SwapToken from "./SwapToken";


const WalletCard = () => {
    const web3 = new Web3(Web3.givenProvider);
    const [account, setAccount] = useState();
    const [balance, setBalance] = useState();

    useEffect(() => {
        (async () => {
            const acc = await web3.eth.getAccounts() && await web3.eth.requestAccounts();
            const bal = await web3.eth.getBalance(acc[0]);
            setAccount(acc[0]);
            setBalance(bal);
        })();
    }, []);


    const TransferOnClick = async () => {
        const amount = document.getElementsByClassName('transfer')[0].value;
        const address = document.getElementsByClassName('transfer')[1].value;
        await web3.eth.sendTransaction({
            from: account,
            to: address,
            value: amount * 1000000000000000000
        }).then(receipt => {
            window.alert("Transfer success");
            window.location.reload();
        });
    }

    // const SwapOnClick = async () => {
    //     const from = account;
    //     console.log(from)
    //     const amount1 = document.getElementsByClassName('swap')[0].value;
    //     const amount2 = document.getElementsByClassName('swap')[1].value;
    //     const contract = new web3.eth.Contract(CONTRACT_API_SWAPPER, CONTRACT_SWAPPER_ADDRESS);
    //     console.log('contract',contract);
    //     await contract.methods.swapper(amount1, amount2)
    //         .call(receipt => console.log(receipt));
    // }

    const transformBalanceDogun = async () => {
        const token = new web3.eth.Contract(TOKEN_CONTRACT_ABI, TOKEN_ADDRESS);
        console.log(token);
        const bal = await token.methods.balanceOf(account).call();

        console.log(bal);
        setBalance(bal)
    }

    const transformBalanceEther = async () => {
        const bal = await web3.eth.getBalance(account);
        setBalance(bal);
    }

    const DepoistOnClick = async () => {
        const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
        console.log(document.getElementsByClassName('despoist')[0].value);
        console.log(contract);
        await contract.methods._transferToContract(3000000000000000000).call().then(receipt => console.log(receipt));
    }


    



    return (
        <div>
            <h4>Account</h4>
            {account ? account : "Not connected yet!!"}
            <h5>Balance</h5>
            {balance ? balance : 0}<br />
            <button onClick={transformBalanceDogun}>transform to dogun</button>
            <button onClick={transformBalanceEther}>transform to ether</button>
            <h5>Transfer</h5>
            <input type={`number`} className="transfer" placeholder="Amount (Ethers)" />
            <input type={`text`} className="transfer" placeholder="Adress: 0x....." /><br />
            <button onClick={TransferOnClick}> Transfer to this address</button><br />
            <div>
                Despoist to contract<input type={`number`} className="despoist" />
                <button onClick={DepoistOnClick} >Despoist to contract</button>
            </div>

            <SwapToken />
            
            {/* <input type={`number`} className="swap" placeholder="Amount outcome" />
            <input type={`number`} className="swap" placeholder="Amount income" /><br />
            <button onClick={SwapOnClick}> Swapp to this address</button> */}
        </div>

    );
}

export default WalletCard;