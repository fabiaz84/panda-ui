import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import React from 'react'
import { Container } from 'react-bootstrap'
import BambooSwapper from './components/BambooSwapper'
import { Helmet } from 'react-helmet'

const Bamboo: React.FC = () => {
	return (
		<Page>
			<Helmet>
				<title>Panda | BambooBar</title>
				<meta name='description' content='Swap PNDA and / or Bamboo.' />
			</Helmet>
			<PageHeader icon='' title='Bamboo' />
			<Container>
				<BambooSwapper />
			</Container>
		</Page>
	)
}

export default Bamboo
