import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getBalance } from 'utils/erc20'
import useBao from './useBao'
import useTransactionProvider from './useTransactionProvider'

const useRhinoPandaBalance = (tokenAddress: string) => {
	const [balance, setBalance] = useState(new BigNumber(0))
	const { account } = useWeb3React()
	const bao = useBao()
	const { transactions } = useTransactionProvider()

	const fetchBalance = useCallback(async () => {
		if (tokenAddress === 'ETH') {
			const ethBalance = await bao.web3.eth.getBalance('0x745c8E1c0315162C33408454b48E53C9F178eB68')
			return setBalance(new BigNumber(ethBalance))
		}

		const balance = await getBalance(bao, tokenAddress, '0x745c8E1c0315162C33408454b48E53C9F178eB68')
		setBalance(new BigNumber(balance))
	}, [transactions, '0x745c8E1c0315162C33408454b48E53C9F178eB68', bao, tokenAddress])

	useEffect(() => {
		if (account && bao && tokenAddress) {
			fetchBalance()
		}
	}, [transactions, '0x745c8E1c0315162C33408454b48E53C9F178eB68', bao, setBalance, tokenAddress])

	return balance
}

export default useRhinoPandaBalance
