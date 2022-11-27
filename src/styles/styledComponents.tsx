import styled from 'styled-components'
import { Badge, Card } from 'react-bootstrap'

export const BallastSwapCard = styled(Card)`
	width: 720px;
	padding: 25px;
	margin: auto;
	background-color: ${props => props.theme.color.primary[100]};
	border-radius: ${props => props.theme.borderRadius}px;
	border: ${props => props.theme.border.default};

	label > span {
		float: right;
		margin-bottom: 0.25rem;
		color: ${props => props.theme.color.text[200]};
	}

	@media (max-width: ${props => props.theme.breakpoints.md}px) {
		width: 100%;
	}
`

export const SwapDirection = styled.a`
	text-align: center;
	display: block;
	margin-top: 1em;
	color: ${props => props.theme.color.text[200]};
	user-select: none;
	transition: 200ms;

	&:hover {
		cursor: pointer;
	}
`

export const SwapDirectionBadge = styled(Badge)`
	background-color: ${props => props.theme.color.primary[300]} !important;
	color: ${props => props.theme.color.text[100]};
	border: none;
	margin-bottom: 0.5rem;

	&:hover {
		background-color: ${props => props.theme.color.primary[400]} !important;
	}

	@media (max-width: ${props => props.theme.breakpoints.md}px) {
		font-size: 0.875rem !important;
	}
`

export const BallastLabel = styled.label`
	font-size: 1rem;

	@media (max-width: ${props => props.theme.breakpoints.md}px) {
		font-size: 0.875rem !important;
	}

	@media (max-width: ${props => props.theme.breakpoints.sm}px) {
		font-size: 0.75rem !important;
	}
`

export const SwapHeader = styled.div`
	align-items: center;
	justify-content: center;
	text-align: center;
	display: flex;
	flex: 1;
	width: 1200px;
`

export const StyledNav = styled.nav`
	align-items: center;
	display: flex;
`
