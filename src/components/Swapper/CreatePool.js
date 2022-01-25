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
import { FACTORY_ABI, FACTORY_ADDRESS } from "../../abi/Utils/abi_Factory";
import { ROUTER_ADDRESS, ROUTER_ABI } from "../../abi/Utils/abi_Router";

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

  const HandleCreatePool = async () => {
    const factory = new web3.eth.Contract(FACTORY_ABI, FACTORY_ADDRESS);
    const router = new web3.eth.Contract(ROUTER_ABI, ROUTER_ADDRESS);
    const slp = new web3.eth.Contract(ABI_TOKEN_SLT, ADDRESS_TOKEN_SLT);
    const ss = new web3.eth.Contract(TOKEN_ABI_SS, TOKEN_ADDRESS_SS);

    const pairAddress = await factory.methods
      .createPair(ADDRESS_TOKEN_SLT, TOKEN_ADDRESS_SS)
      .call();
    console.log(pairAddress)
    
  };

  return <Container centerContent></Container>;
};

export default CreatePoolPage;
