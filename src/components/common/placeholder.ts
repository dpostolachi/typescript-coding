import styled from 'styled-components'
import { mainColor } from '../ui/colors'

export default styled.span`
	display: inline-block;
	font-size: 1.6rem;
	color: #414141;
	font-weight: lighter;
	opacity: .9;
	a {
		color: ${mainColor};
		text-decoration: underline;
	}
`
