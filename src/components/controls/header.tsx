import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Container from '../common/container'

const HeaderContainer = styled(Container)`
	padding: 0px 12px;
	display: flex;
	justify-content: space-between;
`

const Menu = styled.nav`
	display: block;
	line-height: 4.2rem;
	background: #424242;
	margin-bottom: 60px;
	a {
		display: inline-block;
		padding: 0px 12px;
		vertical-align: middle;
		color: rgba(255,255,255,.92);
		font-size: 1.4rem;
		font-weight: lighter;
		&:hover{
			color: #ffffff;
		}
		.fa{
			margin-right: 6px;
		}
	}
`

export default () => {
	return (
		<Menu>
			<HeaderContainer>
				<Link to='/'>
					<span className='fa fa-list' />
					merchants
				</Link>
			</HeaderContainer>
		</Menu>
	)
}
