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
  InputGroup,
  InputRightAddon,
  Text,
} from "@chakra-ui/react";

import { ADDRESS_POOL, ABI_POOL } from "../../abi/pools/DUB_SS";
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
    const dug = document.getElementsByClassName("withdraw")[0].value;
    const ss = document.getElementsByClassName("withdraw")[1].value;
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
      <Box
        borderWidth={"2px"}
        w={`90%`}
        borderRadius={`lg`}
        sx={{ marginTop: "50px", padding: "30px" }}
      >
        <Grid templateRows={"repeat(1,1fr)"} gap={3}>
          <GridItem>
            <Heading as="h3" size={"xs"} sx={{ margin: "4px" }}>
              Withdraw DUG & SS
            </Heading>
          </GridItem>
          <GridItem alignContent={"center"} justifyContent={"center"}>
            <InputGroup>
              <Input className="withdraw" sx={{ maxWidth: "90%" }} />
              <InputRightAddon children="DUG" />
            </InputGroup>
            <Text as={`sub`} >Balance: {balance} (DUG)</Text>
          </GridItem>
          <GridItem>
          <InputGroup>
              <Input className="withdraw" sx={{ maxWidth: "90%" }} />
              <InputRightAddon children="SS" />
            </InputGroup>
          </GridItem>
          <GridItem>
            <Button
              onClick={OnClickSwap}
              colorScheme={`red`}
              isFullWidth={true}
            >
              Withdraw
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );
};

export default WithdrawPage;
