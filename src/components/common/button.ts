import { lighten } from 'polished'
import styled from 'styled-components'
import { mainColor } from '../ui/colors'

export default styled.button`
	display: inline-block;
	padding: 0px 12px;
	border-radius: 3px;
	line-height: 3.2rem;
	height: 3.2rem;
	color: #fff;
	border: none;
	background: ${mainColor};
	margin-right: 6px;
	font-size: 1.2rem;
	&:hover{
		background: ${ lighten( .1, mainColor ) };
	}
	&:focus,&:active{
		box-shadow: 0px 0px 0px 5px #cdcdcd;
	}
	.fa{
		margin-right: 6px;
	}
`
