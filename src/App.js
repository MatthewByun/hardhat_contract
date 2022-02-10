import "./App.css";
import WalletCard from "./components/WalletCard/WalletCard";
import Deposit from "./components/Swapper/Deposit";
import Swapper from "./components/Swapper/Swap";
import Withdraw from "./components/Swapper/Withdraw";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import CreatePool from "./components/Pools/CreatePool";
import AddLiquidityPage from "./components/Pools/AddLiquidity";
import SwapExactTokenPage from "./components/Pools/SwapExact";

const App = () => {
  return (
    <div className="container">
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<WalletCard />} exact />
          <Route path="/deposit" element={<Deposit />} />
          {/* <Route path="/swap" element={<Swapper />} /> */}
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/create-pool" element={<CreatePool />} />
          <Route path="/addLiquidity/:pair" element={<AddLiquidityPage />} />
          <Route path="/swapLiquidity/:pair" element={<SwapExactTokenPage />} />
        </Routes>
      </ChakraProvider>
    </div>
  );
};

export default App;
