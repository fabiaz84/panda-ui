import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import React from 'react'
import { Container } from 'react-bootstrap'
import RhinoSwapper from './components/RhinoSwapper'
import RhinoInfo from './components/RhinoInfo'
import { Helmet } from 'react-helmet'
import { StyledInfo } from 'views/NFT/components/styles'

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
					Swap PNDA for Rhino!
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
					You will earn a portion of the swaps fees based on the relative percentage of Rhino held.
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
					Rhino can only be obtained from this contract until the supply is depleted.
				</div>
			</StyledInfo>
			<Container>
				<RhinoSwapper />
			</Container>
		</Page>
	)
}

export default Rhino
