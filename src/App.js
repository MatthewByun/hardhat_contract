import "./App.css";
import WalletCard from "./components/WalletCard/WalletCard";
import Deposit from "./components/Swapper/Deposit";
import Swapper from "./components/Swapper/Swap";
import Withdraw from "./components/Swapper/Withdraw";
import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Suspense } from "react";

const App = () => {
  return (
    <div className="container">
      <ChakraProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={WalletCard} />
            <Route exact path="/deposit" component={Deposit} />
            <Route exact path="/swap" component={Swapper} />
            <Route exact path="/withdraw" component={Withdraw} />
          </Switch>
        </Router>
      </ChakraProvider>
    </div>
  );
};

export default App;
