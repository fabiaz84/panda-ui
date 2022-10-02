import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useWeb3React } from '@web3-react/core'
import Config from 'bao/lib/config'
import { approvev2 } from 'bao/utils'
import BigNumber from 'bignumber.js'
import { SubmitButton } from 'components/Button/Button'
import { SpinnerLoader } from 'components/Loader'
import useAllowancev2 from 'hooks/base/useAllowancev2'
import useBao from 'hooks/base/useBao'
import useTransactionHandler from 'hooks/base/useTransactionHandler'
import React, { useMemo } from 'react'
import { decimate, exponentiate } from 'utils/numberFormat'

const RhinoButton: React.FC<RhinoButtonProps> = ({ swapDirection, inputVal, maxValues }: RhinoButtonProps) => {
	const bao = useBao()
	const { account } = useWeb3React()
	const { pendingTx, handleTx } = useTransactionHandler()

	const inputAApproval = useAllowancev2(Config.addressMap.PNDA, Config.contracts.bambooBar[Config.networkId].address)
	const inputBApproval = useAllowancev2(Config.addressMap.Rhino, Config.contracts.bambooBar[Config.networkId].address)

	const handleClick = async () => {
		if (!bao) return

		const RhinoContract = bao.getContract('rhinoSwap')
		if (swapDirection) {
			// PNDA->Rhino
			if (!inputBApproval.gt(0)) {
				const tokenContract = bao.getNewContract('erc20.json', Config.addressMap.Rhino)
				return handleTx(approvev2(tokenContract, RhinoContract, account), 'RhinoSwap: Approve Rhino')
			}

			handleTx(
				RhinoContract.methods.deposit(Config.addressMap.Rhino, exponentiate(inputVal, 9).toString()).send({ from: account }),
				'RhinoSwap: Deposit Rhino',
			)
		} else {
			// Rhino->PNDA
			if (!inputAApproval.gt(0)) {
				const tokenContract = bao.getNewContract('erc20.json', Config.addressMap.PNDA)
				return handleTx(approvev2(tokenContract, RhinoContract, account), 'RhinoSwap: Approve PNDA')
			}

			handleTx(
				RhinoContract.methods.deposit(Config.addressMap.PNDA, exponentiate(inputVal).toString()).send({ from: account }),
				'RhinoSwap: Deposit PNDA',
			)
		}
	}

	const buttonText = () => {
		if (!(inputAApproval && inputBApproval)) return <SpinnerLoader />

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
				return inputBApproval.gt(0) ? 'Deposit Rhino' : 'Approve Rhino'
			} else {
				return inputAApproval.gt(0) ? 'Deposit PNDA' : 'Approve PNDA'
			}
		}
	}

	const isDisabled = useMemo(
		() =>
			typeof pendingTx === 'string' ||
			pendingTx ||
			new BigNumber(inputVal).isNaN() ||
			new BigNumber(inputVal).gt(maxValues[swapDirection ? 'Deposit' : 'Deposit']),
		[pendingTx, inputVal, swapDirection],
	)

	return (
		<SubmitButton onClick={handleClick} disabled={isDisabled}>
			{buttonText()}
		</SubmitButton>
	)
}

type RhinoButtonProps = {
	swapDirection: boolean
	inputVal: string
	maxValues: { [key: string]: BigNumber }
}

export default RhinoButton
