import { Config } from './types'

export default {
	networkId: 56,
	defaultRpc: {
		chainId: '0x38',
		rpcUrls: ['https://bsc-dataseed1.binance.org/'],
		blockExplorerUrls: ['https://bscscan.com'],
		chainName: 'Binance Smart Chain',
		nativeCurrency: {
			name: 'BNB',
			symbol: 'BNB',
			decimals: 18,
		},
	},
	addressMap: {
		uniswapFactory: '0x9Ad32bf5DaFe152Cbe027398219611DB4E8753B3',
		uniswapFactoryV2: '0x9Ad32bf5DaFe152Cbe027398219611DB4E8753B3',
		BAO: '0x47dcc83a14ad53ed1f13d3cae8aa4115f07557c0',
		PNDA: '0x47dcc83a14ad53ed1f13d3cae8aa4115f07557c0',
		DAI: '0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3',
		USDT: '0x55d398326f99059fF775485246999027B3197955',
		USDC: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
		WETH: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
		DEAD: '0x000000000000000000000000000000000000dead',
		Bamboo: '0xEF88e0d265dDC8f5E725a4fDa1871F9FE21B11E2',
		Rhino: '0xd2eca3cff5f09cfc9c425167d12f0a005fc97c8c',
		BNB: '0x47dcc83a14ad53ed1f13d3cae8aa4115f07557c0',

		/* //Synths
		baoUSD: '0x7945b0A6674b175695e5d1D08aE1e6F13744Abb0',
		// NFTs
		baoElder: '0x39c1f6e78c5200674c84c46dc5bf85ba9f6f630a',
		baoSwap: '0x36e58282a053f888881cdaa4ba4f44dc7af15024',
		Baskets
		bDEFI: '0x583cb488eF632c3A959Aa19EcF7991731a2F728e',
		bSTBL: '0x5ee08f40b637417bcC9d2C51B62F4820ec9cF5D8', */
	},
	contracts: {
		bao: {
			56: {
				address: '0x47dcc83a14ad53ed1f13d3cae8aa4115f07557c0',
				abi: 'bao.json',
			},
		},
		masterChef: {
			56: {
				address: '0x9942cb4c6180820E6211183ab29831641F58577A',
				abi: 'masterchef.json',
			},
		},
		weth: {
			56: {
				address: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
				abi: 'weth.json',
			},
		},
		wethPrice: {
			56: {
				address: '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
				abi: 'chainoracle.json',
			},
		},
		bambooBar: {
			56: {
				address: '0xEF88e0d265dDC8f5E725a4fDa1871F9FE21B11E2',
				abi: 'bamboobar.json',
			},
		},
		rhinoSwap: {
			56: {
				address: '0x745c8E1c0315162C33408454b48E53C9F178eB68',
				abi: 'rhinoswap.json',
			},
		},
		rhino: {
			56: {
				address: '0xd2eca3cff5f09cfc9c425167d12f0a005fc97c8c',
				abi: 'rhino.json',
			},
		},
		/* // Hard Synths
		comptroller: {
			1: {
				address: '0x0Be1fdC1E87127c4fe7C05bAE6437e3cf90Bf8d8',
				abi: 'comptroller.json',
			},
		},
		marketOracle: {
			1: {
				address: '0xEbdC2D2a203c17895Be0daCdf539eeFC710eaFd8',
				abi: 'marketOracle.json',
			},
		},
		stabilizer: {
			1: {
				address: '0x720282BB7e721634c95F0933636DE3171dc405de',
				abi: 'stabilizer.json',
			},
		},
		// NFT
		nft: {
			1: {
				address: '0x39c1f6e78c5200674c84c46dc5bf85ba9f6f630a',
				abi: 'nft.json',
			},
		},
		nft2: {
			1: {
				address: '0x36e58282a053f888881cdaa4ba4f44dc7af15024',
				abi: 'nft.json',
			},
		},
		// Baskets
		recipe: {
			1: {
				address: '0xac0fE9F363c160c281c81DdC49d0AA8cE04C02Eb',
				abi: 'simpleUniRecipe.json',
			},
		},
		lendingRegistry: { 
			1: {
				address: '0x08a2b7D713e388123dc6678168656659d297d397',
				abi: 'lendingRegistry.json',
			},
		},*/
	},
	subgraphs: {
		sushiExchange: {
			1: 'https://api.thegraph.com/subgraphs/name/sushiswap/exchange',
		},
		/*	baoBurn: {
				1: 'https://api.thegraph.com/subgraphs/name/clabby/bao-burn',
			},
			baoMarkets: {
				1: 'https://api.thegraph.com/subgraphs/name/baofinance/bao-markets',
			}, */
	},
	markets: [
		/*	{
				mid: 1,
				symbol: 'bdUSD',
				marketAddresses: {
					1: '0xc0601094C0C88264Ba285fEf0a1b00eF13e79347',
				},
				underlyingAddresses: {
					1: '0x7945b0A6674b175695e5d1D08aE1e6F13744Abb0',
				},
				isSynth: true,
				icon: 'assets/img/tokens/bUSD.png',
				coingeckoId: 'dai',
				underlyingDecimals: 18,
				underlyingSymbol: 'bUSD',
			},
			{
				mid: 4,
				symbol: 'bdETH',
				marketAddresses: {
					1: '0xF635fdF9B36b557bD281aa02fdfaeBEc04CD084A',
				},
				underlyingAddresses: {
					1: 'ETH',
				},
				icon: 'assets/img/tokens/ETH.png',
				coingeckoId: 'weth',
				underlyingDecimals: 18,
			},
			{
				mid: 2,
				symbol: 'bdETH',
				archived: true,
				marketAddresses: {
					1: '0xe7a52262C1934951207c5fc7A944A82D283C83e5',
				},
				underlyingAddresses: {
					1: 'ETH',
				},
				icon: 'assets/img/tokens/ETH.png',
				coingeckoId: 'weth',
				underlyingDecimals: 18,
			},
			{
				mid: 3,
				symbol: 'bdUSDC',
				marketAddresses: {
					1: '0x7749f9f3206A49d4c47b60db05716409dC3A4149',
				},
				underlyingAddresses: {
					1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
				},
				icon: 'assets/img/tokens/USDC.png',
				coingeckoId: 'usd-coin',
				underlyingDecimals: 6,
			},
			{
				mid: 5,
				symbol: 'bdSTBL',
				marketAddresses: {
					1: '0xE0a55c00E6510F4F7df9af78b116B7f8E705cA8F',
				},
				underlyingAddresses: {
					1: '0x5ee08f40b637417bcC9d2C51B62F4820ec9cF5D8',
				},
				icon: 'assets/img/tokens/bSTBL.png',
				coingeckoId: 'dai',
				underlyingDecimals: 18,
			},*/
	],
	baskets: [
		/*{
      nid: 1,
      basketAddresses: {
        1: '0x583cb488eF632c3A959Aa19EcF7991731a2F728e',
      },
      lpAddress: '0x84e5bf858Ee50bE323143dF88f2089827834b9cE',
      ovenAddress: '0x30DE1e1e4a42557f31F038E3B77672Afd4eAF7DF',
      symbol: 'bDEFI',
      name: 'bDEFI',
      icon: '/bDEFI.png',
      cgIds: {
        '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B': 'convex-finance',
        '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2': 'maker',
        '0xd533a949740bb3306d119cc777fa900ba034cd52': 'curve-dao-token',
        '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9': 'aave',
        '0x5a98fcbea516cf06857215779fd812ca3bef1b32': 'lido-dao',
        '0xc00e94cb662c3520282e6f5717214004a7f26888':
          'compound-governance-token',
        '0x6b3595068778dd592e39a122f4f5a5cf09c90fe2': 'sushi',
        '0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e': 'yearn-finance',
        '0x6DEA81C8171D0bA574754EF6F8b412F2Ed88c54D': 'liquity',
        '0x3432b6a60d23ca0dfca7761b7ab56459d9c964d0': 'frax-share',
        '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984': 'uniswap',
        '0xba100000625a3754423978a60c9317c58a424e3D': 'balancer',
      },
      pieColors: {
        aYFI: '#006AE3',
        MKR: '#63C3B2',
        CVX: '#3A3A3A',
        cAAVE: '#926BA8',
        LDO: '#00A3FF',
        LQTY: '#1442CC',
        UNI: '#FF047CFF',
        FXS: '#393835',
        cCOMP: '#00D395',
        xSUSHI: '#ea3fb4',
        BAL: '#1E1E1E',
        aCRV: '#F7E103',
      },
    },
		{
			nid: 1,
			basketAddresses: {
				1: '0x5ee08f40b637417bcC9d2C51B62F4820ec9cF5D8',
			},
			lpAddress: '0x562385758925CF0f1Cf3363124Fa9dED981d67e3',
			ovenAddress: '0x3F32068Fc7fff8d3218251561cd77EE2FefCb1A3',
			symbol: 'bSTBL',
			name: 'bSTBL',
			icon: 'assets/img/tokens/bSTBL.png',
			cgIds: {
				'0x03ab458634910aad20ef5f1c8ee96f1d6ac54919': 'rai',
				'0x6b175474e89094c44da98b954eedeac495271d0f': 'dai',
				'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48': 'usd-coin',
			},
			pieColors: {
				aRAI: '#1FC9A8',
				aDAI: '#F5AC37',
				aUSDC: '#2775CA',
			},
			desc: 'Low risk stablecoin basket',
			swap: 'https://curve.fi/factory-crypto/61',
		},*/
	],
	farms: [
		// Active pools
		{
			pid: 3,
			lpAddresses: {
				56: '0x97f6665ac6b2d7C3d5a2aD11d7a779787F617ce0',
			},
			tokenAddresses: {
				56: '0x47dcc83a14ad53ed1f13d3cae8aa4115f07557c0',
			},
			tokenDecimals: 18,
			name: 'PNDA-BNB PNDAV2',
			symbol: 'PNDAV2',
			type: 'PNDAV2',
			tokenSymbol: 'PNDA',
			poolType: 'active',
			iconA: 'pnda.png',
			iconB: 'bnb.png',
			refUrl: 'https://www.pandaswap.xyz/#/swap',
			pairUrl: '#',
		},
		{
			pid: 91,
			lpAddresses: {
				56: '0xa300526D664a0227c2fdFC0b423750E371Ab2ebD',
			},
			tokenAddresses: {
				56: '0x47dcc83a14ad53ed1f13d3cae8aa4115f07557c0',
			},
			tokenDecimals: 18,
			name: 'BAMBOO-BNB PNDAV2',
			symbol: 'PNDAV2',
			type: 'PNDAV2',
			tokenSymbol: 'Bamboo',
			poolType: 'active',
			iconA: 'bamboo.png',
			iconB: 'bnb.png',
			refUrl: 'https://www.pandaswap.xyz/#/swap',
			pairUrl: '#',
		},
		{
			pid: 92,
			lpAddresses: {
				56: '0x999fd87aA406adB81809bab15681f655d8a049FF',
			},
			tokenAddresses: {
				56: '0x47dcc83a14ad53ed1f13d3cae8aa4115f07557c0',
			},
			tokenDecimals: 18,
			name: 'RHINO-BNB PNDAV2',
			symbol: 'PNDAV2',
			type: 'PNDAV2',
			tokenSymbol: 'Rhino',
			poolType: 'active',
			iconA: 'rhino.png',
			iconB: 'bnb.png',
			refUrl: 'https://www.pandaswap.xyz/#/swap',
			pairUrl: '#',
		},
		{
			pid: 94,
			lpAddresses: {
				56: '0xEf8Af3ae4623E465124742E315Fc805a89e7146E',
			},
			tokenAddresses: {
				56: '0x47dcc83a14ad53ed1f13d3cae8aa4115f07557c0',
			},
			tokenDecimals: 18,
			name: 'PNDA-BNB (PANCAKE)',
			symbol: 'PNDAV2',
			type: 'PNDAV2',
			tokenSymbol: 'PNDA',
			poolType: 'active',
			iconA: 'pnda.png',
			iconB: 'bnb.png',
			refUrl: 'https://www.pandaswap.xyz/#/swap',
			pairUrl: '#',
		},
		/* {
			pid: 200,
			lpAddresses: {
				1: '0x0eee7f7319013df1f24f5eaf83004fcf9cf49245',
			},
			tokenAddresses: {
				1: '0x374cb8c27130e2c9e04f44303f3c8351b9de61c1',
			},
			tokenDecimals: 18,
			name: 'BAO-ETH SLP',
			symbol: 'SLP',
			type: 'SLP',
			tokenSymbol: 'BAO',
			poolType: 'active',
			iconA: 'BAO.png',
			iconB: 'WETH.png',
			refUrl: 'https://1inch.exchange/#/r/0x3bC3c8aF8CFe3dFC9bA1A57c7C3b653e3f6d6951/ETH/BAO',
			pairUrl: '#',
		},
		{
			pid: 201,
			lpAddresses: {
				1: '0x072b999fc3d82f9ea08b8adbb9d63a980ff2b14d',
			},
			tokenAddresses: {
				1: '0x374cb8c27130e2c9e04f44303f3c8351b9de61c1',
			},
			tokenDecimals: 18,
			name: 'BAO-USDC SLP',
			symbol: 'SLP',
			type: 'SLP',
			tokenSymbol: 'BAO',
			poolType: 'active',
			iconA: 'BAO.png',
			iconB: 'USDC.png',
			refUrl: 'https://1inch.exchange/#/r/0x3bC3c8aF8CFe3dFC9bA1A57c7C3b653e3f6d6951/ETH/BAO',
			pairUrl: '#',
		}, */
	],
} as Config
