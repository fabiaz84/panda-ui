import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getBalance } from 'utils/erc20'
import useBao from './useBao'
import useTransactionProvider from './useTransactionProvider'

const usePandaLPBalance = (tokenAddress: string) => {
	const [balance, setBalance] = useState(new BigNumber(0))
	const { account } = useWeb3React()
	const bao = useBao()
	const { transactions } = useTransactionProvider()

	const fetchBalance = useCallback(async () => {
		if (tokenAddress === 'ETH') {
			const ethBalance = await bao.web3.eth.getBalance('0x97f6665ac6b2d7C3d5a2aD11d7a779787F617ce0')
			return setBalance(new BigNumber(ethBalance))
		}

		const balance = await getBalance(bao, tokenAddress, '0x97f6665ac6b2d7C3d5a2aD11d7a779787F617ce0')
		setBalance(new BigNumber(balance))
	}, [transactions, '0x97f6665ac6b2d7C3d5a2aD11d7a779787F617ce0', bao, tokenAddress])

	useEffect(() => {
		if (account && bao && tokenAddress) {
			fetchBalance()
		}
	}, [transactions, '0x97f6665ac6b2d7C3d5a2aD11d7a779787F617ce0', bao, setBalance, tokenAddress])

	return balance
}

export default usePandaLPBalance
