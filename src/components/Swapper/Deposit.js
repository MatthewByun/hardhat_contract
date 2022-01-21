/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { TOKEN_CONTRACT_ABI, TOKEN_ADDRESS } from "../../MyContractAbi";
import {
  Box,
  Button,
  Input,
  Container,
  Grid,
  GridItem,
  Heading,
} from "@chakra-ui/react";
import { TOKEN_ABI, TOKEN_ADDRESS_SS } from "../../abi/tokens/SSTokens";

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
      <Heading as='h3'>Deposit to Pool</Heading>
      <Box borderWidth={"2px"} borderRadius={`lg`} sx={{ marginTop: "50px" }}>
        <Grid templateRows={"repeat(2,1fr)"} gap={3}>
          <GridItem sx={{ marginTop: "30px" }}>
            <Heading as="h4" size={"sm"}>
              DUG deposit:
            </Heading>
            <Input className="deposit" />
          </GridItem>
          <GridItem>
            <Heading as="h4" size={"sm"}>
              SS deposit:
            </Heading>
            <Input className="deposit" />
          </GridItem>
          <GridItem alignContent={`center`}>
            <Button onClick={OnClickDeposit} colorScheme={`red`}>
              Deposit
            </Button>
            <Button onClick={OnClickDeposit}>
              Cancel
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );
};

export default DepositPage;
