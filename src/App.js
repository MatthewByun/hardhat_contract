import "./App.css";
import WalletCard from "./components/WalletCard/WalletCard";
import Deposit from "./components/Swapper/Deposit";
import Swapper from "./components/Swapper/Swap";
import Withdraw from "./components/Swapper/Withdraw";
import { ChakraProvider, Heading } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

const App = () => {
  return (
    <div className="container">
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<WalletCard />} exact/>
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/swap" element={<Swapper />} />
          <Route path="/withdraw" element={<Withdraw />} />
        </Routes>
      </ChakraProvider>
    </div>
  );
};

export default App;
