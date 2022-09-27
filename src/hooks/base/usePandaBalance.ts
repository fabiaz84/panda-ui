import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getBalance } from 'utils/erc20'
import useBao from './useBao'
import useTransactionProvider from './useTransactionProvider'

const usePandaBalance = (tokenAddress: string) => {
	const [balance, setBalance] = useState(new BigNumber(0))
	const { account } = useWeb3React()
	const bao = useBao()
	const { transactions } = useTransactionProvider()

	const fetchBalance = useCallback(async () => {
		if (tokenAddress === 'ETH') {
			const ethBalance = await bao.web3.eth.getBalance('0xEF88e0d265dDC8f5E725a4fDa1871F9FE21B11E2')
			return setBalance(new BigNumber(ethBalance))
		}

		const balance = await getBalance(bao, tokenAddress, '0xEF88e0d265dDC8f5E725a4fDa1871F9FE21B11E2')
		setBalance(new BigNumber(balance))
	}, [transactions, '0xEF88e0d265dDC8f5E725a4fDa1871F9FE21B11E2', bao, tokenAddress])

	useEffect(() => {
		if (account && bao && tokenAddress) {
			fetchBalance()
		}
	}, [transactions, '0xEF88e0d265dDC8f5E725a4fDa1871F9FE21B11E2', bao, setBalance, tokenAddress])

	return balance
}

export default usePandaBalance
