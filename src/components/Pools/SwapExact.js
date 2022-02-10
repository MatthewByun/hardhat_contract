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
import { ADDRESS_TOKEN_SLT, ABI_TOKEN_SLT } from "../../abi/tokens/SLTTokens";
import { TOKEN_ADDRESS_SS, TOKEN_ABI_SS } from "../../abi/tokens/SSTokens";
import { ROUTER_ABI, ROUTER_ADDRESS } from "../../abi/Utils/Router";
import { PAIR_ABI } from "../../abi/Utils/Pair";
import Web3 from "web3";
import { ethers } from "ethers";

const SwapExactTokenPage = () => {
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

  const OnClickSwap = async () => {
    console.log("chay m ");
    const router = new web3.eth.Contract(ROUTER_ABI, ROUTER_ADDRESS);
    const amount1 = document.getElementsByClassName("swap")[0].value * 10**18;
    //  * 10 ** 18;
    console.log("amount", amount1);
    const pairContract = new web3.eth.Contract(PAIR_ABI, pair);
    const token1 = await pairContract.methods.token0().call();
    const token2 = await pairContract.methods.token1().call();
    console.log("tokens >>", TOKEN_ADDRESS_SS, token1);
    const SLTContract = new web3.eth.Contract(ABI_TOKEN_SLT, ADDRESS_TOKEN_SLT);
    const SSContract = new web3.eth.Contract(TOKEN_ABI_SS, TOKEN_ADDRESS_SS);
    await SSContract.methods.approve(ROUTER_ADDRESS, ethers.utils.parseUnits('5000', 18)).send({from: account});
    const allowance = await SSContract.methods.allowance(account, ROUTER_ADDRESS).call();
    console.log("allowance SS", allowance);
    console.log(
      ethers.utils.parseUnits('0',18)
    );
    // console.log("ethers test", ethers.utils.parseUnits(amount1.toString()), 18);
    console.log("router", router);
    const gas = await router.methods
      .swapExactTokensForTokens(
        ethers.utils.parseUnits(amount1.toString(), 18),
        // ethers.utils.parseUnits("0", 18),
        // amount1,
        "0",
        [token1, token2],
        account,
        Math.floor(Date.now() / 1000) + 60 * 300
      )
      .estimateGas({ from: account, gasLimit: 3000 });
    console.log("estimate gas done!!!", gas);
    await router.methods
      .swapExactTokensForTokens(
        ethers.utils.parseUnits(amount1.toString(), 18),
        ethers.utils.parseUnits("0", 18),
        [token1, token2],
        account,
        Math.floor(Date.now() / 1000) + 60 * 300
      )
      .send({ from: account, gasLimit: gas })
      .then((rep) => console.log(rep))
      .catch(console.log);
    console.log(router);
  };

  return (
    <Container centerContent>
      <Heading as="h3">Swap token</Heading>
      <Box
        borderWidth={"2px"}
        w={`90%`}
        borderRadius={`lg`}
        sx={{ marginTop: "50px", padding: "30px" }}
      >
        <Grid templateRows={"repeat(1,1fr)"} gap={3}>
          <GridItem>
            <Heading as="h3" size={"xs"} sx={{ margin: "4px" }}>
              Swap token
            </Heading>
          </GridItem>
          <GridItem alignContent={"center"} justifyContent={"center"}>
            <Text as={`sub`}>Token 1: {token1} </Text>
            <InputGroup>
              <Input className="swap" sx={{ maxWidth: "90%" }} />
              <InputRightAddon children="...." />
            </InputGroup>
          </GridItem>
          <GridItem>
            <Text as={`sub`}>Token 2: {token2} </Text>
            <InputGroup>
              <Input className="swap" sx={{ maxWidth: "90%" }} />
              <InputRightAddon children="..." />
            </InputGroup>
          </GridItem>
          <GridItem>
            <Button
              onClick={OnClickSwap}
              colorScheme={`red`}
              isFullWidth={true}
            >
              Swap
            </Button>
          </GridItem>
        </Grid>
      </Box>
    </Container>
  );
};

export default SwapExactTokenPage;
