import { darken } from 'polished'
import styled from 'styled-components'
import { mainColor } from '../ui/colors'
export default styled.button`
	display: inline-block;
	width: 32px;
	height: 32px;
	line-height: 32px;
	border-radius: 50%;
	text-align: center;
	vertical-align: middle;
	border: none;
	background: ${mainColor};
	color: #ffffff;
	margin-right: 6px;
	box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
	&:hover, &:focus {
		background: ${darken(0.1, mainColor)};
	}
`
