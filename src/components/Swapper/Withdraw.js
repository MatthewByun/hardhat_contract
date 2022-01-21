/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Input,
  Container,
  Grid,
  GridItem,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { TOKEN_ABI, TOKEN_ADDRESS_SS } from "../../abi/tokens/SSTokens";

import { ADDRESS_POOL, ABI_POOL } from "../../abi/pools/DUB_SS";
import { TOKEN_CONTRACT_ABI, TOKEN_ADDRESS } from "../../MyContractAbi";
import Web3 from "web3";

const WithdrawPage = () => {
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

  console.log(account);
  const OnClickSwap = async () => {
    const contract = new web3.eth.Contract(ABI_POOL, ADDRESS_POOL);
    // await contract.methods.
    const dug = document.getElementsByClassName("swap")[0].value;
    const ss = document.getElementsByClassName("swap")[1].value;
    // console.log(dug);
    // console.log(ss);
    // console.log(contract);
    // const dugCoint = new web3.eth.Contract(TOKEN_CONTRACT_ABI, TOKEN_ADDRESS);
    // const SSCoin = new web3.eth.Contract(TOKEN_ABI, TOKEN_ADDRESS_SS);
    // const totalDugSupp = await dugCoint.methods.totalSupply().call();
    // const totalSSSup = await SSCoin.methods.totalSupply().call();
    // await dugCoint.methods.approve(account, totalDugSupp).send({from: account});
    // await SSCoin.methods.approve(account, totalSSSup).send({from: account});

    await contract.methods
      .WithdrawCurrencyFromPool(
        `${dug}000000000000000000`,
        `${ss}000000000000000000`
      )
      .send({ from: account })
      .then((rep) => console.log(rep));
  };

  return (
    <Container centerContent>
      <Heading as="h3">Withdraw from Pool</Heading>
      <Box borderWidth={"2px"} borderRadius={`lg`} sx={{ marginTop: "50px" }}>
        <Grid templateRows={"repeat(2,1fr)"} gap={3}>
          <GridItem sx={{ marginTop: "30px" }}>
            <Heading as="h4" size={"sm"}>
              DUG withdraw:
            </Heading>
            <Input
              className="swap"
              sx={{ maxWidth: "90%", marginLeft: "5px" }}
            />
          </GridItem>
          <GridItem>
            <Heading as="h4" size={"sm"}>
              SS withdraw:
            </Heading>
            <Input className="swap" />
          </GridItem>
          <GridItem>
            <HStack spacing={`60px`}>
              <Button onClick={OnClickSwap} colorScheme={`red`}>
                Withdraw
              </Button>
              <Button>Cancel</Button>
            </HStack>
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );
};

export default WithdrawPage;
