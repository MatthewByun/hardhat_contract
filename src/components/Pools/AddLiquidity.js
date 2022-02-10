/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
import { TOKEN_ABI } from "../../abi/Utils/erc20";
import { ROUTER_ABI, ROUTER_ADDRESS } from "../../abi/Utils/Router";
import { PAIR_ABI } from "../../abi/Utils/Pair";
import Web3 from "web3";

const AddLiquidityPage = () => {
  const web3 = new Web3(Web3.givenProvider);
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState();
  const [token1, setToken1] = useState();
  const [token2, setToken2] = useState();
  const { pair } = useParams();

  useEffect(() => {
    (async () => {
      const acc =
        (await web3.eth.getAccounts()) && (await web3.eth.requestAccounts());
      const bal = await web3.eth.getBalance(acc[0]);
      setAccount(acc[0]);
      setBalance(bal);

      const pairContract = new web3.eth.Contract(PAIR_ABI, pair);
      let token0 = await pairContract.methods.token0().call();
      let token1 = await pairContract.methods.token1().call();
      setToken1(token0);
      setToken2(token1);
    })();
  }, []);

  const OnClickAddLiquidity = async () => {
    const contract = new web3.eth.Contract(ROUTER_ABI, ROUTER_ADDRESS);
    const tokenContract_1 = new web3.eth.Contract(TOKEN_ABI, token1);
    const tokenContract_2 = new web3.eth.Contract(TOKEN_ABI, token2);

    console.log(contract);
    let amount1 =
      document.getElementsByClassName("liquidity")[0].value * 10 ** 18;
    let amount2 =
      document.getElementsByClassName("liquidity")[1].value * 10 ** 18;

    let amount1Min = 5 * 10 ** 18;
    let amount2Min = 10 * 10 ** 18;
    await tokenContract_1.methods
      .approve(ROUTER_ADDRESS, amount1.toString())
      .send({ from: account })
      .then((rep) => console.log(rep));
    await tokenContract_2.methods
      .approve(ROUTER_ADDRESS, amount2.toString())
      .send({ from: account })
      .then((rep) => console.log(rep));
    await contract.methods
      .addLiquidity(
        token1,
        token2,
        amount1.toString(),
        amount2.toString(),
        amount1Min.toString(),
        amount2Min.toString(),
        account,
        2000000000
      )
      .send({ from: account })
      .then((rep) => console.log(rep));
  };

  return (
    <Container centerContent>
      <Heading as="h3">Add Liquidity from Pool</Heading>
      <Box
        borderWidth={"2px"}
        w={`90%`}
        borderRadius={`lg`}
        sx={{ marginTop: "50px", padding: "30px" }}
      >
        <Grid templateRows={"repeat(1,1fr)"} gap={3}>
          <GridItem>
            <Heading as="h3" size={"xs"} sx={{ margin: "4px" }}>
              Add Liquidity
            </Heading>
          </GridItem>
          <GridItem alignContent={"center"} justifyContent={"center"}>
            <Text as={`sub`}>Token 1: {token1} </Text>
            <InputGroup>
              <Input className="liquidity" sx={{ maxWidth: "90%" }} />
              <InputRightAddon children="...." />
            </InputGroup>
          </GridItem>
          <GridItem>
            <Text as={`sub`}>Token 2: {token2} </Text>
            <InputGroup>
              <Input className="liquidity" sx={{ maxWidth: "90%" }} />
              <InputRightAddon children="..." />
            </InputGroup>
          </GridItem>
          <GridItem>
            <Button
              onClick={OnClickAddLiquidity}
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

export default AddLiquidityPage;
