/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import Web3 from "web3";
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

import { FACTORY_ABI, FACTORY_ADDRESS } from "../../abi/Utils/Factory";
import { ROUTER_ADDRESS, ROUTER_ABI } from "../../abi/Utils/Factory";

// tokens
import { ADDRESS_TOKEN_SLT, ABI_TOKEN_SLT } from "../../abi/tokens/SLTTokens";
import { TOKEN_ABI_SS, TOKEN_ADDRESS_SS } from "../../abi/tokens/SSTokens";

const CreatePoolPage = () => {
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

  const OnClickCreatePair = async () => {
    const factory = new web3.eth.Contract(FACTORY_ABI, FACTORY_ADDRESS);
    console.log("factory", factory);
    const token1 = document.getElementsByClassName("token")[0].value;
    const token2 = document.getElementsByClassName("token")[1].value;
    await factory.methods
      .createPair(token1, token2)
      .send({ from: account })
      .then((rep) => console.log(rep));

    const listPair = await factory.methods.allPairsLength().call();

    console.log(listPair);
    // console.log("after create pair", listPair);
    // const router = new web3.eth.Contract(ROUTER_ABI, ROUTER_ADDRESS);
    // console.log("router", router);
  };

  return (
    <Container>
      <Container centerContent>
        <Heading as="h3">Create new Pool</Heading>
        <Box
          borderWidth={"2px"}
          w={`90%`}
          borderRadius={`lg`}
          sx={{ marginTop: "50px", padding: "30px" }}
        >
          <Grid templateRows={"repeat(1,1fr)"} gap={3}>
            <GridItem>
              <Heading as="h3" size={"xs"} sx={{ margin: "4px" }}>
                Create Pool
              </Heading>
            </GridItem>
            <GridItem alignContent={"center"} justifyContent={"center"}>
              <InputGroup>
                <Input
                  className="token"
                  sx={{ maxWidth: "90%" }}
                  placeholder="Address's token 1"
                />
                <InputRightAddon children="0x...." />
              </InputGroup>
              {/* <Text as={`sub`}>Balance: {balance} (DUG)</Text> */}
            </GridItem>
            <GridItem>
              <InputGroup>
                <Input
                  className="token"
                  sx={{ maxWidth: "90%" }}
                  placeholder="Address's token 2"
                />
                <InputRightAddon children="0x...." />
              </InputGroup>
            </GridItem>
            <GridItem>
              <Button colorScheme={`whatsapp`} onClick={OnClickCreatePair}>
                Click for contract infor
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </Container>
  );
};

export default CreatePoolPage;
