import { Route, useMatch } from 'react-router-dom'
import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Timeline from '../../components/Timeline'
import { timelineItems } from '../timelineItems'
import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import { Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { StyledInfoHome, StyledWrapper } from 'views/NFT/components/styles'
import Spacer from 'components/Spacer'

const Landing: React.FC = () => {
	return (
		<Page>
			<Helmet>
				<title>Panda | Home</title>
				<meta name='description' content='Stake liquidity tokens to earn Panda!' />
			</Helmet>
			<PageHeader icon='' title='Home' />
			<Container>
				<StyledWrapper>
					<StyledInfoHome>
						<div>PandaSwap is back! New UI and soon the release of Panda Ponds.</div>
						<div>We are looking into releasing markets, bringing hard synths to Panda!</div>
						<div>Look below for all the recent updates or the items still to come.</div>
						<Spacer />
					</StyledInfoHome>
				</StyledWrapper>
				<Timeline timelineItems={timelineItems} />
			</Container>
		</Page>
	)
}

export default Landing
