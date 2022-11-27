import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import React from 'react'
import { Container } from 'react-bootstrap'
import RhinoSwapper from './components/RhinoSwapper'
import RhinoInfo from './components/RhinoInfo'
import { Helmet } from 'react-helmet'
import { StyledInfo } from 'views/NFT/components/styles'
import { SwapHeader } from '../../styles/styledComponents'

const Rhino: React.FC = () => {
	return (
		<Page>
			<Helmet>
				<title>Panda | RhinoSwap</title>
				<meta name='description' content='Swap PNDA and / or Rhino.' />
			</Helmet>
			<PageHeader icon='' title='Welcome to RhinoSwap' />
			<RhinoInfo />
			<StyledInfo>
				<SwapHeader>
					Swap PNDA for Rhino!
					<br />
					You will earn a portion of the swaps fees based on the relative percentage of Rhino held.
					<br />
					Rhino can only be obtained from this contract until the supply is depleted.
				</SwapHeader>
			</StyledInfo>
			<Container>
				<RhinoSwapper />
			</Container>
		</Page>
	)
}

export default Rhino
