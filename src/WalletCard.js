import { useEffect, useState } from "react";
import MyContractAbi from './MyContractAbi.json';
import Web3 from "web3";



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

    return (
        <div>
            <h4>Account</h4>
            {account ? account : "Not connected yet!!"}
            <h5>Balance</h5>
            {balance ? balance : 0}
            <h5>Transfer</h5>
            <input type={`number`} className="transfer" placeholder="Amount (Ethers)" />
            <input type={`text`} className="transfer" placeholder="Adress: 0x....." /><br />
            <button onClick={TransferOnClick}> Transfer to this address</button>
        </div>

    );
}

export default WalletCard;