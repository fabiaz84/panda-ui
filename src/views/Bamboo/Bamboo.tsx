import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import BambooSwapper from './components/BambooSwapper'
import { SpinnerLoader } from 'components/Loader'
import BigNumber from 'bignumber.js'
import useBao from 'hooks/base/useBao'
import { Helmet } from 'react-helmet'
import { StyledInfo } from 'views/NFT/components/styles'
import { StatWrapper, UserStat, UserStatsContainer, UserStatsWrapper } from 'components/Stats'
import { Row } from 'react-bootstrap'
import { getBambooSupply } from 'bao/utils'
import { getDisplayBalance, truncateNumber } from 'utils/numberFormat'

const Bamboo: React.FC = () => {
	const [totalSupply, setTotalSupply] = useState<BigNumber>()
	const bao = useBao()

	useEffect(() => {
		const fetchTotalSupply = async () => {
			const supply = await getBambooSupply(bao)
			setTotalSupply(supply)
		}

		if (bao) fetchTotalSupply()
	}, [bao, setTotalSupply])
	return (
		<Page>
			<Helmet>
				<title>Panda | BambooBar</title>
				<meta name='description' content='Swap PNDA and / or Bamboo.' />
			</Helmet>
			<PageHeader icon='' title='Welcome to the BambooBar' />
			<Row style={{ display: 'flex', flexWrap: 'wrap', width: '250px' }}>
				<UserStatsContainer>
					<UserStatsWrapper>
						<StatWrapper>
							<UserStat>
								<h1>Total Bamboo Supply</h1>
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
					</UserStatsWrapper>
				</UserStatsContainer>
			</Row>
			<StyledInfo>
				<div
					style={{
						alignItems: 'center',
						display: 'flex',
						flex: 1,
						justifyContent: 'center',
					}}
				>
					Stake PNDA and earn BAMBOO!!
				</div>
			</StyledInfo>
			<Container>
				<BambooSwapper />
			</Container>
		</Page>
	)
}

export default Bamboo
