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
import { exponentiate } from 'utils/numberFormat'

const BambooButton: React.FC<BambooButtonProps> = ({ swapDirection, inputVal, maxValues }: BambooButtonProps) => {
	const bao = useBao()
	const { account } = useWeb3React()
	const { pendingTx, handleTx } = useTransactionHandler()

	const inputAApproval = useAllowancev2(Config.addressMap.PNDA, Config.contracts.bambooBar[Config.networkId].address)
	const inputBApproval = useAllowancev2(Config.addressMap.Bamboo, Config.contracts.bambooBar[Config.networkId].address)

	const handleClick = async () => {
		if (!bao) return

		const BambooContract = bao.getContract('bambooBar')
		if (swapDirection) {
			// PNDA->Bamboo
			if (!inputBApproval.gt(0)) {
				const tokenContract = bao.getNewContract('erc20.json', Config.addressMap.Bamboo)
				return handleTx(approvev2(tokenContract, BambooContract, account), 'Bar: Approve Bamboo')
			}

			handleTx(BambooContract.methods.leave(exponentiate(inputVal).toString()).send({ from: account }), 'Bar: Swap Bamboo to PNDA')
		} else {
			// DAI->baoUSD
			if (!inputAApproval.gt(0)) {
				const tokenContract = bao.getNewContract('erc20.json', Config.addressMap.PNDA)
				return handleTx(approvev2(tokenContract, BambooContract, account), 'Bar: Approve PNDA')
			}

			handleTx(BambooContract.methods.enter(exponentiate(inputVal).toString()).send({ from: account }), 'Bar: Swap PNDA to Bamboo')
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
				return inputBApproval.gt(0) ? 'Unstake Bamboo and receive PNDA' : 'Approve Bamboo'
			} else {
				return inputAApproval.gt(0) ? 'Stake PNDA and receive Bamboo' : 'Approve PNDA'
			}
		}
	}

	const isDisabled = useMemo(
		() =>
			typeof pendingTx === 'string' ||
			pendingTx ||
			new BigNumber(inputVal).isNaN() ||
			new BigNumber(inputVal).gt(maxValues[swapDirection ? 'Unstake' : 'Stake']),
		[pendingTx, inputVal, swapDirection],
	)

	return (
		<SubmitButton onClick={handleClick} disabled={isDisabled}>
			{buttonText()}
		</SubmitButton>
	)
}

type BambooButtonProps = {
	swapDirection: boolean
	inputVal: string
	maxValues: { [key: string]: BigNumber }
}

export default BambooButton
