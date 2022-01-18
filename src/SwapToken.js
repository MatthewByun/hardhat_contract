import React from 'react'
const Moralis = require('moralis');

function SwapToken() {
    
    function login() {
        Moralis.authenticate().then(function (user) {
            console.log(user.get('ethAddress'))
        })
    }

    async function getSupportedTokens() {
        const tokens = await Moralis.Plugins.oneInch.getSupportedTokens({
          chain: 'bsc', // The blockchain you want to use (eth/bsc/polygon)
        });
        console.log(tokens);
    }

    

    async function getQuote() {
        const quote = await Moralis.Plugins.oneInch.quote({
          chain: 'bsc', // The blockchain you want to use (eth/bsc/polygon)
          fromTokenAddress: '0x0da6ed8b13214ff28e9ca979dd37439e8a88f6c4', // The token you want to swap
          toTokenAddress: '0x6fd7c98458a943f469e1cf4ea85b173f5cd342f4', // The token you want to receive
          amount: '1000',
        });
        console.log(quote);
      }

      async function hasAllowance() {
        const allowance = await Moralis.Plugins.oneInch.hasAllowance({
          chain: 'bsc', // The blockchain you want to use (eth/bsc/polygon)
          fromTokenAddress: '0x0da6ed8b13214ff28e9ca979dd37439e8a88f6c4', // The token you want to swap
          fromAddress: '0x6217e65d864d77DEcbFF0CFeFA13A93f7C1dD064', // Your wallet address
          amount: '1000',
        });
        console.log(`The user has enough allowance: ${allowance}`);
      }

    //   async function approve() {
    //     await Moralis.Plugins.oneInch.approve({
    //       chain: 'eth', // The blockchain you want to use (eth/bsc/polygon)
    //       tokenAddress: '0x15dd695e8123059e50fa998c6aa9b37533a25315', // The token you want to swap
    //       fromAddress: '0x2F79E362d3cbc6456222280AEa009c2D38f55b30', // Your wallet address
    //     });
    //     console.log(Moralis.Plugins)
    //   }


    return (
        <div>
            <button onClick={login}>LogGIn</button>
            <button onClick={getQuote}>getQuote</button>
            <button onClick={getSupportedTokens}>getSupportedTokens</button>
            {/* <button onClick={login}>LogGIn</button> */}
        </div>
    )
}

export default SwapToken
