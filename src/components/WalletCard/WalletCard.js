/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { TOKEN_CONTRACT_ABI, TOKEN_ADDRESS } from "../../MyContractAbi";
import { Link } from "react-router-dom";
import {
  Button,
  Grid,
  GridItem,
  Heading,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableCaption,
} from "@chakra-ui/react";
import { TOKEN_ABI, TOKEN_ADDRESS_SS } from "../../abi/tokens/SSTokens";

import {
  CONTRACT_API_SWAPPER,
  CONTRACT_SWAPPER_ADDRESS,
} from "../../abi/abi_SwapContract";

import { ADDRESS_POOL, ABI_POOL } from "../../abi/pools/DUB_SS";

import Web3 from "web3";

const OPTIONS_POOLING = [
  {
    name: "DUG/SS",
    address: ADDRESS_POOL,
    ABI: ABI_POOL,
  },
];

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

  const getEtherHandleClick = async () => {
    const contract = new web3.eth.Contract(
      CONTRACT_API_SWAPPER,
      CONTRACT_SWAPPER_ADDRESS
    );
    await contract.methods
      .SendEther()
      .call({
        from: account,
        value:
          document.getElementsByClassName("get")[0].value * 100000000000000000,
      })
      .then((rep) => console.log(rep));
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

  const ApproveToContract = async (element) => {
    console.log(element);
    // const contract = new web3.eth.Contract(element.ABI, element.address);
    // await contract.methods
    //   .ApproveToken()
    //   .send({ from: account })
    //   .then((receipt) => console.log(receipt));

    
    const dugCoint = new web3.eth.Contract(TOKEN_CONTRACT_ABI, TOKEN_ADDRESS);
    const SSCoin = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS_SS);
    const totalDugSupp = await dugCoint.methods.totalSupply().call();
    const totalSSSup = await SSCoin.methods.totalSupply().call();
    await dugCoint.methods.approve(element.address, totalDugSupp).send({from: account});
    await SSCoin.methods.approve(element.address, totalSSSup).send({from: account});
    console.log('not allowance', totalDugSupp);
    console.log('not allowance', totalSSSup);
    const dug = await dugCoint.methods
      .allowance(account, element.address)
      .call();
    console.log("dug", dug);
    const ss = await SSCoin.methods.allowance(account, element.address).call();
    console.log("ss", ss);
  };

  return (
    <Grid templateRows={`repeat(6,1fr)`}>
      <GridItem>
        <Heading as="h3">Account</Heading>
        {account ? account : "Not connected yet!!"}
      </GridItem>
      <GridItem>
        <Heading as="h3">Balance</Heading>
        {balance ? balance : 0}
        <Grid templateColumns={`repeat(6,1fr)`}>
          <GridItem>
            <Button colorScheme={`teal`} onClick={transformBalanceDogun}>
              transform to dogun
            </Button>
          </GridItem>
          <GridItem>
            <Button colorScheme={`teal`} onClick={transformBalanceEther}>
              transform to ether
            </Button>
          </GridItem>
        </Grid>
      </GridItem>

      <GridItem>
        <Heading as="h3">Send Ether to contract</Heading>
        <Input
          sx={{ maxWidth: "500px", marginRight: "5px" }}
          type={`number`}
          className="send"
          placeholder="ether send (Ether)"
        />
        <Button onClick={sendEtherHandleClick}>Send Ether to contract</Button>
      </GridItem>

      <GridItem>
        <Heading as="h3">Get Ether From contract</Heading>
        <Input
          sx={{ maxWidth: "500px", marginRight: "5px" }}
          type={`number`}
          className="get"
          placeholder="ether get (Ether)"
        />
        <Button onClick={getEtherHandleClick}>Get Ether From contract</Button>
      </GridItem>
      <GridItem>
        <Heading as="h3">Transfer zone</Heading>
        DUG:{" "}
        <Input
          sx={{ maxWidth: "400px", marginRight: "5px" }}
          type={`number`}
          className="swap"
          placeholder="Amount (DUG)"
        />
        <Button onClick={SwapOnClick}>SWAP ETH with DUG</Button>
        <br />
        <br />
        Ether:{" "}
        <Input
          sx={{ maxWidth: "400px", marginRight: "5px" }}
          type={`number`}
          className="swap"
          placeholder="Amount (ETH)"
        />
        <Button onClick={SwapOnClickETH}>SWAP DUG with ETH</Button>
      </GridItem>
      <GridItem>
        <Heading as="h3">Pooling</Heading>
        <Table variant={`simple`}>
          <TableCaption>Pooling in system</TableCaption>
          <Thead>
            <Tr>
              <Th>DUO</Th>
              <Th>Address</Th>
              <Th>Approve</Th>
            </Tr>
          </Thead>
          <Tbody>
            {OPTIONS_POOLING.map((item, index) => (
              <Tr
                key={index + 1}
                sx={{
                  _hover: {
                    bgColor: "whitesmoke",
                    cursor: "pointer",
                  },
                }}
                
              >
                <Th>{item.name}</Th>
                <Th>{item.address}</Th>
                <Th>
                  <Button
                    colorScheme={`whatsapp`}
                    onClick={() => ApproveToContract(item)}
                  >
                    Approve token
                  </Button>
                </Th>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </GridItem>
    </Grid>
  );
};

export default WalletCard;
