import * as React from 'react'
import styled, { css } from 'styled-components'

const AvatarContainer = styled<{ src: string }, "div">("div")`
	display: inline-block;
	width: 90px;
	height: 90px;
	line-height: 90px;
	border-radius: 50%;
	background-color: #cdcdcd;
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center center;
	overflow: hidden;
	text-align: center;
	${  props => props.src && css`
		background-image: url(${ props.src });
	` }
`

export default class Avatar extends React.PureComponent {
	public state: { loaded: boolean; src: string ; };
    public Image: any;
	public props: any;

	constructor( props: any ) {

        super( props );

		this.state = {
			loaded: false,
			src: '',
		}

		this.Image = null

	}

	public componentDidMount() {
		const { image } = this.props
		this.updateImage( image )
	}

	public componentWillUnmount() {
		this.Image.onload = null
	}

	public updateImage( src : string ) {
		this.Image = new Image()
		this.Image.onload = ( e: any ) => {
			this.setState( {
				loaded: true,
				src,
			} )
		}
		return this.Image.src = src
	}

	public render () {
		const { src } = this.state
		return <AvatarContainer src={ src } />
	}


}
