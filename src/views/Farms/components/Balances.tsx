import { useWeb3React } from '@web3-react/core'
import { getBaoSupply } from 'bao/utils'
import BigNumber from 'bignumber.js'
import { SpinnerLoader } from 'components/Loader'
import { StatWrapper, UserStat, UserStatsContainer, UserStatsWrapper } from 'components/Stats'
import useBao from 'hooks/base/useBao'
import useTokenBalance from 'hooks/base/useTokenBalance'
import usePandaBalance from 'hooks/base/usePandaBalance'
import useAllEarnings from 'hooks/farms/useAllEarnings'
import useLockedEarnings from 'hooks/farms/useLockedEarnings'
import React, { Fragment, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { getDisplayBalance, truncateNumber } from 'utils/numberFormat'
import Coingecko from 'utils/coingecko'

const PendingRewards: React.FC = () => {
	const allEarnings = useAllEarnings()
	let sumEarning = 0
	for (const earning of allEarnings) {
		sumEarning += new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
	}

	return <span>{getDisplayBalance(sumEarning, 0)}</span>
}

const Balances: React.FC = () => {
	const [totalSupply, setTotalSupply] = useState<BigNumber>()
	const bao = useBao()
	const baoBalance = useTokenBalance(bao && bao.getContract('bao').options.address)
	const { account } = useWeb3React()
	const [baoPrice, setBaoPrice] = useState<BigNumber | undefined>()
	const locks = useLockedEarnings()
	const userAddress = '0x97f6665ac6b2d7C3d5a2aD11d7a779787F617ce0'

	const pandaBalance = usePandaBalance(bao && bao.getContract('bao').options.address, userAddress)
	const bnbBalance = usePandaBalance(bao && bao.getContract('weth').options.address, userAddress)

	useEffect(() => {
		const fetchTotalSupply = async () => {
			const supply = await getBaoSupply(bao)
			setTotalSupply(supply)
		}

		if (bao) fetchTotalSupply()
	}, [])

	useEffect(() => {
		if (!bao) return
		Coingecko.getPricesByCoinApiIdsAndCurrency(['binancecoin'], 'usd').then(async res => {
			setBaoPrice(new BigNumber((await res)['binancecoin'].usd))
		})
	}, [])

	const pandaRate = new BigNumber(pandaBalance)
	const bnbRate = new BigNumber(bnbBalance)
	const baoUSDPrice = bnbRate.times(baoPrice).div(pandaRate)

	return (
		<>
			<Row style={{ display: 'flex', flexWrap: 'wrap', marginTop: '2rem' }}>
				<UserStatsContainer>
					<UserStatsWrapper>
						<StatWrapper>
							<UserStat>
								<h1>PNDA Balance</h1>
								<p>{account ? (window.screen.width > 1200 ? getDisplayBalance(baoBalance) : truncateNumber(baoBalance)) : '-'}</p>
							</UserStat>
						</StatWrapper>
						<StatWrapper>
							<UserStat>
								<h1>Locked PNDA</h1>
								<p>{account ? (window.screen.width > 1200 ? getDisplayBalance(locks) : truncateNumber(locks)) : '-'}</p>
							</UserStat>
						</StatWrapper>
						<StatWrapper>
							<UserStat>
								<h1>Pending Harvest</h1>
								<p>{account ? <PendingRewards /> : '-'}</p>
							</UserStat>
						</StatWrapper>
						<StatWrapper>
							<UserStat>
								<h1>Total PNDA Supply</h1>
								{totalSupply ? (
									window.screen.width > 1200 ? (
										getDisplayBalance(totalSupply)
									) : (
										truncateNumber(totalSupply)
									)
								) : (
									<SpinnerLoader />
								)}
							</UserStat>
						</StatWrapper>
						<StatWrapper>
							<UserStat>
								<h1>PNDA Price</h1>
								{baoUSDPrice ? `$${getDisplayBalance(baoUSDPrice, 0)}` : <SpinnerLoader />}
							</UserStat>
						</StatWrapper>
					</UserStatsWrapper>
				</UserStatsContainer>
			</Row>
		</>
	)
}

export default Balances
