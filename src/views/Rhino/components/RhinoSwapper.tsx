import { faLongArrowAltRight, faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RhinoIcon from 'assets/img/tokens/rhino.png'
import pndaIcon from 'assets/img/tokens/pnda.png'
import Config from 'bao/lib/config'
import BigNumber from 'bignumber.js'
import { IconFlex } from 'components/Icon'
import { BalanceInput } from 'components/Input'
import { SpinnerLoader } from 'components/Loader'
import Tooltipped from 'components/Tooltipped'
import useBao from 'hooks/base/useBao'
import useTokenBalance from 'hooks/base/useTokenBalance'
import React, { useState } from 'react'
import { Badge, Card } from 'react-bootstrap'
import styled from 'styled-components'
import { decimate, getDisplayBalance } from 'utils/numberFormat'
import { AssetStack } from 'views/Markets/components/styles'
import RhinoButton from './RhinoButton'
import RhinoWithdrawButton from './RhinoWithdrawButton'
import useRhinoPandaBalance from 'hooks/base/useRhinoPandaBalance'

const ZERO = String(0)

const RhinoSwapper: React.FC = () => {
	const [swapDirection, setSwapDirection] = useState(false) // false = PNDA->Bamboo | true = Bamboo->PNDA
	const [inputVal, setInputVal] = useState('')

	const pndaBalance = useTokenBalance(Config.addressMap.PNDA)
	const rhino = useTokenBalance(Config.addressMap.Rhino)

	const bao = useBao()

	const pandaBalance = useRhinoPandaBalance(bao && bao.getContract('bao').options.address)
	const rhinoBalance = useRhinoPandaBalance(bao && bao.getContract('rhino').options.address)

	const pndaInput = (
		<>
			<BallastLabel>
				<FontAwesomeIcon icon={faLongArrowAltRight} /> Balance: {getDisplayBalance(pndaBalance).toString()} PNDA
				<span>Contract Reserves: {pandaBalance ? getDisplayBalance(pandaBalance).toString() : <SpinnerLoader />} </span>
			</BallastLabel>
			<BalanceInput
				onMaxClick={() => setInputVal(decimate(pndaBalance).toString())}
				onChange={(e: { currentTarget: { value: React.SetStateAction<string> } }) => setInputVal(e.currentTarget.value)}
				value={swapDirection && !new BigNumber(inputVal).isNaN() ? new BigNumber(ZERO).toString() : inputVal}
				disabled={swapDirection}
				label={
					<AssetStack>
						<IconFlex>
							<img src={pndaIcon} />
						</IconFlex>
					</AssetStack>
				}
			/>
		</>
	)

	const rhinoInput = (
		<>
			<BallastLabel>
				<FontAwesomeIcon icon={faLongArrowAltRight} /> Balance: {getDisplayBalance(rhino, 9).toString()} Rhino
				<span>Contract Reserves: {rhinoBalance ? getDisplayBalance(rhinoBalance, 9).toString() : <SpinnerLoader />} </span>
			</BallastLabel>
			<BalanceInput
				onMaxClick={() => setInputVal(decimate(rhino, 9).toString())}
				onChange={(e: { currentTarget: { value: React.SetStateAction<string> } }) => setInputVal(e.currentTarget.value)}
				value={!swapDirection && !new BigNumber(inputVal).isNaN() ? new BigNumber(ZERO).toFixed(0) : inputVal}
				disabled={!swapDirection}
				label={
					<AssetStack>
						<IconFlex>
							<img src={RhinoIcon} />
						</IconFlex>
					</AssetStack>
				}
			/>
		</>
	)

	return (
		<BallastSwapCard>
			<h2 style={{ textAlign: 'center' }}>
				<Tooltipped content='RhinoSwap is used to swap PNDA for Rhino.'>
					<a>
						<img width='90' height='90' src={RhinoIcon} />
					</a>
				</Tooltipped>
			</h2>
			{swapDirection ? rhinoInput : pndaInput}
			<SwapDirection>
				<SwapDirectionBadge pill onClick={() => setSwapDirection(!swapDirection)}>
					<FontAwesomeIcon icon={faSync} />
					{' - '}
				</SwapDirectionBadge>
			</SwapDirection>
			{swapDirection ? pndaInput : rhinoInput}
			<br />
			<RhinoButton swapDirection={swapDirection} inputVal={inputVal} maxValues={{ buy: decimate(pndaBalance), sell: decimate(rhino) }} />
			<RhinoWithdrawButton swapDirection={swapDirection} />
		</BallastSwapCard>
	)
}

const BallastSwapCard = styled(Card)`
	width: 720px;
	padding: 25px;
	margin: auto;
	background-color: ${props => props.theme.color.primary[100]};
	border-radius: ${props => props.theme.borderRadius}px;
	border: ${props => props.theme.border.default};

	label > span {
		float: right;
		margin-bottom: 0.25rem;
		color: ${props => props.theme.color.text[200]};
	}

	@media (max-width: ${props => props.theme.breakpoints.md}px) {
		width: 100%;
	}
`

const SwapDirection = styled.a`
	text-align: center;
	display: block;
	margin-top: 1em;
	color: ${props => props.theme.color.text[200]};
	user-select: none;
	transition: 200ms;

	&:hover {
		cursor: pointer;
	}
`

const SwapDirectionBadge = styled(Badge)`
	background-color: ${props => props.theme.color.primary[300]} !important;
	color: ${props => props.theme.color.text[100]};
	border: none;
	margin-bottom: 0.5rem;

	&:hover {
		background-color: ${props => props.theme.color.primary[400]} !important;
	}

	@media (max-width: ${props => props.theme.breakpoints.md}px) {
		font-size: 0.875rem !important;
	}
`

const BallastLabel = styled.label`
	font-size: 1rem;

	@media (max-width: ${props => props.theme.breakpoints.md}px) {
		font-size: 0.875rem !important;
	}

	@media (max-width: ${props => props.theme.breakpoints.sm}px) {
		font-size: 0.75rem !important;
	}
`

export default RhinoSwapper
