import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWeb3React } from '@web3-react/core'
import Config from 'bao/lib/config'
import BigNumber from 'bignumber.js'
import { SubmitButton } from 'components/Button/Button'
import useBao from 'hooks/base/useBao'
import useTransactionHandler from 'hooks/base/useTransactionHandler'
import React, { useMemo } from 'react'
import { decimate, exponentiate } from 'utils/numberFormat'
import { useRhinoSwapWithdrawableBalance } from '../../../hooks/base/useWithdrawableBalance'

const maxValues = 'test'

const RhinoWithdrawButton: React.FC<RhinoWithdrawButtonProps> = ({ swapDirection }: RhinoWithdrawButtonProps) => {
	const bao = useBao()
	const { account } = useWeb3React()
	const { pendingTx, handleTx } = useTransactionHandler()
	const withdrawableBalance = useRhinoSwapWithdrawableBalance()

	const handleClick = async () => {
		if (!bao) return

		const RhinoContract = bao.getContract('rhinoSwap')
		if (swapDirection) {
			// PNDA->Rhino
			if (withdrawableBalance.gt(0))
				handleTx(RhinoContract.methods.withdraw(Config.addressMap.Rhino).send({ from: account }), 'RhinoSwap: Withdraw Rhino')
		} else {
			// Rhino->PNDA
			if (withdrawableBalance.gt(0))
				handleTx(RhinoContract.methods.withdraw(Config.addressMap.PNDA).send({ from: account }), 'RhinoSwap: Withdraw PNDA')
		}
	}

	const buttonText = () => {
		if (pendingTx) {
			return typeof pendingTx === 'string' ? (
				<a href={`${Config.defaultRpc.blockExplorerUrls}/tx/${pendingTx}`} target='_blank' rel='noreferrer'>
					Pending Transaction <FontAwesomeIcon icon={faExternalLinkAlt} />
				</a>
			) : (
				'Pending Transaction'
			)
		} else {
			if (swapDirection) {
				return withdrawableBalance.gt(0) ? 'Withdraw Rhino' : 'No deposit'
			} else {
				return withdrawableBalance.gt(0) ? 'Withdraw PNDA' : 'No deposit'
			}
		}
	}

	return <SubmitButton onClick={handleClick}>{buttonText()}</SubmitButton>
}

type RhinoWithdrawButtonProps = {
	swapDirection: boolean
}

export default RhinoWithdrawButton
