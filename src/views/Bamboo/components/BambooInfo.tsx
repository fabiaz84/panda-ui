import React, { useEffect, useState } from 'react'
import { SpinnerLoader } from 'components/Loader'
import BigNumber from 'bignumber.js'
import usePandaBalance from 'hooks/base/usePandaBalance'
import useBao from 'hooks/base/useBao'
import { StatWrapper, UserStat, UserStatsContainer, UserStatsWrapper } from 'components/Stats'
import { Row } from 'react-bootstrap'
import { getBambooSupply } from 'bao/utils'
import { decimate, exponentiate, getDisplayBalance, truncateNumber } from 'utils/numberFormat'

const BambooInfo: React.FC = () => {
	const [totalSupply, setTotalSupply] = useState<BigNumber>()
	const bao = useBao()
	const pandaBalance = usePandaBalance(bao && bao.getContract('bao').options.address)

	useEffect(() => {
		const fetchTotalSupply = async () => {
			const supply = await getBambooSupply(bao)
			setTotalSupply(supply)
		}

		if (bao) fetchTotalSupply()
	}, [bao, setTotalSupply])

	const bambooRate = new BigNumber(pandaBalance)
	const pandaRate = new BigNumber(totalSupply)
	const conversionA = new BigNumber(bambooRate.dividedBy(pandaRate)).toFixed(4)
	const conversionB = new BigNumber(pandaRate.dividedBy(bambooRate)).toFixed(4)

	return (
		<Row style={{ display: 'flex', flexWrap: 'wrap', width: '750px' }}>
			<UserStatsContainer>
				<UserStatsWrapper>
					<StatWrapper>
						<UserStat>
							<h1>Panda Conversion Rate</h1>
							<p>{conversionB ? conversionB : '-'}</p>
						</UserStat>
					</StatWrapper>
					<StatWrapper>
						<UserStat>
							<h1>Total Bamboo Supply</h1>
							{totalSupply ? window.screen.width > 1200 ? getDisplayBalance(totalSupply) : truncateNumber(totalSupply) : <SpinnerLoader />}
						</UserStat>
					</StatWrapper>
					<StatWrapper>
						<UserStat>
							<h1>Bamboo Conversion Rate</h1>
							<p>{conversionA ? conversionA : '-'}</p>
						</UserStat>
					</StatWrapper>
				</UserStatsWrapper>
			</UserStatsContainer>
		</Row>
	)
}

export default BambooInfo
