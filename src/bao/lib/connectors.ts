import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { NetworkConnector } from '@web3-react/network-connector'

const RPC_URLS: { [chainId: number]: string } = {
	56: 'https://bsc-dataseed1.binance.org/',
}

export const injected = new InjectedConnector({ supportedChainIds: [56] })

export const network = new NetworkConnector({
	urls: { 56: 'https://bsc-dataseed1.binance.org/' },
	defaultChainId: 56,
})

export const walletConnect = new WalletConnectConnector({
	rpc: { 56: 'https://bsc-dataseed1.binance.org/' },
})

export const coinbaseWallet = new WalletLinkConnector({
	url: 'https://bsc-dataseed1.binance.org/',
	appName: 'bao-ui',
	supportedChainIds: [56],
})
