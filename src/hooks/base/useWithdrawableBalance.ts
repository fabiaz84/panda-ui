import { useCallback, useEffect, useMemo, useState } from 'react'

import { useWeb3React } from '@web3-react/core'

import { getRhinoStakingContract, getWithdrawableBalance, getRhinoContract, getBaoContract } from '../../bao/utils'
import BigNumber from 'bignumber.js'

import useBao from './useBao'

export const useRhinoSwapWithdrawableBalance = (): BigNumber => {
	const bao = useBao()
	const { account } = useWeb3React()
	const [withdrawableBalance, setWithdrawableBalance] = useState(new BigNumber(0))

	const rhinoStakingContract = getRhinoStakingContract(bao)

	const fetchRhinoWithdrawableBalance = useCallback(async () => {
		let balance = await getWithdrawableBalance(rhinoStakingContract, account, getRhinoContract(bao)?.options.address)
		if (balance.isGreaterThan(0)) {
			setWithdrawableBalance(new BigNumber(balance))
		} else {
			balance = await getWithdrawableBalance(rhinoStakingContract, account, getBaoContract(bao)?.options.address)
		}
		setWithdrawableBalance(new BigNumber(balance))
	}, [bao, account, rhinoStakingContract])

	useEffect(() => {
		if (account) {
			fetchRhinoWithdrawableBalance()
		}
	}, [account])

	return withdrawableBalance
}
