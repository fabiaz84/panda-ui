import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import React from 'react'
import { Container } from 'react-bootstrap'
import BambooSwapper from './components/BambooSwapper'
import BambooInfo from './components/BambooInfo'
import { Helmet } from 'react-helmet'
import { StyledInfo } from 'views/NFT/components/styles'

const Bamboo: React.FC = () => {
	return (
		<Page>
			<Helmet>
				<title>Panda | BambooBar</title>
				<meta name='description' content='Swap PNDA and / or Bamboo.' />
			</Helmet>
			<PageHeader icon='' title='Welcome to the BambooBar' />
			<BambooInfo />
			<StyledInfo>
				<div
					style={{
						alignItems: 'center',
						display: 'flex',
						flex: 1,
						justifyContent: 'center',
						width: '1200px',
						textAlign: 'center',
					}}
				>
					Stake PNDA for Bamboo!
				</div>
				<div
					style={{
						alignItems: 'center',
						display: 'flex',
						flex: 1,
						justifyContent: 'center',
						width: '1200px',
						textAlign: 'center',
					}}
				>
					You will earn a portion of the swaps fees based on the amount of Bamboo held relative the weight of the staking.
				</div>
				<div
					style={{
						alignItems: 'center',
						display: 'flex',
						flex: 1,
						justifyContent: 'center',
						width: '1200px',
						textAlign: 'center',
					}}
				>
					Bamboo can be minted by staking Panda. To redeem Panda staked plus swap fees convert Bamboo back to Panda.
				</div>
			</StyledInfo>
			<Container>
				<BambooSwapper />
			</Container>
		</Page>
	)
}

export default Bamboo
