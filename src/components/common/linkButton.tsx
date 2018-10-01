import { darken } from 'polished'
import * as React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mainColor } from '../ui/colors'
import IconButton from './iconButton'
const ButtonLink = styled( Link )`
	display: inline-block;
	color: #212121;
	margin 0px 24px 24px 0px;
	&:hover{
		color: ${mainColor};
		${ IconButton }{
			background: ${ darken(.1, mainColor) };
		}
	}
`

export default ( props: any ) => {
	const { link, text, icon } = props
	return (
		<ButtonLink to={ link }>
			<IconButton>
				<span className={ icon } />
			</IconButton>
			{ text }
		</ButtonLink>
	)
}
