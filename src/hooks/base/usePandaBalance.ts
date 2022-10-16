import BigNumber from 'bignumber.js'
import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getBalance } from 'utils/erc20'
import useBao from './useBao'

const usePandaBalance = (tokenAddress: string, userAddress: string) => {
	const [balance, setBalance] = useState(new BigNumber(0))
	const { account } = useWeb3React()
	const bao = useBao()

	const fetchBalance = useCallback(async () => {
		if (tokenAddress === 'ETH') {
			const ethBalance = await bao.web3.eth.getBalance(userAddress)
			return setBalance(new BigNumber(ethBalance))
		}

		const balance = await getBalance(bao, tokenAddress, userAddress)
		setBalance(new BigNumber(balance))
	}, [])

	useEffect(() => {
		if (account && bao && tokenAddress) {
			fetchBalance()
		}
	}, [])

	return balance
}

export default usePandaBalance
