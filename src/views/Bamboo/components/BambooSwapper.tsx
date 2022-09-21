import { faLongArrowAltRight, faShip, faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import bambooIcon from 'assets/img/tokens/bamboo.png'
import pndaIcon from 'assets/img/tokens/pnda.png'
import Config from 'bao/lib/config'
import BigNumber from 'bignumber.js'
import { IconFlex } from 'components/Icon'
import { BalanceInput } from 'components/Input'
import { SpinnerLoader } from 'components/Loader'
import Tooltipped from 'components/Tooltipped'
import useBao from 'hooks/base/useBao'
import useTokenBalance from 'hooks/base/useTokenBalance'
import useTransactionProvider from 'hooks/base/useTransactionProvider'
import React, { useCallback, useEffect, useState } from 'react'
import { Badge, Card } from 'react-bootstrap'
import styled from 'styled-components'
import Multicall from 'utils/multicall'
import { decimate, getDisplayBalance } from 'utils/numberFormat'
import { AssetStack } from 'views/Markets/components/styles'
import BambooButton from './BambooButton'

const BambooSwapper: React.FC = () => {
	const [swapDirection, setSwapDirection] = useState(false) // false = PNDA->Bamboo | true = Bamboo->PNDA
	const [inputVal, setInputVal] = useState('')

	const pndaBalance = useTokenBalance(Config.addressMap.PNDA)
	const bambooBalance = useTokenBalance(Config.addressMap.Bamboo)

	const pndaInput = (
		<>
			<BallastLabel>
				<FontAwesomeIcon icon={faLongArrowAltRight} /> Balance: {getDisplayBalance(pndaBalance).toString()} PNDA
			</BallastLabel>
			<BalanceInput
				onMaxClick={() => setInputVal(decimate(pndaBalance).toString())}
				onChange={(e: { currentTarget: { value: React.SetStateAction<string> } }) => setInputVal(e.currentTarget.value)}
				value={swapDirection && !new BigNumber(inputVal).isNaN() ? new BigNumber(inputVal).toString() : inputVal}
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

	const bambooInput = (
		<>
			<BallastLabel>
				<FontAwesomeIcon icon={faLongArrowAltRight} /> Balance: {getDisplayBalance(bambooBalance).toString()} Bamboo
			</BallastLabel>
			<BalanceInput
				onMaxClick={() => setInputVal(decimate(bambooBalance).toString())}
				onChange={(e: { currentTarget: { value: React.SetStateAction<string> } }) => setInputVal(e.currentTarget.value)}
				value={!swapDirection && !new BigNumber(inputVal).isNaN() ? new BigNumber(inputVal).toString() : inputVal}
				disabled={!swapDirection}
				label={
					<AssetStack>
						<IconFlex>
							<img src={bambooIcon} />
						</IconFlex>
					</AssetStack>
				}
			/>
		</>
	)

	return (
		<BallastSwapCard>
			<h2 style={{ textAlign: 'center' }}>
				<Tooltipped content='The BambooBar is used to stake PNDA for Bamboo.'>
					<a>
						<FontAwesomeIcon icon={faShip} />
					</a>
				</Tooltipped>
			</h2>
			{swapDirection ? bambooInput : pndaInput}
			<SwapDirection>
				<SwapDirectionBadge pill onClick={() => setSwapDirection(!swapDirection)}>
					<FontAwesomeIcon icon={faSync} />
					{' - '}
				</SwapDirectionBadge>
			</SwapDirection>
			{swapDirection ? pndaInput : bambooInput}
			<br />
			<BambooButton
				swapDirection={swapDirection}
				inputVal={inputVal}
				maxValues={{ buy: decimate(pndaBalance), sell: decimate(bambooBalance) }}
			/>
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

export default BambooSwapper
