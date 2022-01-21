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

const DepositPage = () => {
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

  const OnClickDeposit = async() => {
    const contract = new web3.eth.Contract(ABI_POOL, ADDRESS_POOL);
    console.log(contract);
    const dug = document.getElementsByClassName("deposit")[0].value;
    const ss = document.getElementsByClassName("deposit")[1].value;
    await contract.methods
      .DepositCurrencyToPool(`${dug}000000000000000000`, `${ss}000000000000000000`)
      .send({ from: account })
      .then((rep) => console.log(rep));
  };
  return (
    <Container centerContent>
      <Heading as="h3">Deposit from Pool</Heading>
      <Box
        borderWidth={"2px"}
        w={`90%`}
        borderRadius={`lg`}
        sx={{ marginTop: "50px", padding: "30px" }}
      >
        <Grid templateRows={"repeat(1,1fr)"} gap={3}>
          <GridItem>
            <Heading as="h3" size={"xs"} sx={{ margin: "4px" }}>
              Deposit DUG & SS
            </Heading>
          </GridItem>
          <GridItem alignContent={"center"} justifyContent={"center"}>
            <InputGroup>
              <Input className="deposit" sx={{ maxWidth: "90%" }} />
              <InputRightAddon children="DUG" />
            </InputGroup>
            <Text as={`sub`} >Balance: {balance} (DUG)</Text>
          </GridItem>
          <GridItem>
          <InputGroup>
              <Input className="deposit" sx={{ maxWidth: "90%" }} />
              <InputRightAddon children="SS" />
            </InputGroup>
          </GridItem>
          <GridItem>
            <Button
              onClick={OnClickDeposit}
              colorScheme={`red`}
              isFullWidth={true}
            >
              Deposit
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );
};

export default DepositPage;
