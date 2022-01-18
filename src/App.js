import logo from './logo.svg';
import './App.css';
import WalletCard from './WalletCard';
import { MoralisProvider } from 'react-moralis';


const App = () => {
  return (
    <div className="App">
      {/* <MoralisProvider appId='ujTxo8V1mnyiXdaB63QizG2Ot4l8IYzdyHHlJP8l' serverUrl='https://cljgwxnm7r7m.usemoralis.com:2053/server'> */}
        <WalletCard/>
      {/* </MoralisProvider> */}
    </div> 
  );
}

export default App;
