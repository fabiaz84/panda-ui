import { faLongArrowAltRight, faShip, faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import baoUSDIcon from 'assets/img/tokens/bUSD.png'
import daiIcon from 'assets/img/tokens/DAI.png'
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
import BallastButton from './BambooButton'

const BallastSwapper: React.FC = () => {
	const bao = useBao()
	const { transactions } = useTransactionProvider()
	const [swapDirection, setSwapDirection] = useState(false) // false = DAI->baoUSD | true = baoUSD->DAI
	const [inputVal, setInputVal] = useState('')

	const daiBalance = useTokenBalance(Config.addressMap.DAI)
	const baoUSDBalance = useTokenBalance(Config.addressMap.baoUSD)

	const daiInput = (
		<>
			<BallastLabel>
				<FontAwesomeIcon icon={faLongArrowAltRight} /> Balance: {getDisplayBalance(daiBalance).toString()} DAI
			</BallastLabel>
			<BalanceInput
				onMaxClick={() => setInputVal(decimate(daiBalance).toString())}
				onChange={(e: { currentTarget: { value: React.SetStateAction<string> } }) => setInputVal(e.currentTarget.value)}
				value={
					swapDirection && fees && !new BigNumber(inputVal).isNaN()
						? new BigNumber(inputVal).times(new BigNumber(1).minus(fees['sell'].div(fees['denominator']))).toString()
						: inputVal
				}
				disabled={swapDirection}
				label={
					<AssetStack>
						<IconFlex>
							<img src={daiIcon} />
						</IconFlex>
					</AssetStack>
				}
			/>
		</>
	)

	const baoUSDInput = (
		<>
			<BallastLabel>
				<FontAwesomeIcon icon={faLongArrowAltRight} /> Balance: {getDisplayBalance(baoUSDBalance).toString()} BaoUSD
			</BallastLabel>
			<BalanceInput
				onMaxClick={() => setInputVal(decimate(baoUSDBalance).toString())}
				onChange={(e: { currentTarget: { value: React.SetStateAction<string> } }) => setInputVal(e.currentTarget.value)}
				value={
					!swapDirection && fees && !new BigNumber(inputVal).isNaN()
						? new BigNumber(inputVal).times(new BigNumber(1).minus(fees['buy'].div(fees['denominator']))).toString()
						: inputVal
				}
				disabled={!swapDirection}
				label={
					<AssetStack>
						<IconFlex>
							<img src={baoUSDIcon} />
						</IconFlex>
					</AssetStack>
				}
			/>
		</>
	)

	return (
		<BallastSwapCard>
			<h2 style={{ textAlign: 'center' }}>
				<Tooltipped content='The Ballast is used to mint BaoUSD with DAI or to redeem DAI for BaoUSD at a 1:1 rate (not including fees).'>
					<a>
						<FontAwesomeIcon icon={faShip} />
					</a>
				</Tooltipped>
			</h2>
			{swapDirection ? baoUSDInput : daiInput}
			<SwapDirection>
				<SwapDirectionBadge pill onClick={() => setSwapDirection(!swapDirection)}>
					<FontAwesomeIcon icon={faSync} />
					{' - '}
					Fee: {fees ? `${fees[swapDirection ? 'sell' : 'buy'].div(fees['denominator']).times(100).toString()}%` : <SpinnerLoader />}
				</SwapDirectionBadge>
			</SwapDirection>
			{swapDirection ? daiInput : baoUSDInput}
			<br />
			<BallastButton
				swapDirection={swapDirection}
				inputVal={inputVal}
				maxValues={{ buy: decimate(daiBalance), sell: decimate(baoUSDBalance) }}
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

export default BallastSwapper
