import { faLongArrowAltRight, faLongArrowAltDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RhinoIcon from 'assets/img/tokens/rhino.png'
import pndaIcon from 'assets/img/tokens/pnda.png'
import Config from 'bao/lib/config'
import BigNumber from 'bignumber.js'
import { IconFlex } from 'components/Icon'
import { BalanceInput } from 'components/Input'
import Tooltipped from 'components/Tooltipped'
import useTokenBalance from 'hooks/base/useTokenBalance'
import React, { useEffect, useState } from 'react'
import { decimate, getDisplayBalance } from 'utils/numberFormat'
import { AssetStack } from 'views/Markets/components/styles'
import { BallastSwapCard, BallastLabel, SwapDirectionBadge, SwapDirection } from 'styles/styledComponents'
import Select from 'react-select'
import BscTokenList from '../../../utils/bsctokenlist'
import { DisabledInput } from '../../../components/Input/Input'

const ZERO = String(0)

const TokenSwapper: React.FC = () => {
	const [tokenList, setTokenList] = useState([])
	const [fromValue, setFromValue] = useState('')
	const [toValue, setToValue] = useState('')

	const [fromToken, setFromToken] = useState('BNB')
	const [toToken, setToToken] = useState('')

	const fromBalance = useTokenBalance(Config.addressMap[fromToken])
	const toBalance = useTokenBalance(Config.addressMap[toToken])

	const handleChangeSelectFromToken = (event: any) => {
		setFromToken(event.value)
	}

	const handleChangeSelectToToken = (event: any) => {
		setToToken(event.value)
	}

	const handleChangeFromValue = (event: any) => {
		setFromValue(event.target.value)
	}

	const handleMaxClickFromValue = () => {
		return fromBalance.gt(ZERO) ? setFromValue(decimate(fromBalance).toString()) : ZERO
	}

	const checkDisabledFromValue = () => {
		return fromBalance.eq(ZERO)
	}

	const handleChangeToValue = (event: any) => {
		setToValue(event.target.value)
	}

	const validateInputNumber = (number: string) => {
		return new BigNumber(number).isNaN() ? new BigNumber(ZERO).toString() : number
	}

	const fromTokenInput = (
		<>
			<BallastLabel>
				<FontAwesomeIcon icon={faLongArrowAltRight} /> Balance: {getDisplayBalance(fromBalance).toString()} {fromToken}
			</BallastLabel>
			<BalanceInput
				onMaxClick={handleMaxClickFromValue}
				onChange={event => handleChangeFromValue(event)}
				value={validateInputNumber(fromValue)}
				disabled={checkDisabledFromValue()}
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

	const toTokenInput = (
		<>
			<BallastLabel>
				<FontAwesomeIcon icon={faLongArrowAltRight} /> Balance: {getDisplayBalance(toBalance, 9).toString()} {toToken}
			</BallastLabel>
			<DisabledInput
				onChange={event => handleChangeToValue(event)}
				value={validateInputNumber(toValue)}
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

	useEffect(() => {
		BscTokenList.getBscTokenList().then(async res => {
			res.tokens.map((token: any, index: number) => {
				const addToken = { value: token.symbol, label: token.name }
				setTokenList(tokenList => [...tokenList, addToken])
			})
		})
	}, [])

	return (
		<BallastSwapCard>
			<h2 style={{ textAlign: 'center' }}>
				<Tooltipped content='RhinoSwap is used to swap PNDA for Rhino.'>
					<a>
						<img width='90' height='90' src={pndaIcon} />
					</a>
				</Tooltipped>
			</h2>
			<Select options={tokenList} onChange={event => handleChangeSelectFromToken(event)} />
			{fromTokenInput}
			<SwapDirection>
				<SwapDirectionBadge pill>
					<FontAwesomeIcon icon={faLongArrowAltDown} />
				</SwapDirectionBadge>
			</SwapDirection>
			<Select options={tokenList} onChange={event => handleChangeSelectToToken(event)} />

			{toTokenInput}
			<br />
		</BallastSwapCard>
	)
}

export default TokenSwapper
