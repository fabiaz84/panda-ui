import React from 'react'
import { StyledLink, StyledAbsoluteLink } from '../topBarCss'
import NavDropdown from './NavDropdown'
import { useTranslation } from 'react-i18next'

interface NavItemProps {
	navItem: any
}

const NavItem: React.FC<NavItemProps> = ({ navItem }) => {
	const { t } = useTranslation()

	switch (navItem.type) {
		case 'link':
			return (
				<StyledLink end to={{ pathname: navItem.link }}>
					{t(navItem.title)}
				</StyledLink>
			)
		case 'url':
			return <StyledAbsoluteLink href={navItem.link}>{t(navItem.title)}</StyledAbsoluteLink>
		case 'dropdown':
			return <NavDropdown navItem={navItem} />
	}
}

export default NavItem
