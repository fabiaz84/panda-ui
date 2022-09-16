import React from 'react'
import useBaskets from '../../hooks/baskets/useBaskets'
import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import BasketList from './components/BasketList'
import { Container } from 'react-bootstrap'
import { StyledInfo } from 'views/NFT/components/styles'
import Spacer from 'components/Spacer'
import { Helmet } from 'react-helmet'

const Baskets: React.FC = () => {
	const baskets = useBaskets()

	return (
		<Page>
			<Helmet>
				<title>Panda | Ponds</title>
				<meta name='description' content='Diversified exposure to crypto with automated yield strategies.' />
			</Helmet>
			<PageHeader icon='' title='Panda Ponds' />
			<Container>
				<StyledInfo>
					<div
						style={{
							alignItems: 'center',
							display: 'flex',
							flex: 1,
							justifyContent: 'center',
						}}
					>
						Panda Ponds allow users to get balanced exposure to digital assets on the Binance Smart Chain network. Ponds are designed to be
						truly set-and-forget, maximizing your returns at a fraction of the cost and effort. Ponds leverage automated strategies
						utilizing staking, lending, and yield farming- No management or constant monitoring necessary!
					</div>
				</StyledInfo>
				<Spacer size='md' />
				<BasketList baskets={baskets} />
			</Container>
		</Page>
	)
}

export default Baskets
