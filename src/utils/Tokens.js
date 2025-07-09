import cryptoIcons from "./cryptoIcons"
import {ethers} from "ethers"
const tokens = [
    {
      name: "Tether USD",
      symbol: "USDT",
      isNative: true,
      forChart: "tether",
      forDataBase: "USDT",
      logUri: cryptoIcons.USDT,
      network: { 
        Ethereum: {
          address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
          logUri: cryptoIcons.ETH,
          chainId: 1
        },
        Arbitrum: {
          address: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
          logUri: cryptoIcons.ARB,
          chainId: 42161
        },
        Polygon: {
          address: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
          logUri: cryptoIcons.POL,
          chainId: 137
        },
        Avalanche: {
          address: "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",
          logUri: cryptoIcons.AVA,
          chainId: 43114
        },
        zkSync: {
          address: "0x493257fD37EDB34451f62EDf8D2a0C418852bA4C",
          logUri: cryptoIcons.ZKS,
          chainId: 324
        },
      },
    },
    {
      name: "USD Coin",
      symbol: "USDC",
      isNative: true,
      forChart: "usd-coin",
      forDataBase: "USDT",
      logUri: cryptoIcons.USDC,
      network: {
        Ethereum: {
          address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
          logUri: cryptoIcons.ETH,
          chainId: 1
        },
        Arbitrum: {
          address: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
          logUri: cryptoIcons.ARB,
          chainId: 42161
        },
        Polygon: {
          address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
          logUri: cryptoIcons.POL,
          chainId: 137
        },
        Avalanche: {
          address: "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6e",
          logUri: cryptoIcons.AVA,
          chainId: 43114
        },
        zkSync: {
          address: "0x1d17CBcF0D6D143135aE902365D2E5e2A16538D4",
          logUri: cryptoIcons.ZKS,
          chainId: 324
        },
        Base: {
          address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
          logUri: cryptoIcons.BAS,
          chainId: 8453
        },
      },
    },
    {
      name: "USD Coin (Bridged)",
      symbol: "USDC.e",
      isNative: false,
      forChart: "usd-coin",
      forDataBase: "USDC",
      logUri: cryptoIcons.USDC,
      network: {
        Avalanche: {
          address: "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664",
          logUri: cryptoIcons.AVA,
          chainId: 43114
        },
        Polygon: {
          address: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
          logUri: cryptoIcons.POL,
          chainId: 137
        },
        Arbitrum: {
          address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
          logUri: cryptoIcons.ARB,
          chainId: 42161
        },
        zkSync: {
          address: "0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4",
          logUri: cryptoIcons.ZKS,
          chainId: 324
        },
      },
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      isNative: true,
      forChart: "ethereum",
      forDataBase: "ETH",
      logUri: cryptoIcons.ETH,
      network: {
        Ethereum: {
          address: ethers.ZeroAddress,
          logUri: cryptoIcons.ETH,
          chainId: 1
        }, // Native ETH, no contract address
        Arbitrum: {
          address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
          logUri: cryptoIcons.ARB,
          chainId: 42161
        }, // WETH on Arbitrum
        Polygon: {
          address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
          logUri: cryptoIcons.POL,
          chainId: 137
        }, // WETH on Polygon
        Avalanche: {
          address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
          logUri: cryptoIcons.AVA,
          chainId: 43114
        }, // WETH.e on Avalanche
        zkSync: {
          address: "0x5aea5775959fbc2557cc8789bc1bf90a239d9a91",
          logUri: cryptoIcons.ZKS,
          chainId: 324
        }, // WETH on zkSync
        Base: {
          address: "0x4200000000000000000000000000000000000006",
          logUri: cryptoIcons.BAS,
          chainId: 8453
        }, // WETH on Base
        SepoliaTestnet:{
          address: ethers.ZeroAddress,
          logUri: cryptoIcons.SEP,
          chainId: 11155111
        }
      },
    },
    {
      name: "Wrapped Ether",
      symbol: "WETH.e",
      isNative: true,
      forChart: "ethereum",
      forDataBase: "WETH",
      logUri: cryptoIcons.WETH,
      network: {
        Avalanche: {
          address: "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
          logUri: cryptoIcons.AVA,
          chainId: 43114
        }, // WETH.e on Avalanche
      },
    },
    
        {
      name: "Wrapped Ether",
      symbol: "WETH",
      isNative: true,
      forChart: "ethereum",
      forDataBase: "WETH",
      logUri: cryptoIcons.WETH,
      network: {
        Arbitrum: {
          address: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
          logUri: cryptoIcons.ARB,
          chainId: 42161
        }, // WETH on Arbitrum
        Polygon: {
          address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
          logUri: cryptoIcons.POL,
          chainId: 137
        }, // WETH on Polygon
        zkSync: {
          address: "0x5aea5775959fbc2557cc8789bc1bf90a239d9a91",
          logUri: cryptoIcons.ZKS,
          chainId: 324
        }, // WETH on zkSync
        Base: {
          address: "0x4200000000000000000000000000000000000006",
          logUri: cryptoIcons.BAS,
          chainId: 8453
        }, // WETH on Base
        SepoliaTestnet:{
          address: "0xdd13e55209fd76afe204dbda4007c227904f0a81",
          logUri: cryptoIcons.SEP,
          chainId: 11155111
        }
      },
    },
    {
      name: "Wrapped Bitcoin",
      symbol: "WBTC",
      isNative: false,
      forChart: "wrapped-bitcoin",
      forDataBase: "WBTC",
      logUri: cryptoIcons.WBTC,
      network: {
        Ethereum: {
          address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
          logUri: cryptoIcons.ETH,
          chainId: 1
        },
        Arbitrum: {
          address: "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
          logUri: cryptoIcons.ARB,
          chainId: 42161
        },
        Polygon: {
          address: "0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
          logUri: cryptoIcons.POL,
          chainId: 137
        },
        Avalanche: {
          address: "0x50b7545627a5162f82a992c33b87adc75187b218",
          logUri: cryptoIcons.AVA,
          chainId: 43114
        },
        zkSync: {
          address: "0xBBeB516fb02a01611cBBE0453Fe3c580D7281011",
          logUri: cryptoIcons.ZKS,
          chainId: 324
        },
        Base: {
          address: "0x0555e30da8f98308edb960aa94c0db47230d2b9c",
          logUri: cryptoIcons.BAS,
          chainId: 8453
        },
      },
    },
    {
      name: "Binance Coin",
      symbol: "BNB",
      isNative: true,
      forChart: "binancecoin",
      forDataBase: "BNB",
      logUri: cryptoIcons.BNB,
      network: {
        Ethereum: {
          address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
          logUri: cryptoIcons.ETH,
          chainId: 1
        },
        BNBChain: null, // Native BNB, no contract address
      },
    },
    {
      name: "Dai StableCoin",
      symbol: "DAI",
      isNative: true,
      forChart:"dai",
      forDataBase: "DAI",
      logUri: cryptoIcons.DAI,
      network:{
        SepoliaTestnet:{
          address: "0x3e622317f8C93f7328350cF0B56d9eD4C620C5d6",
          logUri: cryptoIcons.SEP,
          chainId: 11155111
        }
      }
    },
    {
      name: "Link",
      symbol: "LINK",
      forChart:"chainlink",
      forDataBase: "LINK",
      isNative: false,
      logUri: cryptoIcons.LINK,
      network:{
        SepoliaTestnet:{
          address: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
          logUri: cryptoIcons.SEP,
          chainId: 11155111
        }
      }
    }
];
export default tokens;
